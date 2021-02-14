from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from django.test import TestCase
from api.models import Product
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import tempfile
from django.test import override_settings
import shutil
from api.views import productDelete

TEST_DIR = 'test_data'


class TestViews(APITestCase):
    @override_settings(MEDIA_ROOT=(TEST_DIR + '/media'))
    def test_create_product(self):
        """
        create a new Product object.
        """
        url = reverse('product-create')
        image = Image.new('RGB', (100, 100))
        tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image.save(tmp_file)
        tmp_file.seek(0)
        data = {
            "product_name": "Adding New Prod",
            "product_description": "New set of 4 plushies at a very nominal cost",
            "product_cost": 250,
            "product_image": tmp_file
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().product_name, "Adding New Prod")
        self.assertEqual(Product.objects.get().product_description,
                         "New set of 4 plushies at a very nominal cost")
        self.assertEqual(Product.objects.get().product_cost, 250)

    def test_update_product(self):
        """
        update product obj.
        """
        prod = Product.objects.create(
            product_name='Item', product_description='Test user', product_cost=25)
        reqId = None
        for e in Product.objects.all().values():
            reqId = e['id']
        prod_count = Product.objects.count()
        # Adding a records and verifying
        self.assertEqual(Product.objects.count(), 1)
        url = reverse('product-update')
        updatedProductName = "Changed name"
        updatedDescription = "Changed description"
        updatedCost = 250
        data = {
            "id": reqId,
            "product_name": updatedProductName,
            "product_description": updatedDescription,
            "product_cost": updatedCost
        }
        response = self.client.post(url, data, format='json')
        # Confirming if the record is deleted or not
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().product_name,
                         updatedProductName)
        self.assertEqual(Product.objects.get().product_description,
                         updatedDescription)
        self.assertEqual(Product.objects.get().product_cost, updatedCost)

    def test_delete_product(self):
        """
        delete product obj.
        """
        prod = Product.objects.create(
            product_name='Item', product_description='Test user', product_cost=25)
        reqId = None
        for e in Product.objects.all().values():
            reqId = e['id']
        prod_count = Product.objects.count()
        # Adding a records and verifying
        self.assertEqual(Product.objects.count(), 1)
        url = reverse('product-delete')
        data = {
            "id": reqId
        }
        response = self.client.post(url, data, format='json')
        # Confirming if the record is deleted or not
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.count(), 0)

    def test_list_product(self):
        """
        list product obj.
        """
        numberOfRecords = 2
        x = range(numberOfRecords)
        for n in x:
            Product.objects.create(product_name=f"Item{n}", product_description=f"Item Desciption{n}", product_cost=54)
        url = reverse('product-list')
        response = self.client.get(url, format='json')      
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.count(), numberOfRecords)

    def tearDownModule():
        print("Deleting temporary files...")
        try:
            shutil.rmtree(TEST_DIR)
        except OSError:
            pass
