from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.registration.views import RegisterView
from .services import create_user_with_role
from dotenv import load_dotenv
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer
import os
from .roles import GuestUser, LoggedInUser, VendorAdmin, SuperAdmin
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR/".env")

from rolepermissions.roles import assign_role, clear_roles
from .permissions import HasRolePermission
from rolepermissions.checkers import has_permission
from .models import (
    User, Address, Category, Product, Order, Payment, 
    Review, Cart, Coupon, OrderItem, CartItem
)
from .serializers import (
    UserSerializer, AddressSerializer, CategorySerializer, 
    ProductSerializer, OrderSerializer, PaymentSerializer, 
    ReviewSerializer, CartSerializer, CouponSerializer,
    CartItemSerializer, RoleSerializer
)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.getenv('CALLBACK_URL_GOOGLE')
    client_class = OAuth2Client

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def perform_create(self, serializer):
        user = create_user_with_role(
            email=serializer.validated_data['email'],
            first_name=serializer.validated_data['first_name'],
            password=serializer.validated_data['password1'],
            role='loggedin-user'  # This should match a key in the role_map in create_user_with_role
        )
        return user

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'role': user.get_role().__name__ if user.get_role() else None
        })

class RoleViewSet(viewsets.ViewSet):
    def list(self, request):
        user = request.user
        role = user.get_role()

        if role:
            serializer = RoleSerializer(role)
            return Response(serializer.data)
        else:
            return Response({"message": "No role assigned"})

    @action(detail=False, methods=['put'])
    def update(self, request):
        user = request.user
        new_role = request.data.get('role')
        print(new_role) 
       # if not user.has_perm('can_change_own_role'):
       #     return Response({"message": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        
        user.role = new_role
        user.save()
        return Response({"message": "Role updated successfully"})


#class RoleViewSet(viewsets.ViewSet):
#    @action(detail=False, methods=['put'])
#    def update(self, request):
#        user = request.user
#        new_role = request.data.get('role')
#        
#        if new_role not in dict(User.ROLE_CHOICES):
#            return Response({"message": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)
#
#        role_map = {
#            'guest-user': GuestUser,
#            'loggedin-user': LoggedInUser,
#            'vendor-admin': VendorAdmin,
#            'super-admin': SuperAdmin
#        }
#        
#        role_class = role_map.get(new_role)
#        print(role_class)
#        clear_roles(user)
#        print(user,)
#        assign_role(user, role_class)
#        user.role = role_class 
#        user.save()
#        return Response({"message": "Role updated successfully"})
#
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [HasRolePermission()]
    
    required_permission = 'manage_users'

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_permission = 'manage_addresses'

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [HasRolePermission]
    required_permission = 'view_categories'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    required_permission = 'view_products'

    def get_permissions(self):
        if self.action == 'list':
            return []
        return super().get_permissions()

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_permission = 'place_order'

    def get_queryset(self):
        if has_permission(self.request.user, 'manage_orders'):
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def create_from_cart(self, request):
        if not has_permission(request.user, 'place_order'):
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            cart = Cart.objects.get(user=request.user)
            if not cart.items.exists():
                return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

            order = Order.objects.create(
                user=request.user,
                total_amount=sum(item.product.price * item.quantity for item in cart.items.all())
            )

            for cart_item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.product.price
                )

            cart.items.all().delete()  # Clear the cart

            serializer = self.get_serializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_permission = 'manage_payments'

    def get_queryset(self):
        if has_permission(self.request.user, 'manage_payments'):
            return Payment.objects.all()
        return Payment.objects.filter(order__user=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_permission = 'write_review'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, HasRolePermission]
    required_permission = 'add_to_cart'

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))  # Default to 1 if not provided
        
        product = get_object_or_404(Product, id=product_id)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, 
            product=product,
            defaults={'quantity': quantity}  # Set initial quantity
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CouponViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [HasRolePermission]
    required_permission = 'view_coupons'
