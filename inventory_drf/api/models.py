from django.db import models

# Create your models here.

# class Task(models.Model):
#   title = models.CharField(max_length=200)
#   completed = models.BooleanField(default=False, blank=True, null=True)
      
#   def __str__(self):
#     return self.title


def upload_path(instance, filename):
  return '/'.join(['images', str(instance.product_name), filename])


# Create your models here.
class Product(models.Model):
  product_image = models.ImageField(blank=True, null=True, upload_to=upload_path, default='/images/image.png')
  product_name = models.CharField(max_length=200)
  product_description = models.CharField(max_length=2000)
  product_cost = models.IntegerField()
      
  def __str__(self):
    return self.product_name