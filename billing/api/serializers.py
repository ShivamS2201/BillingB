from rest_framework import serializers
from rest_framework.decorators import authentication_classes, permission_classes  # is
from .models import StateCodes

class GetStateCodes(serializers.ModelSerializer):
    class Meta:
        model = StateCodes
        fields = ["id"]

    def getState(self):
        data = StateCodes.objects.filter().values()
        return data