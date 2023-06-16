from django.urls import path, include
from rest_framework import routers
from .views import getBankTable

router = routers.DefaultRouter()

urlpatterns = [
    path("getBank/HO/<int:id>",getBankTable.as_view(),name="Banks")
]