from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.utils.translation import gettext_lazy as _
# Create your models here.
# create a model which defines roles:[SuperAdmin, Owner,Dist,Sales,HeadOff,User]
class CustomAccountManager(BaseUserManager):
    def create_superuser(self,email,user_name,first_name,password,**other_fields):
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_active',True)
        other_fields.setdefault('is_superuser',True)

        if other_fields.get('is_superuser') is not True:
            raise ValueError('SuperUser cannot be is_superuser False')   

        if other_fields.get('is_staff') is not True:
            raise ValueError('SuperUser cannot be is_staff False')
        
        return self.create_user(email,user_name,first_name,password,**other_fields)

    def create_user(self,email,user_name,first_name,password,**other_fields):
        if not email:
            return ValueError(_('Provide an email'))
        other_fields.setdefault('is_active',True)
        email = self.normalize_email(email)
        user = self.model(email=email,user_name = user_name,first_name = first_name,**other_fields)
        user.set_password(password)
        user.save()

        return user

class NewUSER(AbstractBaseUser,PermissionsMixin):
    class Role(models.TextChoices):
        SUPERUSER = '1', 'Superuser'
        OWNER = '2','Owner'
        DISTRIBUTOR = '3','Distributor'
        SALES = '4','Sales'
        HEAD_OFFICE ='5','Head Office'
        CUSTOMER = '6','Customer'
        USER = '7', 'User'
    email = models.EmailField(('Email Address'),unique=True)
    user_name = models.CharField(max_length=150,unique=True)
    first_name = models.CharField(max_length=150,blank=True)
    role_id = models.CharField(max_length=50,choices=Role.choices)
    distID = models.IntegerField(('Distributor ID'),default=0,max_length=3)
    salesid= models.IntegerField(('Sales ID'),default=0,max_length=3)
    hd_id = models.IntegerField(('Head Office ID'),default=0,max_length=3)
    joining_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    renew_year = models.IntegerField(max_length=2,default=1)
    last_ip = models.GenericIPAddressField(default='192.168.0.1')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    sess_token = models.CharField(max_length=10,default=0)
    
    object = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name','first_name','role_id']

    def __str__(self):
        return f"{self.user_name}"


class Bill_manage_info(models.Model):
    user_id = models.ForeignKey("NewUSER", verbose_name=_(""), on_delete=models.CASCADE)
    reason = models.CharField(max_length=100)
    cin_number = models.CharField(max_length=100)
    sms_credit = models.IntegerField(max_length=1000)
    sms_debit = models.IntegerField(max_length=1000)
    system_credit = models.IntegerField(max_length=1000)
    system_debit = models.IntegerField(max_length=1000)
    whatsapp_credit = models.IntegerField(max_length=1000)
    whatsapp_debit = models.IntegerField(max_length=1000)
    shortname = models.CharField(max_length=50)
    pan_card = models.CharField(max_length=16)
    is_regdealer = models.BooleanField(_("Is regular Dealer"))
    stateCode = models.IntegerField(max_length=3) #FK
    gstNum = models.CharField(max_length=14)
    reg_dealer_type = models.IntegerField() # FK
    pin_code = models.IntegerField(max_length=5)
    status_type = models.IntegerField(max_length=2)
    kyc = models.CharField(max_length=50)
    landlineNUM = models.IntegerField(max_length=8)
    actual_billQty = models.BooleanField(_("Bill Quantity"))
    edit_status = models.BooleanField(_("edit status"))
    last_updated = models.DateTimeField(auto_now=True)