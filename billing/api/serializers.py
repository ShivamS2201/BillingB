from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import StateCodes,Register_dealer

class GetStateCodes(serializers.ModelSerializer):
    class Meta:
        model = StateCodes
        fields = ["id"]

    def getState(self):
        data = StateCodes.objects.filter().values()
        return data
    
class Getdealertype(serializers.ModelSerializer):
    class Meta:
        model = Register_dealer
        fields = ["id"]
    def getDealer(self):
        data = Register_dealer.objects.filter().values()
        return data