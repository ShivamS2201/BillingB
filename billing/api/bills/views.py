from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import GetBankTable
from rest_framework.response import Response

# Create your views here.
class getBankTable(APIView):
    def get(self,request,id):
        serializer = GetBankTable(data = request.data)
        TableData = serializer.getTable(id)
        return Response(TableData)
