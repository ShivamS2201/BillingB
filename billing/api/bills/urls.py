from django.urls import path, include
from rest_framework import routers
from .views import getBankTable,hoAddBank,StateCodesBank,Accountype,HOgetBank,FetchBankdetail,HOAddCash,getCashTable,FetchCashdetail,Update_Cash,Update_Bank,HOAddCategory,HOAddGroup,HOAddPlace,getPlaceTable,getGroupTable,getCatTable,CustomerView,Placebymaster,RegisterDealerType,CurrencyFetch,ExportFetch,CustomerLimitView,CustCntview,getCustTable,GetMsgTable,MessageService,WhatsappMessageService,EmailMessageService,GetTemplatesList,BankSelect,BillInvoiceDetails,getImagePath,BillSeriesDetails,BillSeriesCount
router = routers.DefaultRouter()
router.register(r'getInvoice', BillInvoiceDetails,basename="BillInvoiceDetails") #register a path for category router coming from api urls!

urlpatterns = [
    path("getBank/HO/<int:id>",getBankTable.as_view(),name="Banks"),
    path("getcash/HO/<int:id>",getCashTable.as_view()), # passes bank id from table
    path("bank/HO/addbank/<int:id>",hoAddBank.as_view()),
    path("bank/HO/addcash/<int:id>",HOAddCash.as_view()), # passes bank id from table
    path("bank/HO/getBankcnt/<int:id>",HOgetBank.as_view()),# passes userid
    path("bank/HO/editbank/<int:id>",Update_Bank.as_view()), # passes bank id from table
    path("bank/HO/fetchbank/<int:id>",FetchBankdetail.as_view()), # passes bank id from table,
    path("bank/HO/fetchcash/<int:id>",FetchCashdetail.as_view()), # passes bank id from table
    path("bank/HO/editcash/<int:id>",Update_Cash.as_view()), # passes bank id from table
    path("bank/HO/addplace/",HOAddPlace.as_view()),
    path("bank/HO/fetchplace/<int:id>",getPlaceTable.as_view()), # passes bank id from table
    path("bank/HO/getplaces/<int:id>",Placebymaster.as_view()), # passes bank id from table,
    path("bank/HO/fetchGroup/<int:id>",getGroupTable.as_view()), # passes bank id from table
    path("bank/HO/fetchcategory/<int:id>",getCatTable.as_view()), # passes bank id from table
    path("bank/HO/fetchcurrency/",CurrencyFetch.as_view()),
    path("bank/HO/fetchExport/",ExportFetch.as_view()),
    path("bank/HO/addgroup/",HOAddGroup.as_view()),
    path("bank/HO/addcategory/",HOAddCategory.as_view()),
    path("bank/HO/addbank/stateCodes/",StateCodesBank.as_view()),
    path("bank/HO/customer/RegisterDealer/",RegisterDealerType.as_view()),
    path("bank/HO/addbank/acctype/",Accountype.as_view()),
    path("bank/HO/AddCustomer/",CustomerView.as_view()),
    path("bank/HO/AddCustomerLimit/",CustomerLimitView.as_view()),
    path("bank/HO/getCustcnt/<int:id>",CustCntview.as_view()),# passes userid
    path("bank/HO/fetchCusttable/<int:id>",getCustTable.as_view()), # passes bank id from table
    path("admin/fetchMsgTable",GetMsgTable.as_view()), # passes bank id from table
    path("admin/sendmessage",MessageService.as_view()), # passes bank id from table    
    path("admin/sendmessageW",WhatsappMessageService.as_view()), # passes bank id from table    
    path("admin/sendmessageE",EmailMessageService.as_view()), # passes bank id from table    
    path("HO/fetchtemplates",GetTemplatesList.as_view()), # passes bank id from table 
    path("bank/selectbank/<int:id>",BankSelect.as_view()),
    path("getseries/<int:id>",BillSeriesDetails.as_view()),
    path("getseriescount/<int:id>",BillSeriesCount.as_view()),
    path('', include(router.urls))
    # path("getImg/path/<int:id>",getImagePath,name="MediaImage"),

    
    # path("admin/sendmessageMOS",MessageService.as_view()), # passes bank id from table    
    
]
# paths to masters of all services \: 
# - Add,Edit and fetch foir count and table formations.
# Add just simply puts them trough just need to have the pass as per id becuase as the masters add data they will be fetched all in one thus I need to pass it as per Specific user id .
# Edit needs to take data and  show it as per the Edit view and update.
# Fetch is simply to get data about data that is being stored in database. i.e. The third tier.
# ___ completeing my work as the masters protocol for both the Brnahc and customers level and thus will do my wokr.