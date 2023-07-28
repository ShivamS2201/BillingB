from django.urls import path, include
from rest_framework import routers
from .views import getBankTable,hoAddBank,StateCodesBank,Accountype,HOgetBank,FetchBankdetail

router = routers.DefaultRouter()

urlpatterns = [
    path("getBank/HO/<int:id>",getBankTable.as_view(),name="Banks"),
    path("bank/HO/addbank/<int:id>",hoAddBank.as_view()),
    path("bank/HO/getBankcnt/<int:id>",HOgetBank.as_view()),# passes userid
    #path("bank/HO/editbank/<int:id>",FetchBankdetail.as_view()), # passes bank id from table
    path("bank/HO/fetchbank/<int:id>",FetchBankdetail.as_view()), # passes bank id from table
    path("bank/HO/addbank/stateCodes/",StateCodesBank.as_view()),
    path("bank/HO/addbank/acctype/",Accountype.as_view()),
    
]