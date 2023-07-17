from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import Bill_banks,Bill_Account_type
class GetBankTable(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks
        fields = ["id"]

    def getTable(self,id):
        data = Bill_banks.objects.filter(user_id = id).values()
        print(data)
        return data
    
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
            "Primary_type",
        ]

    def save(self):
        print(self.validated_data)
        
        return "chalgya"
    
class GetAccounttype(serializers.ModelSerializer):
    class Meta:
        model = Bill_Account_type
        fields = ["id"]

    def AccType(self):
        data = Bill_Account_type.objects.filter().values("id","account_type_name")
        print(data)
        return data