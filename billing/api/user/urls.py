from django.urls import path, include
from rest_framework import routers
from . import views
from .views import (
    GetUserForms,
    GetMsgInfo,
    GetUserViewSet,
    GetBydistributorview,
    RegistrationView,
    MSGInfoView,
    GetBySalesview,
    GetByOwnerview,
    GetSalesTablebyOwner,
    GetBrTablebyOwner,
    GetHOTablebyOwner,
    GetDistributorTableByOwner,
    UpdateViewSet,
    UpdateMsgData,
    GetSalesByDview,
    GetHobyDview,
    GetBrbyDview,
    GetHObysalesview,
    GetBrbysalesview,
    GetBrbyHOview,
    DistDropdown,
    SalesDropdown,
    SalesHOdropdown,
    HODropdown
)

router = routers.DefaultRouter()
router.register(r"", views.UserViewSet)
urlpatterns = [
    path(
        "register", RegistrationView.as_view(), name="register"
    ),  # register user needs more contraints to make usable
    path(
        "register/bill_info/<int:id>", MSGInfoView.as_view(), name="bill_info"
    ),  # sends billing info data
    path(
        "register/bill_info/getd/<int:id>", GetMsgInfo.as_view(), name="bill_info_get"
    ),  # gets billing info data
    path(
        "register/user/Getbydist/<int:id>/<int:role>",
        GetBydistributorview.as_view(),
        name="Numofuserdist",
    ),  # Get all nums from DIST POV
    path(
        "register/user/Getbyowner/<int:id>/<int:role>",
        GetByOwnerview.as_view(),
        name="Numofuserowner",
    ),  # Get all nums from Owner POV
    path(
        "register/user/Getbysales/<int:id>/<int:role>",
        GetBySalesview.as_view(),
        name="Numofusersales",
    ),  # Get all nums from SALES POV
    path("login/", views.signin, name="signin"),
    path(
        "register/ownerdistributordata/<int:id>/<int:role>",
        GetDistributorTableByOwner.as_view(),
    ),
    path(
        "register/distdropdown/<int:id>/<int:role>", DistDropdown.as_view()
    ),  # id is sales id
    path("register/salesdropdown/<int:id>/<int:role>", SalesDropdown.as_view()),
    path("register/salesHOdropdown/<int:id>/<int:role>", SalesHOdropdown.as_view()),
    path("register/HOdropdown/<int:id>/<int:role>", HODropdown.as_view()),
    path("register/ownersalesdata/<int:id>/<int:role>", GetSalesTablebyOwner.as_view()),
    path("register/ownerBrdata/<int:id>/<int:role>", GetBrTablebyOwner.as_view()),
    path("register/ownerHOdata/<int:id>/<int:role>", GetHOTablebyOwner.as_view()),
    path("register/distsalesdata/<int:id>/<int:role>", GetSalesByDview.as_view()),
    path("register/distHOdata/<int:id>/<int:role>", GetHobyDview.as_view()),
    path("register/distBrdata/<int:id>/<int:role>", GetBrbyDview.as_view()),
    path("register/saleshodata/<int:id>/<int:role>", GetHObysalesview.as_view()),
    path("register/salesbrdata/<int:id>/<int:role>", GetBrbysalesview.as_view()),
    path(
        "register/hobrdata/<int:id>/<int:role>",
        GetBrbyHOview.as_view(),
        name="Table of BR for Ho",
    ),
    path("logout/<int:id>/", views.signout, name="signout"),
    path("getbyrole/", GetUserViewSet.as_view()),  # gets user by role
    path("", include(router.urls)),
    path("getbyid/userform/<int:id>", GetUserForms.as_view()),  # gets user by role
    path(
        "update/<int:id>", UpdateViewSet.as_view(), name="update_USER"
    ),  # register user needs more contraints to make usable
    path(
        "update/Bill/<int:id>", UpdateMsgData.as_view(), name="update_BILL"
    ),  # register user needs more contraints to make usable
    # path("", views.home, name="user.home"),
]
