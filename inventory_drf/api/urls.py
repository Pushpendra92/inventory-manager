from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('product-create/', views.productCreate, name="product-create"),
	path('product-list/', views.productList, name="product-list"),
	path('product-delete/', views.productDelete, name="product-delete"),
	path('product-update/', views.productUpdate, name="product-update"),
	path('product-filter/', views.productFilter, name="product-filter"),

]
