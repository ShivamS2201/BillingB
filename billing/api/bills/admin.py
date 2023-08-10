from django.contrib import admin

from .models import Bill_Account_type,Bill_banks,Customer
# Register your models here.
admin.site.register(Bill_Account_type)
admin.site.register(Bill_banks)
admin.site.register(Customer)