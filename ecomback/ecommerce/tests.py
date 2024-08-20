from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Product, Category, Cart, CartItem, Order, Address, Review, Coupon
from rolepermissions.roles import assign_role
from .roles import GuestUser, LoggedInUser, VendorAdmin, SuperAdmin

User = get_user_model()

class RBACTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.guest = User.objects.create_user(username='guest', password='guestpass')
        self.user = User.objects.create_user(username='user', password='userpass')
        self.vendor = User.objects.create_user(username='vendor', password='vendorpass')
        self.admin = User.objects.create_superuser(username='admin', password='adminpass')

        assign_role(self.guest, GuestUser)
        assign_role(self.user, LoggedInUser)
        assign_role(self.vendor, VendorAdmin)
        assign_role(self.admin, SuperAdmin)

        self.category = Category.objects.create(name='Test Category')
        self.product = Product.objects.create(
            name='Test Product',
            description='Test Description',
            price=9.99,
            quantity=10,
            category=self.category
        )

    def test_guest_permissions(self):
        self.client.force_authenticate(user=self.guest)
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response = self.client.post('/api/carts/add_item/', {'product_id': self.product.id, 'quantity': 1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_logged_in_user_permissions(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/carts/add_item/', {'product_id': self.product.id, 'quantity': 1})
        print("logged in user 1===============================")
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post('/api/products/', {'name': 'New Product', 'description': "new prodcut description", 'price': 19.99, 'quantity': 5, 'category': self.category.id})
        print("logged in user test 2===============================")
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_vendor_permissions(self):
        self.client.force_authenticate(user=self.vendor)
        response = self.client.post('/api/products/', {'name': 'New Product', 'description': 'New Description', 'price': 19.99, 'quantity': 5, 'category': self.category.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_permissions(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post('/api/products/', {'name': 'Admin Product', 'description': 'Admin Description', 'price': 29.99, 'quantity': 15, 'category': self.category.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class EcommerceAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.admin = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpass')
        assign_role(self.user, LoggedInUser)
        assign_role(self.admin, SuperAdmin)
        self.category = Category.objects.create(name='Test Category')
        self.product = Product.objects.create(
            name='Test Product',
            description='Test Description',
            price=9.99,
            quantity=10,
            category=self.category
        )

    def test_user_registration(self):
        data = {'username': 'newuser', 'email': 'newuser@example.com', 'password': 'newpass123'}
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        data = {'username': 'testuser', 'password': 'testpass'}
        response = self.client.post('/api/auth/token/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_list_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_product_as_admin(self):
        self.client.force_authenticate(user=self.admin)
        data = {
            'name': 'New Product',
            'description': 'New Description',
            'price': 19.99,
            'quantity': 5,
            'category': self.category.id
        }
        response = self.client.post('/api/products/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_to_cart(self):
        self.client.force_authenticate(user=self.user)
        data = {'product_id': self.product.id, 'quantity': 2}
        response = self.client.post('/api/carts/add_item/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CartItem.objects.count(), 1)
        self.assertEqual(CartItem.objects.first().quantity, 2)

    def test_create_order_from_cart(self):
        self.client.force_authenticate(user=self.user)
        cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=cart, product=self.product, quantity=2)
        response = self.client.post('/api/orders/create_from_cart/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_user_orders(self):
        self.client.force_authenticate(user=self.user)
        Order.objects.create(user=self.user, total_amount=19.98)
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_review(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'user': self.user.id,  # Add this line
            'product': self.product.id,
            'rating': 5,
            'text': 'Great product!'
        }
        response = self.client.post('/api/reviews/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_view_coupons(self):
        self.client.force_authenticate(user=self.user)
        Coupon.objects.create(code='TEST10', discount_amount=10.00, expiration_date='2023-12-31')
        response = self.client.get('/api/coupons/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_manage_addresses(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'user': self.user.id,
            'address_type': 'shipping',
            'recipient_name': 'John Doe',
            'street': '123 Test St',
            'city': 'Test City',
            'state': 'TS',
            'zip_code': '12345',
            'country': 'Test Country'
        }
        response = self.client.post('/api/addresses/', data)
        print("manage addr test ============================")
        print(response.content)  # Add this line
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

# Add more test cases for other views and functionalities
