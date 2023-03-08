from django.urls import path, include
from rest_framework import routers
from . import views
from .views import RegistrationView
router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("register",RegistrationView.as_view(),name="register"),
    path("login/", views.signin, name="signin"),
    path("logout/<int:id>/", views.signout, name="signout"),
    path('',include(router.urls))
    # path("", views.home, name="user.home"),
]
