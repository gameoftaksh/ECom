from django.core.management.base import BaseCommand
from django.db import transaction
from datetime import datetime, timedelta
from ecommerce.models import User, Address, Category, Product, Order, OrderItem, Payment, Review, Cart, CartItem, Coupon, OrderCoupon

class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **options):
        # Populate Users (assuming this is already handled via API)
        pass

        # Populate Addresses
        address1 = Address.objects.create(
            user=User.objects.get(email="foolseeker4@gmail.com"),
            address_type='shipping',
            recipient_name='John Doe',
            street='123 Main St',
            city='Anytown',
            state='CA',
            zip_code='12345',
            country='USA'
        )

        address2 = Address.objects.create(
            user=User.objects.get(email="maxxcuriosity.00@gmail.com"),
            address_type='billing',
            recipient_name='Jane Smith',
            street='456 Elm St',
            city='Othertown',
            state='NY',
            zip_code='67890',
            country='USA'
        )

        # Populate Categories
        electronics = Category.objects.create(name="Electronics")
        clothing = Category.objects.create(name="Clothing")

        smartphones = electronics.subcategories.create(name="Smartphones")
        laptops = electronics.subcategories.create(name="Laptops")
        tshirts = clothing.subcategories.create(name="T-Shirts")
        jeans = clothing.subcategories.create(name="Jeans")

        # Populate Products
        iphone = Product.objects.create(
            name="iPhone 13",
            description="Latest iPhone model",
            price=999.99,
            quantity=100,
            category=electronics.subcategories.get(name="Smartphones")
        )

        macbook_air = Product.objects.create(
            name="MacBook Air",
            description="Powerful laptop for productivity",
            price=1299.99,
            quantity=50,
            category=electronics.subcategories.get(name="Laptops")
        )

        tshirt = Product.objects.create(
            name="Basic T-Shirt",
            description="Comfortable casual wear",
            price=19.99,
            quantity=200,
            category=clothing.subcategories.get(name="T-Shirts")
        )

        jeans = Product.objects.create(
            name="Premium Jeans",
            description="Stylish and durable jeans",
            price=69.99,
            quantity=150,
            category=clothing.subcategories.get(name="Jeans")
        )

        # Populate Orders
        order1 = Order.objects.create(
            user=User.objects.get(email="maxxcuriosity.00@gmail.com"),
            total_amount=1200.00,
            shipping_address=address1,
            billing_address=address2,
            status='pending'
        )

        order2 = Order.objects.create(
            user=User.objects.get(email="foolseeker4@gmail.com"),
            total_amount=189.98,
            shipping_address=address1,
            billing_address=address2,
            status='pending'
        )

        # Populate Order Items
        OrderItem.objects.create(order=order1, product=iphone, quantity=1, price=999.99)
        OrderItem.objects.create(order=order1, product=macbook_air, quantity=1, price=1299.99)
        OrderItem.objects.create(order=order2, product=tshirt, quantity=2, price=19.99)
        OrderItem.objects.create(order=order2, product=jeans, quantity=1, price=69.99)

        # Populate Payments
        Payment.objects.create(
            order=order1,
            payment_method='credit_card',
            amount=1200.00,
            payment_date=datetime.now()
        )

        Payment.objects.create(
            order=order2,
            payment_method='paypal',
            amount=189.98,
            payment_date=datetime.now()
        )

        # Populate Reviews
        Review.objects.create(
            product=iphone,
            user=User.objects.get(email="foolseeker4@gmail.com"),
            rating=5,
            text="Great phone! Fast and responsive."
        )

        Review.objects.create(
            product=macbook_air,
            user=User.objects.get(email="maxxcuriosity.00@gmail.com"),
            rating=4,
            text="Excellent performance, but battery life could be better."
        )

        # Populate Cart and Cart Items
        cart = Cart.objects.create(user=User.objects.get(email="maxxcuriosity.00@gmail.com"))
        CartItem.objects.create(cart=cart, product=iphone, quantity=1)
        CartItem.objects.create(cart=cart, product=tshirt, quantity=2)

        # Populate Coupons
        coupon1 = Coupon.objects.create(code="SUMMER10", discount_amount=10.00, expiration_date=datetime.now() + timedelta(days=30))
        Coupon.objects.create(code="WELCOME15", discount_amount=15.00, expiration_date=datetime.now() + timedelta(days=60))

        OrderCoupon.objects.create(order=order1, coupon=coupon1)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database'))
