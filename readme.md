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
- Get User billing info: http://127.0.0.1:8000/api/user/register/bill_info/getd/id
- Get USers by all ids depending on hierarchy level:class --GetUserViewSet(generics.ListAPIView):
- Get user signed in sign out and
- Get users as per role.
To be made:

- For debit and credit of all msg types depening on confoirmation needs an update in serializers.
- Count of head office and all other offices.
- API call and table for State codes to be used in user registeraion and stored in table.



Changed the Landline num max value as I am passing a 10 sie value from Front. Now works


error in :
search table malfunctioning

<br>
____________________________________________________________________________________________________<br>
Each new Branch Customer or 
After Head Office the Branch is actually Customer Master? No The Master in HO makes the Branch with extra details.

Bank in head office is related to table Bill_banks
<br>
Place - Bill_place*(to be made)
Sales - Bill_sale*
Customer - bill_Customer**
Recept - Bill_recept
Payement - Bill_payement  


To be added from the backend <br> 
Banks   &#x2713; <br>
account type and &#x2713; <br>
State Codes &#x2713; <br>

----------------------------------------------
To Be added in Bak end 17/6/23
1. Add All entries for making counts and functionaloty on HO level in a closed container
2. All the higher levels functionality are to be covered into a authcontainer so that no unauthorised or in volutry url access can happen. <br>

<kbd>
DB1: billing old database
DB2: Billing New Database- (17/06/23)
</kbd>

----------------------------------------<br>
- Add cash to database aneed to add all the variants of other masters by tomorrow. 
Change the error and success message, and put it up to every master<br>
- Create forms and serialzers for masters and see the GST number issue too.

