from collections import ChainMap
from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import Bill_banks, Bill_Account_type,Bill_Cash
from api.user.models import NewUSER
from api.models import StateCodes
class GetBankTable(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = ["id"]

    def getTable(self, id):
        data = Bill_banks.objects.filter(user_id=id).values()
        print(data)
        return data
#account_type StateCode
class GetBanks(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = ["id"]
    
    def get(self,id):
        # returns user created bank count.
        res = Bill_banks.objects.filter(user_id = id).values()
        return res.count()
    def bankdetail(self,id):
        res = Bill_banks.objects.filter(id=id).values() # returns bank with the id.
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
    def update_bank(self,validated_data):
        for attr,val in validated_data.items():
            if attr=="user_id":
                value = NewUSER.object.get(pk=val)
                setattr(self.instance,attr,value)
            elif attr == "StateCode":
                value = StateCodes.objects.get(pk=val)
                setattr(self.instance,attr,value)
            elif attr =="account_type":
                value = Bill_Account_type.objects.get(pk=val)
                setattr(self.instance,attr,value)
            else:
                setattr(self.instance,attr,val)
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
    
    def get(self,id):
        # returns user created bank count.
        res = Bill_Cash.objects.filter(user_id = id).values()
        return res.count()
    def cashdetail(self,id):
        res = Bill_Cash.objects.filter(pk=id).values() # returns bank with the id.
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
        user_id = self.validated_data["user_id"] ,
        cash_name = self.validated_data["cash_name"] ,
        cash_balance = self.validated_data["cash_balance"] 
        )
        HOCash.save()
        return 'data saved'
    def update_cash(self,validated_data):
        for attr,val in validated_data.items():
            if attr=="user_id":
                value = NewUSER.object.get(pk=val)
                setattr(self.instance,attr,value)
            else:
                setattr(self.instance,attr,val)
        self.instance.save()
        return self.instance


class GetAccounttype(serializers.ModelSerializer):
    class Meta:
        model = Bill_Account_type
        fields = ["id"]

    def AccType(self):
        data = Bill_Account_type.objects.filter().values("id", "account_type_name")
        return data
