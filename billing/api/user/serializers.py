import json
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import Bill_manage_info, NewUSER
from django.contrib.auth.hashers import (
    make_password,
)  # brings passwords in clear text format and Hashes it
from collections import ChainMap
class UserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(
            **validated_data
        )  # pass added here so that validated data can only access here.

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def update(self, validated_data): #works
        for attr, val in validated_data.items():
            if attr == "password":  # for password updation we creat this.
                self.instance.set_password(val)
            elif attr == "system_debit":  # for password updation we creat this.
                self.instance.set_password(val)
            else:
                setattr(self.instance, attr, val)

        self.instance.save()
        return self.instance

    class Meta:
        model = NewUSER  # model to serialize
        fields = [
            "id",
            "email",
            "first_name",
            "role_id",
            "is_active",
            "distID",
            "salesid",
            "hd_id",
            "is_staff",
            "joining_date",
            "updated_at",
        ]
        extra_kwargs = {"password": {"write_only": True}}  # for extra functionalities.
        read_only_field = ["is_active", "is_staff", "joining_date", "updated_at"]

        # fields = ('name', 'email', 'password','is_active','is_staff','is_superuser',) #section 6 3rd video.
class MSGSerializer(serializers.ModelSerializer):
    class Meta:

        model = Bill_manage_info
        fields = [
            "user_id",
            "reason",
            "cin_number",
            "sms_credit",
            "system_credit",
            "whatsapp_credit",
            "shortname",
            "pan_card",
            "is_regdealer",
            "stateCode",
            "gstNum",
            "reg_dealer_type",
            "pin_code",
            "status_type",
            "kyc",
            "landlineNUM",
            "actual_billQty",
            "edit_status"
        ]

    def save(self,id):
        if len(Bill_manage_info.objects.filter(user_id=id))>1:
            return "USER Billing entry exists",True
        else:
            bill_info = Bill_manage_info(
            user_id=self.validated_data["user_id"],
            reason=self.validated_data["reason"],
            cin_number=self.validated_data["cin_number"],
            sms_credit=self.validated_data["sms_credit"],
            system_credit=self.validated_data["system_credit"],
            whatsapp_credit=self.validated_data["whatsapp_credit"],
            shortname=self.validated_data["shortname"],
            pan_card=self.validated_data["pan_card"],
            is_regdealer=self.validated_data["is_regdealer"],
            stateCode=self.validated_data["stateCode"],
            gstNum=self.validated_data["gstNum"],
            reg_dealer_type=self.validated_data["reg_dealer_type"],
            pin_code=self.validated_data["pin_code"],
            status_type = self.validated_data["status_type"],
            kyc = self.validated_data["kyc"],
            landlineNUM = self.validated_data["landlineNUM"],
            actual_billQty = self.validated_data["actual_billQty"],
            edit_status = self.validated_data["edit_status"]
        )
            bill_info.save()
            return "User Created",False
    
    def get(self,id): #get function for Billing info view in viewsets
        res = Bill_manage_info.objects.filter(user_id = id).values()
        return res
    def update(self,validated_data):

        print(validated_data["system_credit"])
        for attr, val in validated_data.items():
           if attr =="user_id":
               value = NewUSER.object.get(pk=val)
               setattr(self.instance,attr,value)
           elif attr =="edit_status" or attr =="actual_billQty" or attr =="is_regdealer":
               setattr(self.instance, attr, bool(val)) 
           elif attr =="landlineNUM":
               setattr(self.instance, attr, val)
           elif (attr =="system_credit" or attr =="sms_credit" or attr =="whatsapp_credit") and int(validated_data[attr])<0:
               return [False,"Cannot do debit in 0 balance"]
           elif (attr =="system_credit") and int(validated_data[attr])>0:
               setattr(self.instance,attr,int(val) - int(validated_data["system_debit"]))
           elif (attr =="sms_credit") and int(validated_data[attr])>0:
               setattr(self.instance,attr,int(val) - int(validated_data["sms_debit"]))
           elif (attr =="whatsapp_credit") and int(validated_data[attr])>0:
               setattr(self.instance,attr,int(val) - int(validated_data["whatsapp_debit"])) 
           elif (attr =="system_debit" or attr =="sms_debit" or attr =="whatsapp_debit"):
               setattr(self.instance,attr,val)
           else:
               setattr(self.instance,attr,val)
        self.instance.save()
        return self.instance.pk
class DistributorRegisterationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    creator_id = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    class Meta:
        model = NewUSER
        fields = [
            "email",
            "password",
            "password2",
            "user_name",
            "first_name",
            "role_id",
            "creator_id",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
        user = NewUSER(
            email=self.validated_data["email"],
            user_name=self.validated_data["user_name"],
            first_name=self.validated_data["first_name"],
            role_id=datarole_id,
            owner_id = creator_id,
        )
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user.pk
class SalesRegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    creator_id = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    owner_id_data =  serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    class Meta:
        model = NewUSER
        fields = [
            "email",
            "password",
            "password2",
            "user_name",
            "first_name",
            "role_id",
            "creator_id",
            "owner_id_data"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
        owner_id_data = int(self.validated_data["owner_id_data"])
        # if role_id_of_creator < datarole_id:
        #     if role_id_of_creator == 2 and datarole_id != 3:
        #         raise serializers.ValidationError(
        #             {"Error": "Owner can only create Distributor"}
        #         )
        #     if role_id_of_creator == 3 and datarole_id != 4:
        #         raise serializers.ValidationError(
        #             {"Error": "Distributor can only create Sales"}
        #         )
        #     if role_id_of_creator == 4 and datarole_id != 5:
        #         raise serializers.ValidationError(
        #             {"Error": "Sales can only create Head Office"}
        #         )
        #     if role_id_of_creator == 5 and datarole_id != 6:
        #         raise serializers.ValidationError(
        #             {"Error": "Head Office can only create Customer"}
        #         )
        #     if role_id_of_creator == 6 and datarole_id != 7:
        #         raise serializers.ValidationError(
        #             {"Error": "Customer can only create User"}
        #         )
        # else:
        #     raise serializers.ValidationError(
        #         {"Role ": "Cannot designate superior role."}
        #     )
        #if user being created is a sales
        user = NewUSER(
            email=self.validated_data["email"],
            user_name=self.validated_data["user_name"],
            first_name=self.validated_data["first_name"],
            role_id=datarole_id,
            distID = creator_id,
            owner_id = owner_id_data
        )
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user.pk
class HofficeRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    creator_id = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    dist_ID_data = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    owner_id_data = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )

    class Meta:
        model = NewUSER
        fields = [
            "email",
            "password",
            "password2",
            "user_name",
            "first_name",
            "role_id",
            "creator_id",
            "dist_ID_data",
            "owner_id_data"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
        dist_ID_data = int(self.validated_data["dist_ID_data"])
        owner_id_data = int(self.validated_data["owner_id_data"])

        # if role_id_of_creator < datarole_id:
        #     if role_id_of_creator == 2 and datarole_id != 3:
        #         raise serializers.ValidationError(
        #             {"Error": "Owner can only create Distributor"}
        #         )
        #     if role_id_of_creator == 3 and datarole_id != 4:
        #         raise serializers.ValidationError(
        #             {"Error": "Distributor can only create Sales"}
        #         )
        #     if role_id_of_creator == 4 and datarole_id != 5:
        #         raise serializers.ValidationError(
        #             {"Error": "Sales can only create Head Office"}
        #         )
        #     if role_id_of_creator == 5 and datarole_id != 6:
        #         raise serializers.ValidationError(
        #             {"Error": "Head Office can only create Customer"}
        #         )
        #     if role_id_of_creator == 6 and datarole_id != 7:
        #         raise serializers.ValidationError(
        #             {"Error": "Customer can only create User"}
        #         )
        # else:
        #     raise serializers.ValidationError(
        #         {"Role ": "Cannot designate superior role."}
        #     )
        #if user being created is a sales
        user = NewUSER(
            email=self.validated_data["email"],
            user_name=self.validated_data["user_name"],
            first_name=self.validated_data["first_name"],
            role_id=datarole_id,
            distID = dist_ID_data,
            salesid = creator_id,
            owner_id = owner_id_data
        )
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user.pk   
class BranchRegisterationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    creator_id = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    dist_ID_data = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    sales_ID_data = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    owner_id_data = serializers.CharField(
        style={"input_type": "integer"}, write_only=True
    )
    class Meta:
        model = NewUSER
        fields = [
            "email",
            "password",
            "password2",
            "user_name",
            "first_name",
            "role_id",
            "creator_id",
            "dist_ID_data",
            "sales_ID_data",
            "owner_id_data"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
        dist_ID_data = int(self.validated_data["dist_ID_data"])
        sales_ID_data = int(self.validated_data["sales_ID_data"])
        owner_id_data = int(self.validated_data["owner_id_data"])

        user = NewUSER(
            email=self.validated_data["email"],
            user_name=self.validated_data["user_name"],
            first_name=self.validated_data["first_name"],
            role_id=datarole_id,
            distID = dist_ID_data,
            salesid = sales_ID_data,
            hd_id = creator_id,
            owner_id = owner_id_data
        )
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user.pk
# from owner ------------------------------------------------
class GetByOwner(serializers.ModelSerializer): # returns all counts of all present users under this name.
    class Meta:
        model = NewUSER
        fields =[
            "id"
        ]
    def get(self,getid,role):
        res = NewUSER.object.filter(owner_id = getid,role_id =role).values()
        return res.count()
    def getUser(self,getid): #gets user for update in owner level form
        res = NewUSER.object.filter(id = getid).values("first_name","email","user_name","id","role_id","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","bill_manage_info__reason","bill_manage_info__kyc","bill_manage_info__gstNum","bill_manage_info__pan_card","bill_manage_info__stateCode","bill_manage_info__is_regdealer","bill_manage_info__actual_billQty","bill_manage_info__edit_status","bill_manage_info__reg_dealer_type","bill_manage_info__pin_code","bill_manage_info__status_type","bill_manage_info__cin_number","bill_manage_info__shortname")
        return res
class GetDistributorByOwner(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        data = NewUSER.object.filter(owner_id = id,role_id =role).values("id","joining_date","first_name","email","is_active","role_id","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","renew_year","bill_manage_info__reason","bill_manage_info__kyc","bill_manage_info__gstNum","bill_manage_info__pan_card","bill_manage_info__stateCode","bill_manage_info__is_regdealer","bill_manage_info__actual_billQty","bill_manage_info__edit_status","bill_manage_info__reg_dealer_type","bill_manage_info__pin_code","bill_manage_info__status_type","bill_manage_info__cin_number","bill_manage_info__shortname")
        return data
class GetSalesByOwner(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(owner_id = id,role_id =role).values("id","joining_date","first_name","email","renew_year","is_active","role_id","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","distID")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetHOByOwner(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(owner_id = id,role_id =role).values("id","renew_year","is_active","role_id","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","salesid","distID")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetBrByOwner(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp=[]
        data = NewUSER.object.filter(owner_id = id,role_id =role).values("id","renew_year","is_active","role_id","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","distID","salesid","hd_id")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            hdid = NewUSER.object.filter(id = ele["hd_id"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"],"first_name_HO":hdid[0]["first_name"]}, ele)
            resp.append(ele)

        return resp

# from distributor---------------------------------------
class GetSalesByDist(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        data = NewUSER.object.filter(distID = id,role_id =role).values("id","role_id","renew_year","is_active","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit")
        return data
class GetHOByDist(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(distID = id,role_id =role).values("id","renew_year","is_active","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","salesid","distID")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetBrByDist(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(distID = id,role_id =role).values("joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","distID","salesid","hd_id")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            hdid = NewUSER.object.filter(id = ele["hd_id"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"],"first_name_HO":hdid[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetBydistributor(serializers.ModelSerializer):
    class Meta:
        model = NewUSER
        fields =[
            "id"
        ]
    def get(self,getid,role):
        res = NewUSER.object.filter(distID = getid,role_id =role).values()
        return res.count()
#------from sales---------------------------------------------------------------------------
class GetHObySales(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(salesid = id,role_id =role).values("id","renew_year","is_active","role_id","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","salesid","distID")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetBrbysales(serializers.ModelSerializer):
    class Meta:
        model = Bill_manage_info

    def getTable(self,id,role):
        resp = []
        data = NewUSER.object.filter(salesid = id,role_id =role).values("id","renew_year","is_active","role_id","joining_date","first_name","email","bill_manage_info__landlineNUM","bill_manage_info__id","bill_manage_info__system_credit","bill_manage_info__system_debit","bill_manage_info__sms_credit","bill_manage_info__sms_debit","bill_manage_info__whatsapp_credit","bill_manage_info__whatsapp_debit","salesid","distID","salesid","hd_id")
        for ele in data:
            dist = NewUSER.object.filter(id = ele["distID"]).values("first_name")
            sales = NewUSER.object.filter(id = ele["salesid"]).values("first_name")
            hdid = NewUSER.object.filter(id = ele["hd_id"]).values("first_name")
            ele = ChainMap({"first_name_dist":dist[0]["first_name"],"first_name_sales":sales[0]["first_name"],"first_name_HO":hdid[0]["first_name"]}, ele)
            resp.append(ele)
        return resp
class GetBysales(serializers.ModelSerializer):
    class Meta:
        model = NewUSER
        fields =[
            "id"
        ]
    def get(self,getid,role):
        res = NewUSER.object.filter(salesid = getid,role_id =role).values()
        return res.count()

# class GetBranchNumSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = NewUSER
#         fields =[
#             'id',
#         ]
#     def get(self,getid,role):
#         res = NewUSER.object.filter(distID = getid,role_id =role).values()
#         return res
#---------------------------------------------------------------------