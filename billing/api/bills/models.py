from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

def upload_to(instance,filename):
    return 'Customer/{filename}'.format(filename=filename)
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

    def __str__(self):
        return f"{self.place_name}"

class Group(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cust_grp = models.CharField("Group",max_length=100)
    timeStamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.cust_grp}"

class Category(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cat_name = models.CharField("Category",max_length=100)
    timeStamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

class Customer(models.Model):
    master_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    cust_name = models.CharField(max_length=150,blank=True)
    cust_code = models.CharField(max_length=10,default=0)
    Image = models.ImageField(_("Image"),upload_to=upload_to,default='customer/profile_default.jpg')
    cust_state_id = models.ForeignKey("api.StateCodes",verbose_name=_("State Code"),on_delete=models.CASCADE)
    cust_pincode = models.IntegerField(max_length=6)
    cust_pan = models.CharField(max_length=10)
    cust_place = models.ForeignKey("Places",on_delete=models.CASCADE)
    cust_group = models.ForeignKey("Group",on_delete=models.CASCADE)
    cust_mobile = models.CharField(max_length=12)
    cust_landline = models.CharField(max_length=12)
    cust_email = models.CharField(max_length=150,blank=True)
    address = models.CharField(max_length=50)
    cust_is_reg =  models.BooleanField(default=True)
    cust_dealer_type = models.ForeignKey("api.Register_dealer",verbose_name=_("Register Dealer Type"),on_delete=models.CASCADE)
    cust_gst =  models.CharField(max_length=15)
    cust_currency = models.ForeignKey("api.Currency",verbose_name=_("Currency"),on_delete=models.CASCADE)
    export_option = models.BooleanField(default=True)
    export_type = models.ForeignKey("api.Export",verbose_name=_("Export type"),on_delete=models.CASCADE)
    created_by = models.CharField(max_length=10) #models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.CharField(max_length=10) #models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    modified_date = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id}"


class CustomerLimit(models.Model):
    is_limit_cond = models.BooleanField(default=True)
    amount = models.IntegerField(max_length=10,default=0)
    cust_openingBalance = models.IntegerField(max_length=10,default=0)
    user_id = models.ForeignKey("user.NewUSER",on_delete=models.CASCADE)
    sales_type = models.CharField(max_length=15)
    rcm = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cust_id = models.ForeignKey("Customer",on_delete=models.CASCADE)