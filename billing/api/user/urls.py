from django.urls import path, include
from rest_framework import routers
from . import views
from .views import GetUserViewSet, RegistrationView,MSGInfoView
router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("register",RegistrationView.as_view(),name="register"),
    path("register/bill_info/<int:id>",MSGInfoView.as_view(),name="bill_info"),
    path("login/", views.signin, name="signin"),
    path("logout/<int:id>/", views.signout, name="signout"),
    path("getbyrole/",GetUserViewSet.as_view()),
    path('',include(router.urls))
    # path("", views.home, name="user.home"),
]
