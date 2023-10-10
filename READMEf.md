Tasks:
1. Connect to django backend &#x2713;
2. Download necessary packages.&#x2713;
3. Build Functional components. &#x2713;&#x2713;
<br>
To do:
1. Create Logout which clears local storage session token and also sends an end session to the end user&#x2713;&#x2713;&#x2713;
2. Create a user view for seeing all user created by him, may need to create a serializer for seeing the data that way &#x2713;&#x2713;
3. For wach specific user see methods to build the lower level user on both front end and backend part.&#x2713;

LOGIN and LOGOUT needs to be more dynamically configured,,&#x2713;

Need more functional approach towards building the application components.
also setup a static and media folder in backend.
--------- Things to keep attention on -------------<br>
1. In user registeration take an important look on hirarachy of the values and api calls being made to look out for wrong happening as user gets deleted if billing info is not configured properly so use it wisely.&#x2713;
2. To gte the count of sales, hoffice and beamnch for a particular use make either a single api with params and carefully pass the parameters to function to see sepecfifc user changes.&#x2713;&#x2713;
3. Simply utlise the made components to do things for levels of Sales, Hoffice and branch. &#x2713;
<br>
----------------------------------------to be done--------------------------<br>
- <u>Need to add a api call to check for Username (Either call for all usernames in the db or take value to db and check across and send a message accordingly)
 or I can use handle chnge like function from - login.js</u> <b>check date-13/4 pt. 6.</b>

 - Use handle change fucntion to compare system credit and pass on value in user registeration form.    &#x2713;
 - Make a choice from states coming through api and mapped in the opion field. These come from Owner level.
 - If error returns in register this saves from User prevent default from hatao all content and we use the useeffect to see any changes at all which make validated false at time when changes happen after a registerion request all though we will add a link to naviogate ot to sales page. &#x2713;

----------------<br>
<u>To do:8/04/23</u>

1. Build Update,put and <i><u>delete</i></u> api for changing data.&#x2713;&#x2713;&#x2713;

2. Make hooks for table to send edit or active status. <b>13/04 PT 7</b>


3. Seek the sms and mail functionality to be used to tie up in frontend and backend along with system messageing Table.
<br>
 Able to add HO ,BR,SA,and Dist. though forms.&#x2713;



 <u>TO DO:
 13/04/23</u>
 1. Make a base model for making HO and BR masters as their default template is same.
 2. Create another app for handling all banks and HO and BR functionalities as it could be harnessed easily.
 3. implement this functionality in the image for Owner.<img src="../Picture1.png" height=180 width=290>.
 4. Add the updation functionality for Changing data of users and to update the database. (Need to handle permissions and put constraints.)&#x2713;
 5. Add sales,dist and HO for each user in tables by creating an extra query in Serializer. &#x2713;
 6. Put a username, and email instant check in forms.
 7. Make hooks for table to send edit or active status. Need!


Change The credit debit logi in backend to see count the numbers and allow access

Also give add capability and make logic according ot the is _active status.


Making :
- The Send Message service all over the system.
- The final reciept model needs to be accomplished and finalised. 
- The Models need to be configured and masters to be specialised. 