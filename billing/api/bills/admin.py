from django.contrib import admin

from .models import Bill_Account_type,Bill_banks
# Register your models here.
admin.site.register(Bill_Account_type)
admin.site.register(Bill_banks)