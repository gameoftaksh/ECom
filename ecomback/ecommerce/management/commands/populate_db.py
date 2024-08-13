from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from faker import Faker
from ecommerce.models import User, Address, Category, Product, Order, Review, Cart, Coupon

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def handle(self, *args, **options):
        fake = Faker()

        # Populate Users
        for _ in range(10):
            User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password='password',
                phone_number=fake.phone_number(),
            )

        # Populate Categories
        for _ in range(5):
            Category.objects.create(
                name=fake.catch_phrase(),
                description=fake.text(max_nb_chars=50),
            )

        # Populate Products
        categories = Category.objects.all()
        for _ in range(20):
            Product.objects.create(
                name=fake.catch_phrase(),
                description=fake.text(max_nb_chars=50),
                price=float(fake.random_int(min=10, max=1000)),
                quantity=fake.random_int(min=1, max=50),
                category=fake.random_element(elements=categories),
            )

        # Add more models here following the same pattern

        self.stdout.write(self.style.SUCCESS('Database populated with fake data'))
