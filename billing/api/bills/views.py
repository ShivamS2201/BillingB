from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import GetBankTable,GetCashTable,AddBanks,GetBanks,AddCash,GetCash,AddCategory,AddPlace,AddGroup
from rest_framework.response import Response
from api.serializers import GetStateCodes
from .serializers import GetAccounttype
from rest_framework import status
from .models import Bill_Cash,Bill_banks
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
class Update_Bank(APIView):
    def put(self,request,id):
        instance =  Bill_banks.objects.get(id = id)
        serializer = AddBanks(instance,data = request.data)
        if serializer.is_valid():
            resp = serializer.update_bank(request.data)
        return Response("Bank Detail Updated",status=status.HTTP_200_OK)
     

class getCashTable(APIView):
    def get(self,request,id):
        serializer = GetCashTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)
class HOAddCash(APIView):
    def post(seld,request,id):
        serializer = AddCash(data = request.data)
        if serializer.is_valid():
            re = serializer.save()
            return Response(re)
class HOgetCash(APIView):
    def get(self,request,id):
        serializer = GetCash(data = request.data)
        if serializer.is_valid():
            re = serializer.get(id)
            return Response(re)
class FetchCashdetail(APIView):
    def get(self,request,id):
        serializer = GetCash(data = request.data)
        if serializer.is_valid():
            re = serializer.cashdetail(id)
            return Response(re)
class Update_Cash(APIView):
    def put(self,request,id):
        instance =  Bill_Cash.objects.get(id = id)
        serializer = AddCash(instance,data = request.data)
        if serializer.is_valid():
            resp = serializer.update_cash(request.data)
        return Response("Cash Detail Updated",status=status.HTTP_200_OK)

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

class HOAddPlace(APIView):
    def post(self,request):
        serializer = AddPlace(data=request.data)
        if serializer.is_valid():
            re = serializer.save()
            return Response(re,status=status.HTTP_100_CONTINUE)

class HOAddGroup(APIView):
    def post(self,request):
        serializer = AddGroup(data=request.data)
        if serializer.is_valid():
            re = serializer.save()
            return Response({"response":re},status=status.HTTP_100_CONTINUE)
        
class HOAddCategory(APIView):
    def post(self,request):
        serializer = AddCategory(data=request.data)
        if serializer.is_valid():
            re = serializer.save()
            return Response({"response":re},status=status.HTTP_100_CONTINUE)
