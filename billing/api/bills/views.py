from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import GetBankTable,AddBanks,GetBanks
from rest_framework.response import Response
from api.serializers import GetStateCodes
from .serializers import GetAccounttype
# Create your views here.
class getBankTable(APIView):
    def get(self,request,id):
        serializer = GetBankTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)

class hoAddBank(APIView):
    def post(seld,request,id):
        serializer = AddBanks(data = request.data)
        if serializer.is_valid():
            re = serializer.save()
            return Response(re)
        
class HOgetBank(APIView):
    def get(self,request,id):
        serializer = GetBanks(data = request.data)
        if serializer.is_valid():
            re = serializer.get(id)
            return Response(re)
        
class FetchBankdetail(APIView):
    def get(self,request,id):
        serializer = GetBanks(data = request.data)
        if serializer.is_valid():
            re = serializer.bankdetail(id)
            return Response(re)
        
class StateCodesBank(APIView):
    def get(self,request):
        serializer = GetStateCodes(data=request.data)
        if serializer.is_valid():
            res = serializer.getState()
            return Response(res)

class Accountype(APIView):
    def get(self,request):
        serializer = GetAccounttype(data=request.data)
        if serializer.is_valid():
            res = serializer.AccType()
            return Response(res)
        