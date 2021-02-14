from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from rest_framework import status
from .models import Product

# api overview
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Product List': '/product-list/',
        'Create Product': '/product-create/',
        'Update Product': '/product-update/',
        'Delete Product': '/product-delete/',
        'Filter': '/product-filter/'
    }

    return Response(api_urls)


# list api
@api_view(['GET'])
def productList(request):
    products = Product.objects.all().order_by('-id')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# create api
@api_view(['POST'])
def productCreate(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# update api
@api_view(['POST'])
def productUpdate(request):
    product = Product.objects.get(id=request.data['id'])
    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete api
@api_view(['POST'])
def productDelete(request):
    product = Product.objects.get(id=request.data['id'])
    product.delete()
    return Response('Item succsesfully delete!', status=status.HTTP_200_OK)

# delete api
@api_view(['POST'])
def productFilter(request):
    spec_filter = {}
    for attribute in ['minPrice', 'maxPrice', 'name']:
        if attribute in request.data and request.data[attribute]:
            if attribute == 'maxPrice':
                spec_filter['product_cost__lte'] = request.data[attribute]
            if attribute == 'minPrice':
                spec_filter['product_cost__gte'] = request.data[attribute]
            if attribute == 'name':
                spec_filter['product_name__contains'] = request.data[attribute]

    products = Product.objects.filter(**spec_filter)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
