from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import Bill_banks
class GetBankTable(serializers.ModelSerializer):
    class Meta:
        model = Bill_banks

    def getTable(self,id):
        data = Bill_banks.objects.filter(user_id = id).values()
        print(data)
        return data