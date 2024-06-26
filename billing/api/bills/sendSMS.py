from twilio.rest import Client
from django.conf import settings
from django.core.mail import send_mail
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

def send_Whatsapp(msg_body):
    if msg_body["dist"]: 
        for ids in msg_body["dist"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_='whatsapp:{numb}'.format(numb=settings.WHATSAPP_NUMBER),body="Dear Distributor \n" + msg_body["message"],to='whatsapp:+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["sales"]:
        for ids in msg_body["sales"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_='whatsapp:{numb}'.format(numb=settings.WHATSAPP_NUMBER),body="Dear Sales \n" + msg_body["message"],to='whatsapp:+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["HO"]: 
        for ids in msg_body["HO"].split(","):
            ob = Bill_manage_info.objects.get(user_id=int(ids))
            message = client.messages.create(from_='whatsapp:{numb}'.format(numb=settings.WHATSAPP_NUMBER),body= "Dear Head Office \n" + msg_body["message"],to='whatsapp:+91{num}'.format(num=ob.landlineNUM))
    
    if msg_body["Br"]: 
        for ids in msg_body["Br"].split(","):
            ob = Bill_manage_info.objects.get(pk=int(ids))
            message = client.messages.create(from_='whatsapp:{numb}'.format(numb=settings.WHATSAPP_NUMBER),body="Dear Branch \n" + msg_body["message"],to='whatsapp:+91{num}'.format(num=ob.landlineNUM))

def send_Email(msg_body):
    #sub = msg_body[""]
    #message
    from_mail = settings.EMAIL_HOST_USER
    send_mail(msg_body["ShortId"],msg_body["message"],from_mail,["shivamsharmau60@gmail.com"])# sends the email
    print("Mail",msg_body)

    pass