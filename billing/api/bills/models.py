from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Bill_Account_type(models.Model):
    account_type_name = models.CharField(max_length=20)
    date_time = models.DateTimeField(auto_now=True) # updated at
    status = models.BooleanField(default=True)
    def __str__(self):
        return self.account_type_name

    def get_absolute_url(self):
        return reverse("_detail", kwargs={"pk": self.pk})

class Bill_banks(models.Model):
    user_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    bank_name = models.CharField("Bank_name",max_length=100)
    account_num = models.IntegerField("Account Number",max_length=50)
    ifsc_code = models.CharField(max_length=20)
    Branch = models.CharField(max_length=20)
    StateCode = models.ForeignKey("api.StateCodes",verbose_name=_("State Code"),on_delete=models.CASCADE)
    gstNumber = models.CharField(max_length=15)#models.ForeignKey("user.Bill_manage_info",on_delete=models.CASCADE)
    account_type = models.ForeignKey(Bill_Account_type,on_delete=models.CASCADE) 
    open_balance = models.CharField(max_length=10)
    Primary_type = models.BooleanField(default=True)
    modify_date = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.bank_name
    
class Bill_Cash(models.Model):
    user_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cash_name =  models.CharField("Cash_name",max_length=100)
    cash_balance = models.IntegerField("Cash Balance",max_length=10) # can vary and need to see the correct value **
    add_date = models.DateTimeField(auto_now_add=True)
    modify_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cash_name   

class Places(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    place_name = models.CharField("Places",max_length=100)
    timeStamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

class Group(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cust_grp = models.CharField("Group",max_length=100)
    timeStamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

class Category(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cat_name = models.CharField("Category",max_length=100)
    timeStamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)