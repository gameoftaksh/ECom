from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CustomAuthToken, GoogleLogin, RoleViewSet, CustomRegisterView
from django.shortcuts import redirect

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'orders', views.OrderViewSet, basename='order')
router.register(r'payments', views.PaymentViewSet, basename='payment')
router.register(r'reviews', views.ReviewViewSet)
router.register(r'carts', views.CartViewSet, basename='cart')
router.register(r'coupons', views.CouponViewSet)

def email_confirmation(request, key):
    return redirect(f"http://localhost:8000/auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"http://localhost:8000/reset/password/confirm/{uid}/{token}")

urlpatterns = [
    path('', include(router.urls)),
    # dj-rest-auth
    path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/registration/', CustomRegisterView.as_view(), name='rest_register'),
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('auth/registration/account-confirm-email/<str:key>/', email_confirmation),
    path('reset/password/confirm/<int:uid>/<str:token>', reset_password_confirm, name="password_reset_confirm"),
    path('auth/token/', CustomAuthToken.as_view(), name='api_token_auth'),
    # RBAC 
    path('roles/', RoleViewSet.as_view({"get":"list"}), name="role-list"),
    path('roles/update/', RoleViewSet.as_view({'put': 'update'}), name='role-update'),
]
