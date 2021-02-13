from rest_framework import serializers
from .models import Product

# Serializer for product model, all the fields are being serialized below
class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields ='__all__'