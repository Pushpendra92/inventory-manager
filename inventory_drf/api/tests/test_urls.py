from django.test import SimpleTestCase
from django.urls import resolve, reverse
from api.views import productCreate, productList, productUpdate, productFilter, productDelete, apiOverview

# This class contains the testcases for all the function created for urls

class TestUrls(SimpleTestCase):
    def test_product_create_url_is_resolved(self):
        url = reverse('product-create')
        self.assertEquals(resolve(url).func, productCreate)

    def test_product_list_url_is_resolved(self):
        url = reverse('product-list')
        self.assertEquals(resolve(url).func, productList)

    def test_product_delete_url_is_resolved(self):
        url = reverse('product-delete')
        self.assertEquals(resolve(url).func, productDelete)

    def test_product_update_url_is_resolved(self):
        url = reverse('product-update')
        self.assertEquals(resolve(url).func, productUpdate)

    def test_product_filter_url_is_resolved(self):
        url = reverse('product-filter')
        self.assertEquals(resolve(url).func, productFilter)