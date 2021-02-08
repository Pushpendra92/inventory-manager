from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer

from .models import Product
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Product List':'/product-list/',
		'Create Product':'/product-create/',
		'Update Product':'/product-update/',
		'Delete Product':'/product-delete/',
		}

	return Response(api_urls)


@api_view(['GET'])
def productList(request):
	products = Product.objects.all().order_by('-id')
	serializer = ProductSerializer(products, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def productCreate(request):
	print('-----------------------------	',request.data)
	serializer = ProductSerializer(data=request.data)
	# print('$$$$$$$$$$$$$',serializer)
	if serializer.is_valid():
		print('valid')
		serializer.save()
	return Response(serializer.data)


@api_view(['POST'])
def productUpdate(request):
	product = Product.objects.get(id=request.data['id'])
	serializer = ProductSerializer(instance=product, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def productDelete(request):
	product = Product.objects.get(id=request.data['id'])
	product.delete()

	return Response('Item succsesfully delete!')


@api_view(['POST'])
def productFilter(request):
	products = Product.objects.filter(product_cost__gte=request.data['min-price'],product_cost__lte=request.data['max-price']) 
	serializer = ProductSerializer(products, many=True)
	print(serializer.data)
	return Response(serializer.data)


