Created a Custom user model and connected to database 
Connected the database to frontend using API and serializers.

There is a registeration serialzier which creates a new user as per hierarchy and Then adds the messageing data to the user.
API for User creation is there, We build the SMS creation api:

Create a serializer for msg entry creation 
entry are as follows:
user_id goes through req, 
reason goes through req
cin_number 
sms_credit goes through req
sms_debit goes through req
system_credit goes through req 
system_debit goes through req 
whatsapp_credit goes through req 
whatsapp_debit goes through req 
shortname goes through req
pan_card goes through req
is_regdealer ?
stateCode goes through req
gstNum goes through req
reg_dealer_type goes through req
pin_code goes through req
status_type goes through req
kyc goes through req
landlineNUM goes through req
actual_billQty goes through req
edit_status goes through req
last_updated auto

billing user gets updated need to make constranit to not allow any new creation for same if and need to create Update user field.


API:
Get User billing info: http://127.0.0.1:8000/api/user/register/bill_info/getd/id
Get USers by all ids depending on hierarchy level:class GetUserViewSet(generics.ListAPIView):

To be made:

-For debit and credit of all msg types depening on confoirmation needs an update in serializers.
-Count of head office and all other offices.