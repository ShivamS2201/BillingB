from twilio.rest import Client
from django.conf import settings
from api.user.models import Bill_manage_info
client = Client(settings.ACCOUNT_SID_SMS, settings.AUTH_TOKEN_SMS)
def send_SMS(msg_body):
    if msg_body["dist"]: 
        for ids in msg_body["dist"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_=settings.SMS_NUMBER,body="Dear Distributor \n" + msg_body["message"],to='+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["sales"]:
        for ids in msg_body["sales"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_=settings.SMS_NUMBER,body="Dear Sales \n" + msg_body["message"],to='+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["HO"]: 
        for ids in msg_body["HO"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_=settings.SMS_NUMBER,body= "Dear Head Office \n" + msg_body["message"],to='+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["Br"]: 
        for ids in msg_body["Br"].split(","):
            ob = Bill_manage_info.objects.get(pk=int(ids))
            message = client.messages.create(from_=settings.SMS_NUMBER,body="Dear Branch \n" + msg_body["message"],to='+91{num}'.format(num=ob.landlineNUM))
