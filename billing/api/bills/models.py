from django.db import models
from django.urls import reverse
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
    Branch =models.CharField(max_length=20)
    #StateCode = 
    gstNumber = models.ForeignKey("user.Bill_manage_info",on_delete=models.CASCADE)
    account_type = models.ForeignKey(Bill_Account_type,on_delete=models.CASCADE) 
    open_balance = models.CharField(max_length=10)
    Primary_type = models.BooleanField()
    modify_date = models.DateTimeField(auto_now=True)
    created_at = models.DateField(auto_created=True)

    def __str__(self):
        return self.bank_name