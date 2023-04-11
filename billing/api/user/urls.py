from django.urls import path, include
from rest_framework import routers
from . import views
from .views import GetMsgInfo, GetUserViewSet,GetBydistributorview, RegistrationView,MSGInfoView,GetSalesTable,GetBySalesview,GetHOTable
router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("register",RegistrationView.as_view(),name="register"),# register user needs more contraints to make usable
    path("register/bill_info/<int:id>",MSGInfoView.as_view(),name="bill_info"), # sends billing info data
    path("register/bill_info/getd/<int:id>",GetMsgInfo.as_view(),name="bill_info_get"),#gets billing info data
    path("register/user/Getbydist/<int:id>/<int:role>",GetBydistributorview.as_view(),name="Numofuser"),
    path("register/user/Getbysales/<int:id>/<int:role>",GetBySalesview.as_view(),name="Numofuser"),
    path("login/", views.signin, name="signin"),
    path("register/salesdata/<int:id>/<int:distid>",GetSalesTable.as_view()),
    path("register/hodata/<int:id>/<int:distid>",GetHOTable.as_view()),
    path("logout/<int:id>/", views.signout, name="signout"),
    path("getbyrole/",GetUserViewSet.as_view()), #gets user by role
    path('',include(router.urls))
    # path("", views.home, name="user.home"),
]
