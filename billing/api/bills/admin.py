from django.contrib import admin

from .models import Bill_Account_type,Bill_banks,Customer,Bill_messages
# Register your models here.
admin.site.register(Bill_Account_type)
admin.site.register(Bill_banks)
admin.site.register(Customer)
admin.site.register(Bill_messages)