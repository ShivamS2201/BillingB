from collections import ChainMap
from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import (
    Bill_banks,
    Bill_Account_type,
    Bill_Cash,
    Places,
    Group,
    Category,
    Customer,
    CustomerLimit,
)
from api.user.models import NewUSER
from api.models import StateCodes, Currency, Export


class GetBankTable(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = ["id"]

    def getTable(self, id):
        data = Bill_banks.objects.filter(user_id=id).values()
        print(data)
        return data


# account_type StateCode
class GetBanks(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = ["id"]

    def get(self, id):
        # returns user created bank count.
        res = Bill_banks.objects.filter(user_id=id).values()
        return res.count()

    def bankdetail(self, id):
        res = Bill_banks.objects.filter(id=id).values()  # returns bank with the id.
        print(res)
        # ress = Bill_banks.objects.filter(id=id).values("StateCode","account_type") # returns bank with the id.
        # print("ress",ress)
        # stateCode = StateCodes.objects.filter(state_code = ress[0]['StateCode']).values("id","state_code","state_name")
        # print(stateCode)
        # Accounttype = Bill_Account_type.objects.filter(id = ress[0]['account_type']).values("account_type_name","id")
        # print(Accounttype)
        # res = ChainMap({"account_type":Accounttype[0]["account_type_name"],"StateCode":stateCode[0]["state_name"]}, res)
        return res


class AddBanks(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = [
            "bank_name",
            "Branch",
            "user_id",
            "account_num",
            "ifsc_code",
            "StateCode",
            "gstNumber",
            "account_type",
            "open_balance",
        ]

    def save(self):
        HOBANK = Bill_banks(
            bank_name=self.validated_data["bank_name"],
            Branch=self.validated_data["Branch"],
            user_id=self.validated_data["user_id"],
            account_num=self.validated_data["account_num"],
            ifsc_code=self.validated_data["ifsc_code"],
            StateCode=self.validated_data["StateCode"],
            gstNumber=self.validated_data["gstNumber"],
            account_type=self.validated_data["account_type"],
            open_balance=self.validated_data["open_balance"],
        )
        HOBANK.save()
        return r'{self.vaidated["bank_name"]} Added.'

    def update_bank(self, validated_data):
        for attr, val in validated_data.items():
            if attr == "user_id":
                value = NewUSER.object.get(pk=val)
                setattr(self.instance, attr, value)
            elif attr == "StateCode":
                value = StateCodes.objects.get(pk=val)
                setattr(self.instance, attr, value)
            elif attr == "account_type":
                value = Bill_Account_type.objects.get(pk=val)
                setattr(self.instance, attr, value)
            else:
                setattr(self.instance, attr, val)
        self.instance.save()
        return self.instance


class GetCashTable(serializers.ModelSerializer):
    class Meta:
        model = Bill_Cash
        fields = ["id"]

    def getTable(self, id):
        data = Bill_Cash.objects.filter(user_id=id).values()
        print(data)
        return data


class GetCash(serializers.ModelSerializer):
    class Meta:
        model = Bill_Cash
        fields = ["id"]

    def get(self, id):
        # returns user created bank count.
        res = Bill_Cash.objects.filter(user_id=id).values()
        return res.count()

    def cashdetail(self, id):
        res = Bill_Cash.objects.filter(pk=id).values()  # returns bank with the id.
        print(res)
        return res


class AddCash(serializers.ModelSerializer):
    class Meta:
        model = Bill_Cash
        fields = [
            "user_id",
            "cash_name",
            "cash_balance",
        ]

    def save(self):
        HOCash = Bill_Cash(
            user_id=self.validated_data["user_id"],
            cash_name=self.validated_data["cash_name"],
            cash_balance=self.validated_data["cash_balance"],
        )
        HOCash.save()
        return "data saved"

    def update_cash(self, validated_data):
        for attr, val in validated_data.items():
            if attr == "user_id":
                value = NewUSER.object.get(pk=val)
                setattr(self.instance, attr, value)
            else:
                setattr(self.instance, attr, val)
        self.instance.save()
        return self.instance


class GetAccounttype(serializers.ModelSerializer):
    class Meta:
        model = Bill_Account_type
        fields = ["id"]

    def AccType(self):
        data = Bill_Account_type.objects.filter().values("id", "account_type_name")
        return data


class AddPlace(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ["master_id", "place_name"]

    def save(self):
        res = Places(
            master_id=self.validated_data["master_id"],
            place_name=self.validated_data["place_name"],
        )
        res.save()
        return "Place Added "


class GetPlace(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ["id"]

    def getPlace(self, id):
        res = Places.objects.filter(master_id=id).values()
        return res


class AddGroup(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["master_id", "cust_grp"]

    def save(self):
        res = Group(
            master_id=self.validated_data["master_id"],
            cust_grp=self.validated_data["cust_grp"],
        )
        res.save()
        return "Group Added"


class AddCategory(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["master_id", "cat_name"]

    def save(self):
        res = Category(
            master_id=self.validated_data["master_id"],
            cat_name=self.validated_data["cat_name"],
        )
        res.save()
        return "Category Added"


class GetPlaceTable(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ["id"]

    def getTable(self, id):
        data = Places.objects.filter(master_id=id).values()
        print(data)
        return data


class GetGroupTable(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id"]

    def getTable(self, id):
        data = Group.objects.filter(master_id=id).values()
        print(data)
        return data


class GetCategoryTable(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id"]

    def getTable(self, id):
        data = Category.objects.filter(master_id=id).values()
        print(data)
        return data


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "master_id",
            "cust_name",
            "cust_code",
            "Image",
            "cust_state_id",
            "cust_pincode",
            "cust_pan",
            "cust_place",
            "cust_group",
            "cust_mobile",
            "cust_landline",
            "cust_email",
            "address",
            "cust_is_reg",
            "cust_dealer_type",
            "cust_gst",
            "cust_currency",
            "export_option",
            "export_type",
            "modified_by",
            "status",
        ]

    def save(self):
        res = Customer(
            master_id=self.validated_data["master_id"],
            cust_name=self.validated_data["cust_name"],
            cust_code=self.validated_data["cust_code"],
            Image=self.validated_data["Image"],
            cust_state_id=self.validated_data["cust_state_id"],
            cust_pincode=self.validated_data["cust_pincode"],
            cust_pan=self.validated_data["cust_pan"],
            cust_place=self.validated_data["cust_place"],
            cust_group=self.validated_data["cust_group"],
            cust_mobile=self.validated_data["cust_mobile"],
            cust_landline=self.validated_data["cust_landline"],
            cust_email=self.validated_data["cust_email"],
            address=self.validated_data["address"],
            cust_is_reg=self.validated_data["cust_is_reg"],
            cust_dealer_type=self.validated_data["cust_dealer_type"],
            cust_gst=self.validated_data["cust_gst"],
            cust_currency=self.validated_data["cust_currency"],
            export_option=self.validated_data["export_option"],
            export_type=self.validated_data["export_type"],
            modified_by=self.validated_data["modified_by"],
            status=self.validated_data["status"],
        )
        res.save()
        return res.pk


class getCurrency(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ["id"]

    def FetchCurrency(self):
        res = Currency.objects.filter().values()
        return res


class getExport(serializers.ModelSerializer):
    class Meta:
        model = Export
        fields = ["id"]

    def FetchExport(self):
        res = Export.objects.filter().values()
        return res


class AddLimit(serializers.ModelSerializer):
    class Meta:
        model = CustomerLimit
        fields = [
            "is_limit",
            "amount",
            "cust_openingBalance",
            "user_id",
            "sales_type",
            "rcm",
            "cust_id",
        ]

    def save(self):
        res = AddLimit(
            is_limit=self.validated_data["is_limit"],
            amount=self.validated_data["amount"],
            cust_openingBalance=self.validated_data["cust_openingBalance"],
            user_id=self.validated_data["user_id"],
            sales_type=self.validated_data["sales_type"],
            rcm=self.validated_data["rcm"],
            cust_id=self.validated_data["cust_id"],
        )
        res.save()
        return "Limit added"
