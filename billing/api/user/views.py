import json
from django.contrib.auth.backends import RemoteUserBackend, UserModel
from django.contrib.auth.models import Permission, User
from rest_framework import serializers, viewsets
from rest_framework import permissions, generics
from rest_framework.permissions import AllowAny
from rest_framework.utils.serializer_helpers import JSONBoundField
from .serializers import UserSerializer, MSGSerializer  # converted file
from .models import NewUSER  # the default model
from django.http import HttpResponse, JsonResponse, request
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
from rest_framework.response import Response
from .serializers import SalesRegistrationSerializer, HofficeRegistrationSerializer,BranchRegisterationSerializer,GetBydistributor,GetSalesByDist,GetBysales,GetHObySales,GetByOwner,GetSalesByOwner,GetHOByOwner,GetBrByOwner,GetDistributorByOwner,DistributorRegisterationSerializer

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
        if int(request.data["role_id_of_creator"]) < int(request.data["role_id"]):
            print( int(request.data["role_id_of_creator"]) , int(request.data["role_id"]))
            if int(request.data["role_id_of_creator"]) == 2 and int(request.data["role_id"]) == 3:
                serializer = DistributorRegisterationSerializer(
                    data=request.data
                )  # change the serializer for dist
                if serializer.is_valid():
                    created_key = serializer.save()
                    return Response(created_key,status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"Role ": "Cannot designate superior role."}
                        ,
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            elif (int(request.data["role_id_of_creator"]) == 3 and int(request.data["role_id"]) == 4):
                serializer = SalesRegistrationSerializer(data=request.data)  # sales ka
                if serializer.is_valid():
                    created_key = serializer.save()
                    return Response(created_key,status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"Role ": "Cannot designate superior role."}
                        ,
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            elif (int(request.data["role_id_of_creator"]) == 4 and int(request.data["role_id"]) == 5):
                serializer = HofficeRegistrationSerializer(data=request.data)  # Hoffice
                if serializer.is_valid():
                    created_key = serializer.save()
                    return Response(created_key,status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"Role ": "Cannot designate superior role."}
                        ,
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            elif (int(request.data["role_id_of_creator"]) == 5 and int(request.data["role_id"]) == 6):
                serializer = BranchRegisterationSerializer(data=request.data)  # Branchka
                if serializer.is_valid():
                    created_key = serializer.save()
                    return Response(created_key,status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"Role ": "Cannot designate superior role."}
                        ,
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            elif (int(request.data["role_id_of_creator"]) == 6 and int(request.data["role_id"]) == 7):
                serializer = SalesRegistrationSerializer(data=request.data)  # CUstomer
                if serializer.is_valid():
                    created_key = serializer.save()
                    return Response(created_key,status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        {"Role ": "Cannot designate superior role."}
                        ,
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            # if something and something serialzier is something and
            # save returns the PK of created user
            else:
                return Response("invalid RoleID and creatorID passed",status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("Not Allowed to make the user",status=status.HTTP_400_BAD_REQUEST)


# Carelfully Use this as it fails user gets deleted
class MSGInfoView(APIView):
    def post(self, request, id):
        user = get_user_model().object.get(pk=id)
        print("RAN")
        serializer = MSGSerializer(data=request.data)
        if serializer.is_valid():
            print("RAN")
            ret = serializer.save(id)
            if ret[1] == True:
                user.delete()  # Caution User will get deleted!!!
                return Response(ret[0], status=status.HTTP_204_NO_CONTENT)
            elif ret[1] == False:
                return Response(ret[0], status=status.HTTP_201_CREATED)
        
        print("Didn't RAN")

#Owner-------------------------------------
class GetDistributorTableByOwner(APIView):
    def get(self,request,id,role):
        serializer = GetDistributorByOwner(data = request.data)
        HOdata = serializer.getTable(id,role)
        return Response(HOdata,status=status.HTTP_200_OK)
class GetHOTablebyOwner(APIView):
    def get(self,request,id,role):
        serializer = GetHOByOwner(data = request.data)
        HOdata = serializer.getTable(id,role)
        return Response(HOdata,status=status.HTTP_200_OK)
class GetSalesTablebyOwner(APIView):
    def get(self,request,id,role):
        serializer = GetSalesByOwner(data = request.data)
        salesdata = serializer.getTable(id,role)
        return Response(salesdata,status=status.HTTP_200_OK)
class GetBrTablebyOwner(APIView):
    def get(self,request,id,role):
        serializer = GetBrByOwner(data = request.data)
        HOdata = serializer.getTable(id,role)
        return Response(HOdata,status=status.HTTP_200_OK)
class GetByOwnerview(APIView):
    def get(self,request,id,role):
        serializer = GetByOwner(data = request.data)
        GetCnt = serializer.get(id,role)
        return Response(GetCnt,status=status.HTTP_200_OK)
#------------------------------------------------------
class GetBydistributorview(APIView):
    def get(self,request,id,role):
        serializer = GetBydistributor(data = request.data)
        GetsalesCnt = serializer.get(id,role)
        return Response(GetsalesCnt,status=status.HTTP_200_OK)
class GetSalesTable(APIView):
    def get(self,request,id,distid):
        serializer = GetSalesByDist(data = request.data)
        TableData = serializer.getTable(id,distid)
        return Response(TableData)
    #_______________________________________________________sales level
class GetHOTable(APIView):
    def get(self,request,id,distid):
        serializer = GetHObySales(data = request.data)
        TableData = serializer.getTable(id,distid)
        return Response(TableData)
class GetBySalesview(APIView):
    def get(self,request,id,role):
        serializer = GetBysales(data = request.data)
        GetHOCnt = serializer.get(id,role)
        return Response(GetHOCnt,status=status.HTTP_200_OK)
# class GetHONum(APIView):
#     def get(self,request,id,role):
#         serializer = GetHONumSerializer(data = request.data)
#         GetsalesCnt = serializer.get(id,role)
#         return Response(GetsalesCnt,status=status.HTTP_200_OK)

class GetMsgInfo(APIView):  # Returns Billing info For a current user
    def get(self, request, id):
        serializer = MSGSerializer(data=request.data)
        Billing_info_data = serializer.get(id)
        return Response(Billing_info_data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {"create": [AllowAny]}
    queryset = NewUSER.object.all().order_by("id")
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


class GetUserViewSet(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        return NewUSER.object.filter(role_id="1")


# permission is default method docs
