from django.test import TestCase
from api.models import Product
from django.test import override_settings
import shutil
from django.core.files.uploadedfile import SimpleUploadedFile

TEST_DIR = 'test_data'

class ModelTestCase(TestCase):
    """This class defines the test case for the product model."""
    @override_settings(MEDIA_ROOT=(TEST_DIR + '/media'))
    def setUp(self):
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b')
        uploaded = SimpleUploadedFile(
            'small.gif', small_gif, content_type='image/gif')
        self.product_name = "Product_name_test"
        self.product_description = "Product_name_desc"
        self.product_cost = 25
        self.product_image = uploaded
        self.product = Product(
            product_name=self.product_name, product_description=self.product_description, product_cost=self.product_cost, product_image=self.product_image)


    @override_settings(MEDIA_ROOT=(TEST_DIR + '/media'))
    def test_model_can_create_a_product(self):
        """Test the product model can create a productlist."""
        old_count = Product.objects.count()
        self.product.save()
        new_count = Product.objects.count()
        self.assertNotEqual(old_count, new_count)
    
    def tearDownModule():
        print("Deleting temporary files...")
        try:
            shutil.rmtree(TEST_DIR)
        except OSError:
            pass