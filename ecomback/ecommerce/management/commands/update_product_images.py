# In ecommerce/management/commands/update_product_images.py

from django.core.management.base import BaseCommand
from django.conf import settings
from ecommerce.models import Product
from unsplash.api import Api
from unsplash.auth import Auth

class Command(BaseCommand):
    help = 'Updates product image URLs using Unsplash API'

    def handle(self, *args, **options):
        auth = Auth(settings.UNSPLASH_ACCESS_KEY, '',redirect_uri="urn:ietf:wg:oauth:2.0:oob")
        api = Api(auth)

        products = Product.objects.filter(image_url__isnull=True)
        for product in products:
            try:
                # Get a random photo related to the product category or name
                search_term = product.category.name if product.category else product.name
                photos = api.photo.random(query=search_term, count=1)
                if photos:
                    product.image_url = photos[0].urls.regular
                    product.save()
                    self.stdout.write(self.style.SUCCESS(f'Updated image for product {product.name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'No image found for product {product.name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error updating image for product {product.name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('Finished updating product images'))
