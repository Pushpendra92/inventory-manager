from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework import status
from .models import Product
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Product List':'/product-list/',
		'Create Product':'/product-create/',
		'Update Product':'/product-update/',
		'Delete Product':'/product-delete/',
		'Filter': '/product-filter/'
		}

	return Response(api_urls)

@api_view(['GET'])
def productList(request):
	products = Product.objects.all().order_by('-id')
	serializer = ProductSerializer(products, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def productCreate(request):
	serializer = ProductSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	


@api_view(['POST'])
def productUpdate(request):
	product = Product.objects.get(id=request.data['id'])
	serializer = ProductSerializer(instance=product, data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def productDelete(request):
	product = Product.objects.get(id=request.data['id'])
	product.delete()
	return Response('Item succsesfully delete!', status=status.HTTP_200_OK)


@api_view(['POST'])
def productFilter(request):
	products = Product.objects.filter(
		product_cost__gte=request.data['minPrice'],
		product_cost__lte=request.data['maxPrice'],
		product_name__contains=request.data['name']
		) 
	serializer = ProductSerializer(products, many=True)
	return Response(serializer.data)


