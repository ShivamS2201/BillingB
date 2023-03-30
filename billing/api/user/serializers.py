import json
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import Bill_manage_info, NewUSER
from django.contrib.auth.hashers import (
    make_password,
)  # brings passwords in clear text format and Hashes it


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

    def update(self, instance, validated_data):
        for attr, val in validated_data.items():
            if attr == "password":  # for password updation we creat this.
                instance.set_password(val)
            else:
                setattr(instance, attr, val)

        instance.save()
        return instance

    class Meta:
        model = NewUSER  # model to serialize
        fields = [
            "id",
            "user_name",
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
class SalesRegistrationSerializer(serializers.ModelSerializer):

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
            "role_id_of_creator",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
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
    dist_ID_data = creator_id = serializers.CharField(
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
            "dist_ID_data"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        creator_id = int(self.validated_data["creator_id"])
        datarole_id = int(self.validated_data["role_id"])
        dist_ID_data = int(self.validated_data["dist_ID_data"])
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
        )
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user.pk
