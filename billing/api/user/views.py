from django.contrib.auth.backends import RemoteUserBackend, UserModel
from django.contrib.auth.models import Permission, User
from rest_framework import serializers, viewsets
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework.utils.serializer_helpers import JSONBoundField
from .serializers import UserSerializer  # converted file
from .models import NewUSER  # the default model
from django.http import JsonResponse, request
from django.contrib.auth import get_user_model  # User CHECK BOTTOM
from rest_framework import status
from django.views.decorators.csrf import (
    csrf_exempt,
)  # for saving from cross site request forgery CHECK BOTTOMimport random
import re
from django.contrib.auth import (
    login,
    logout,
)  # basic login and out functionality  by django
import random
from rest_framework.views import APIView
from rest_framework.response import  Response
from .serializers import RegistrationSerializer
# Create your views here.
def home(request):
    return JsonResponse({"info": "Django RC", "name": "API-insider-user"})


def generate_session_token(length=10):
    return "".join(
        random.SystemRandom().choice(
            [chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]
        )
        for _ in range(10)
    )  # Creates a 10 length string for our session token !!!!!!


@csrf_exempt  # this code gets exempted from other origin request
def signin(request):
    if not request.method == "POST":
        return JsonResponse({"error": "Send request valid params"})

    username = request.POST["email"]  # extracted the Email and pass from post method
    password = request.POST["password"]

    # VALIDATION OF GIVEN DETAILS
    if not re.match(
        "^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username
    ):  # blank uses a patter from regexer
        return JsonResponse({"error": "Enter a valid email"})

    if len(password) < 3:
        return JsonResponse({"error": "Password needs to be atleast 10 digits"})
        # can be multiple constraints.

    UserModel = get_user_model()  # we get a user from db and match it in login view

    try:
        user = UserModel.object.get(email=username)
        if user.check_password(password):
            usr_dict = UserModel.object.filter(email=username).values().first()
            usr_dict.pop("password")

            # check user sess_token....
            if user.sess_token != "0":
                user.sess_token = "0"
                user.save()
                return JsonResponse({"error": "previous expr exists"})

            token = generate_session_token()  # intialised above
            user.sess_token = token  # saved in user  table , thus we now saved
            # the Session token by creating a user on already made fucntionality by django
            user.save()
            login(request, user)
            return JsonResponse({"token": token, "user": usr_dict})
        else:
            return JsonResponse({"error": "Invalid password"})

    except UserModel.DoesNotExist:
        return JsonResponse(
            {"error": "Invalid Email"}
        )  # User Model is based on email nam


# we previously saved session token in db in record of user
def signout(request, id):
    logout(request)

    UserModel = get_user_model()
    try:
        user = UserModel.object.get(pk=id)
        user.sess_token = "0"  # set user sess_token to 0
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({"error": "Invalid user id"})

    return JsonResponse({"success": "Logout Successful"})

class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {"create": [AllowAny]}
    queryset = NewUSER.object.all().order_by("user_name")
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]  # only given create permission
        except KeyError:
            return [
                permission() for permission in self.permission_classes
            ]  # default permissions

        return super().get_permissions()


# permission is default method docs
