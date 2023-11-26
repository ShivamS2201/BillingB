from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import GetBankTable,GetCashTable,AddBanks,GetBanks,AddCash,GetCash,AddCategory,AddPlace,AddGroup,GetPlaceTable,GetCategoryTable,GetGroupTable,CustomerSerializer,GetPlace,getCurrency,getExport,AddLimit,GetCustomerCount,GetCustTable,GetMessageTable,AddMessage,GetTemplates,GetBillInvoice
from rest_framework.response import Response
from api.serializers import GetStateCodes,Getdealertype
from .serializers import GetAccounttype
from rest_framework import status
from .models import Bill_Cash,Bill_banks,Bill_invoce
from .sendSMS import send_SMS,send_Whatsapp,send_Email
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import viewsets

@api_view(('GET',))
def getImagePath(request,id): #build this again in React and use Img url .path
    print(id)
    img_name = Bill_invoce.objects.filter(user_id=id).values("logo") #apply a try catch blob here
    img_path = '/media/'+img_name[0]['logo']
    return Response({"path":img_path},status= status.HTTP_200_OK)
class getBankTable(APIView):
    def get(self,request,id):
        serializer = GetBankTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)
class BankSelect(APIView):
    def get(self,request,id):
        serializer = GetBanks(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getBankSelect(id)
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

class RegisterDealerType(APIView):
    def get(self,request):
        serializer = Getdealertype(data=request.data)
        if serializer.is_valid():
            res = serializer.getDealer()
            return Response(res)
class Accountype(APIView):
    def get(self,request):
        serializer = GetAccounttype(data=request.data)
        if serializer.is_valid():
            res = serializer.AccType()
            return Response(res)

class Placebymaster(APIView):
    def get(self,request,id):
        serializer = GetPlace(data=request.data)
        if serializer.is_valid():
            res = serializer.getPlace(id)
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

class getPlaceTable(APIView):
     def get(self,request,id):
        serializer = GetPlaceTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)
class getGroupTable(APIView):
     def get(self,request,id):
        serializer = GetGroupTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)
class getCatTable(APIView):
     def get(self,request,id):
        serializer = GetCategoryTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response(TableData)
        
class CustomerView(APIView):
    parser_classes = [MultiPartParser,FormParser]

    def post(self,request,format=None):
        serializer = CustomerSerializer(data = request.data)
        if serializer.is_valid():
            res = serializer.save() # Automatic Function to add the customer instance to DB 
            return Response(res,status= status.HTTP_200_OK)
        else:
            return Response("Customer Not Added",status= status.HTTP_400_BAD_REQUEST)
        
class CurrencyFetch(APIView):
    def get(self,request):
        serializer = getCurrency(data = request.data)
        if serializer.is_valid():
            res = serializer.FetchCurrency()
            return Response(res,status=status.HTTP_200_OK)
        else:
            return Response("Error in Currency",status=status.HTTP_400_BAD_REQUEST)
        
class ExportFetch(APIView):
    def get(self,request):
        serializer = getExport(data = request.data)
        if serializer.is_valid():
            res = serializer.FetchExport()
            return Response(res,status=status.HTTP_200_OK)
        else:
            return Response("Error in Export",status=status.HTTP_400_BAD_REQUEST)
        
class CustomerLimitView(APIView):
    parser_classes = [MultiPartParser,FormParser]
    def post(self,request):
        serializer = AddLimit(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Limit Added",status=status.HTTP_200_OK)
        else:
            return Response("Limit Not Added",status= status.HTTP_400_BAD_REQUEST)

class CustCntview(APIView):
    def get(self,request,id):
        serializer = GetCustomerCount(data = request.data)
        if serializer.is_valid():
            re = serializer.get(id)
            return Response(re)
        
class getCustTable(APIView):
     def get(self,request,id):
        serializer = GetCustTable(data = request.data)
        if serializer.is_valid():
            TableData = serializer.getTable(id)
            return Response({"response":TableData},status=status.HTTP_200_OK)
        
class GetMsgTable(APIView):
    def get(self,request):
        serializer = GetMessageTable(data = request.data)
        if serializer.is_valid():
            Table = serializer.getTable()
            return Response(Table,status=status.HTTP_200_OK)
        
class MessageService(APIView):
    def post(self,request):
        serializer = AddMessage(data=request.data)
        send_SMS(request.data)
        if serializer.is_valid():
            resp = serializer.MessageAdd()
            # Send Message Code here.
            return Response(resp,status=status.HTTP_200_OK)
        
class WhatsappMessageService(APIView):
    def post(self,request):
        # serializer = AddMessage(data=request.data)
        send_Whatsapp(request.data)
        # if serializer.is_valid():
            # resp = serializer.MessageAdd()
            # Send Message Code here.
        return Response("ok",status=status.HTTP_200_OK)
    
class EmailMessageService(APIView):
    def post(self,request):
        # serializer = AddMessage(data=request.data)
        send_Email(request.data)
        # if serializer.is_valid():
            # resp = serializer.MessageAdd()
            # Send Message Code here.
        return Response("ok",status=status.HTTP_200_OK)
    
class GetTemplatesList(APIView):
    def get(self,request):
        serializer = GetTemplates(data = request.data)
        if serializer.is_valid():
            Table = serializer.getTemplates()
            return Response(Table,status=status.HTTP_200_OK)
        else:
            return Response("Unable To fetch",status=status.HTTP_200_OK)
        
class BillInvoiceDetails(viewsets.ModelViewSet):
    queryset = Bill_invoce.objects.all().order_by('id')
    serializer_class = GetBillInvoice #(data=request.data)
        # if serializer.is_valid():
        #     Data = serializer.getInvoiceDetails(id)
        #     return Response(Data,status=status.HTTP_200_OK)
        # else:
        #     return Response(False,status=status.HTTP_200_OK)

