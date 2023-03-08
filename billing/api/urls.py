from django.urls import path, include
from .views import home

urlpatterns = [
     path('',home, name='api.home'),
    path('user/', include('api.user.urls')),
]