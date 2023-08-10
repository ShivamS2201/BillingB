from django.db import models

# Create your models here.

class StateCodes(models.Model):
    state_name = models.CharField(max_length=90)
    state_code = models.IntegerField(max_length=50) 
    status = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.state_code,self.state_name}"
class Currency(models.Model):
    name = models.CharField(max_length=90)
    type_C = models.CharField(max_length=50)
    datetime =  models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"


class Export(models.Model):
    name = models.CharField(max_length=90)
    datetime =  models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True) 

    def __str__(self):
        return f"{self.name}"

class Register_dealer(models.Model):
    dealer_name = models.CharField(max_length=90)
    datetime =  models.DateTimeField(auto_now_add=True)
    customer_Bool = models.BooleanField(default=True) 
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.dealer_name}"
