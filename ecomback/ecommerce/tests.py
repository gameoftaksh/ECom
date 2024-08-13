from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Product, Category, Cart, CartItem, Order

User = get_user_model()

class ProductAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.admin = User.objects.create_superuser(username='admin', password='adminpass')
        self.category = Category.objects.create(name='Test Category')
        self.product = Product.objects.create(
            name='Test Product',
            description='Test Description',
            price=9.99,
            quantity=10,
            category=self.category
        )

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

    def test_create_product_as_user(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'name': 'New Product',
            'description': 'New Description',
            'price': 19.99,
            'quantity': 5,
            'category': self.category.id
        }
        response = self.client.post('/api/products/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class EcommerceAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.admin = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpass')
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

# Add more test cases for other views and functionalities
