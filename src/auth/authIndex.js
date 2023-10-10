import { API } from "../backend";
import { useState } from "react";

export const GetRole = (roleID) => {
  const role = {
    owner: false,
    distributor: false,
    sales: false,
    headOffice: false,
    Branch: false,
    Cust: false,
  };
  if (roleID == "2") {
    return { ...role, owner: true };
  } else if (roleID == "3") {
    return { ...role, distributor: true };
  } else if (roleID == "4") {
    return { ...role, sales: true };
  } else if (roleID == "5") {
    return { ...role, headOffice: true };
  } else if (roleID == "6") {
    return { ...role, Branch: true };
  } else if (roleID == "7") {
    return { ...role, Cust: true };
  }
};
export const SignIn = async (user) => {
  const formData = new FormData();
  for (const name in user) {
    console.log(name,user[name])
    formData.append(name, user[name]);
  }
  try {
    const resp = await fetch(`${API}user/login/`, {
      method: "POST",
      body: formData,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await resp.json();
    let m = await fetch(`${API}user/register/bill_info/getd/${data_1.user.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data_2) => {
        return data_2;
      })
      .catch((err) => {
        console.log(err);
      });
    return await [data_1, m];
  } catch (err_1) {
    console.log(err_1);
  }
}; // Returns a token to sign in the user and calls for user info and bill info, which is later used to do multiple tasks,like:
// Add sales, show Number in credits and debits.

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("Data", JSON.stringify(data[0]));
    localStorage.setItem("BillingData", JSON.stringify(data[1][0]));

    next();
  }
}; // returns current user details from user table

export const GetBillingInfo = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("BillingData")) {
    return JSON.parse(localStorage.getItem("BillingData"));
  } else {
    return false;
  }
}; // returns billing info for a signed in user from bill info table.

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("Data")) {
    return JSON.parse(localStorage.getItem("Data"));
  } else {
    return false;
  }
};
export const isAuthenticatedBilling = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("BillingData")) {
    return JSON.parse(localStorage.getItem("BillingData"));
  } else {
    return false;
  }
};

export default function SignOut(next) {
  const UserID = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("Data");
    localStorage.removeItem("BillingData")
    console.log("LOGOUT USER successful");

    return fetch(`${API}user/logout/${UserID}`, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function RegisterUser(...user) {
  const formDataUser = new FormData();
  const formDataBilling = new FormData();
  // User registeration data as form body
//When registeration is done by owner
if (user[0].role_id===3){
  // formDataUser.append("dist_ID_data", user[0].dist_ID_data);
  formDataUser.append("creator_id", user[0].creator_id);//current user id 
}
//When registeration is done by distribtuor
if (user[0].role_id===4){
  // formDataUser.append("dist_ID_data", user[0].dist_ID_data);
  formDataUser.append("owner_id_data",user[0].owner_id_data); // id of owner
  formDataUser.append("creator_id", user[0].creator_id);//current user id 
}
  //When registeration is done by Sales
  if (user[0].role_id===5){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);
    formDataUser.append("owner_id_data",user[0].owner_id_data);
    formDataUser.append("creator_id", user[0].creator_id);//current user id 
  }
  //When registering is done by Head Office
  if (user[0].role_id===6){
    formDataUser.append("dist_ID_data", user[0].dist_ID_data);//dist id for branch
    formDataUser.append("sales_ID_data",user[0].sales_ID_data);// sales id for branch 
    formDataUser.append("owner_id_data",user[0].owner_id_data);
    formDataUser.append("creator_id", user[0].creator_id);//current user id 
  }


  formDataUser.append("email", user[0].email);
  formDataUser.append("password", user[0].password);
  formDataUser.append("password2", user[0].password2);
  formDataUser.append("user_name", user[0].username);
  formDataUser.append("first_name", user[0].first_name);
  formDataUser.append("role_id", user[0].role_id);
  formDataUser.append("role_id_of_creator", user[0].role_id_of_creator);
  //Billing INfo data as body
  formDataBilling.append("system_credit",user[0].system_credit );
  formDataBilling.append("sms_credit",user[0].sms_credit );
  formDataBilling.append("whatsapp_credit",user[0].whatsapp_credit );
  formDataBilling.append("landlineNUM",user[0].phone);
  formDataBilling.append( "stateCode",user[0].state);
  formDataBilling.append("gstNum",user[0].GSTno);
  formDataBilling.append("pan_card",user[0].pancardNo );
  formDataBilling.append("kyc",user[0].KYC_no );
  // formDataBilling.append("address",); // There is no entry for address ask if he wants?
  formDataBilling.append("reason",user[0].reason );
  formDataBilling.append("actual_billQty","true");
  formDataBilling.append("edit_status","true");
  formDataBilling.append("reg_dealer_type","1");
  formDataBilling.append("pin_code","110085");
  formDataBilling.append("status_type","1");
  formDataBilling.append("cin_number","12");
  formDataBilling.append("shortname","Hey");
  formDataBilling.append("is_regdealer","true");
  

  try {
    const resp = await fetch(`${API}user/register`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    formDataBilling.append("user_id", data);
    let m = await fetch(`${API}user/register/bill_info/${data}`, {
      method: "POST",
      body: formDataBilling,
      headers: {
        Authorization: null
      },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
      });
    return await [data, true];
  } catch (err_1) {
    console.log(err_1);
  }
}
export async function UpdateMadeUserRq(user){
  const formDataUser = new FormData();
  const formDataBill = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  formDataUser.append("user_name",user.user_name)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("email",user.email)
  formDataUser.append("role_id",user.role_id)

  formDataBill.append("user_id",user.id)
  formDataBill.append("landlineNUM",user.bill_manage_info__landlineNUM)
  formDataBill.append("system_credit",user.bill_manage_info__system_credit );
  formDataBill.append("system_debit",user.bill_manage_info__system_debit);
  formDataBill.append("sms_credit",user.bill_manage_info__sms_credit );
  formDataBill.append("sms_debit",user.bill_manage_info__sms_debit );
  formDataBill.append("whatsapp_credit",user.bill_manage_info__whatsapp_credit );
  formDataBill.append("whatsapp_debit",user.bill_manage_info__whatsapp_debit );
  formDataBill.append("stateCode",user.bill_manage_info__stateCode);
  formDataBill.append("gstNum",user.bill_manage_info__gstNum);
  formDataBill.append("pan_card",user.bill_manage_info__pan_card);
  formDataBill.append("kyc",user.bill_manage_info__kyc);
  formDataBill.append("reason",user.bill_manage_info__reason );
  formDataBill.append("actual_billQty",user.bill_manage_info__actual_billQty); // pass values as they won't have any effect on backend just need to be there reomve or append as per convinece and code.
  formDataBill.append("edit_status",user.bill_manage_info__edit_status);
  formDataBill.append("reg_dealer_type",user.bill_manage_info__reg_dealer_type);
  formDataBill.append("pin_code",user.bill_manage_info__pin_code);
  formDataBill.append("status_type",user.bill_manage_info__status_type);
  formDataBill.append("cin_number",user.bill_manage_info__cin_number);
  formDataBill.append("shortname",user.bill_manage_info__shortname);
  formDataBill.append("is_regdealer",user.bill_manage_info__is_regdealer);


  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    let m = await fetch(`${API}user/update/Bill/${user.id}`, {
      method: "PUT",
      body: formDataBill,
      headers: { Authorization: null },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }catch (err_1) {
    console.log(err_1);
  }

}
export async function UpdateRY(user){
  const formDataUser = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  // formDataUser.append("user_name",user.user_name)
  formDataUser.append("email",user.email)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("renew_year",user.renew_year)
  console.log(user)
  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    return resp.json();
  }catch (err_1) {
    console.log(err_1);
  }

}
export async function UpdateUser(user,bill){


  const formDataUser = new FormData();
  const formDataBill = new FormData();

  formDataUser.append("password",user.password)
  formDataUser.append("first_name",user.first_name)
  formDataUser.append("user_name",user.user_name)
  formDataUser.append("role_id",user.role_id)
  formDataUser.append("email",user.email)

  formDataBill.append("landlineNUM",bill.landlineNUM)
  formDataBill.append("system_credit",bill.system_credit );
  formDataBill.append("sms_credit",bill.sms_credit );
  formDataBill.append("whatsapp_credit",bill.whatsapp_credit );
  if(user.role_id === 5 || user.role_id === "5" ){
    formDataBill.append("stateCode",bill.stateCode_id);
  }else{
    formDataBill.append("stateCode",bill.stateCode);
  }
  formDataBill.append("gstNum",bill.gstNum);
  formDataBill.append("pan_card",bill.pan_card);
  formDataBill.append("kyc",bill.kyc);
  formDataBill.append("reason",bill.reason );
  formDataBill.append("actual_billQty",bill.actual_billQty); // pass values as they won't have any effect on backend just need to be there reomve or append as per convinece and code.
  formDataBill.append("edit_status",bill.edit_status);
  formDataBill.append("reg_dealer_type",bill.reg_dealer_type);
  formDataBill.append("pin_code",bill.pin_code);
  formDataBill.append("status_type",bill.status_type);
  formDataBill.append("cin_number",bill.cin_number);
  formDataBill.append("shortname",bill.shortname);
  formDataBill.append("is_regdealer",bill.is_regdealer);
  console.log(...formDataBill.values(),bill["stateCode_id"],user.role_id)


  try {
    const resp = await fetch(`${API}user/update/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    formDataBill.append("user_id", data);
    let m = await fetch(`${API}user/update/Bill/${data}`, {
      method: "PUT",
      body: formDataBill,
      headers: { Authorization: null },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  } catch (err_1) {
    console.log(err_1);
  }
}
export async function TransferSalesreq(user){

  const formDataUser = new FormData();
  
  formDataUser.append("distID",user.dist_id) //passing the new dist id
  formDataUser.append("email",user.email) //passing the new dist id
  formDataUser.append("role_id",user.role_id) //passing the new dist id



  try {
    const resp = await fetch(`${API}user/update/${user.id}`, { // pass the sales id
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    return true;
  } catch (err_1) {
    console.log(err_1);
  }
}

export async function TransferHOreq(user){

  const formDataUser = new FormData();
  
  formDataUser.append("salesid",user.salesid) //passing the new dist id
  formDataUser.append("email",user.email) //passing the new dist id
  formDataUser.append("role_id",user.role_id) //passing the new dist id



  try {
    const resp = await fetch(`${API}user/update/${user.id}`, { // pass the sales id
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    return true;
  } catch (err_1) {
    console.log(err_1);
  }
}
export function JdateGet(JD){
  return JSON.stringify(JD).slice(1,11).split("-",3).reverse().join("-") //perfect date format
}
export function getExpiry(dt, rnyr) {
  const Jdate = new Date(
    JSON.stringify(dt).slice(0, 11).split("-", 3).join("-")
  );
  const Edate = new Date(
    Jdate.getFullYear() + rnyr,
    Jdate.getMonth(),
    Jdate.getDate()
  );

  return JSON.stringify(Edate.toLocaleDateString("en-IN")).slice(1,10).split("/",3).join("-");
}
export function expBR(dt,rnyr){
  const Jdate = new Date(
    JSON.stringify(dt).slice(0, 11).split("-", 3).join("-")
  );
  const Edate = new Date(
    Jdate.getFullYear() + rnyr,
    Jdate.getMonth(),
    Jdate.getDate()
  );
  return JSON.stringify(Edate.toLocaleDateString("en-IN")).slice(1,9).split("/",3).join("-");

}

export async function AddBankHO(user){
  const formDataUser = new FormData();
  formDataUser.append("user_id",user.user_id)
  formDataUser.append("bank_name",user.bank_name)
  formDataUser.append("account_num",user.account_num)
  formDataUser.append("ifsc_code",user.ifsc_code)
  formDataUser.append("Branch",user.Branch)
  formDataUser.append("StateCode",user.StateCode)
  formDataUser.append("gstNumber",user.gstNumber)
  formDataUser.append("account_type",user.account_type)
  formDataUser.append("open_balance",user.open_balance)
  formDataUser.append("Primary_type",user.Primary_type)

  try {
    const response = await fetch(`${API}bill/bank/HO/addbank/${user.user_id}`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}

export async function EditBankHO(user){
  const formDataUser = new FormData();
  formDataUser.append("user_id",user.user_id_id)
  formDataUser.append("bank_name",user.bank_name)
  formDataUser.append("account_num",user.account_num)
  formDataUser.append("ifsc_code",user.ifsc_code)
  formDataUser.append("Branch",user.Branch)
  formDataUser.append("StateCode",user.StateCode_id)
  formDataUser.append("gstNumber",user.gstNumber)
  formDataUser.append("account_type",user.account_type_id)
  formDataUser.append("open_balance",user.open_balance)

  try {
    const response = await fetch(`${API}bill/bank/HO/editbank/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}

export async function AddCashHO(user){
  const formDataUser = new FormData();
  formDataUser.append("user_id",user.user_id)
  formDataUser.append("cash_name",user.cash_name)
  formDataUser.append("cash_balance",user.cash_balance)

  try {
    const response = await fetch(`${API}bill/bank/HO/addcash/${user.user_id}`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}

export async function EditCashHO(user){
  const formDataUser = new FormData();
  console.log(user)
  formDataUser.append("user_id",user.user_id_id)
  formDataUser.append("cash_name",user.cash_name)
  formDataUser.append("cash_balance",user.cash_balance)

  try {
    const response = await fetch(`${API}bill/bank/HO/editcash/${user.id}`, {
      method: "PUT",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}

export async function addPlace(user){
  const formDataUser = new FormData();
  formDataUser.append("master_id",user.master_id)
  formDataUser.append("place_name",user.place_name)

  try {
    const response = await fetch(`${API}bill/bank/HO/addplace/`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}
export async function addGroup(user){
  const formDataUser = new FormData();
  formDataUser.append("master_id",user.master_id)
  formDataUser.append("cust_grp",user.cust_grp)

  try {
    const response = await fetch(`${API}bill/bank/HO/addgroup/`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}
export async function addCategory(user){
  const formDataUser = new FormData();
  formDataUser.append("master_id",user.master_id)
  formDataUser.append("cat_name",user.cat_name)

  try {
    const response = await fetch(`${API}bill/bank/HO/addcategory/`, {
      method: "POST",
      body: formDataUser,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data_1 = await response.json();
    return data_1;
  } catch (err) {
    console.log(err);
  }
}

export async function CustomerAdd(user,limitvalue){
  const formDataCust = new FormData();
  const FormdataLimit = new FormData();
  if (limitvalue.is_limit ==="true"){

    FormdataLimit.append("amount",limitvalue.amount);
    FormdataLimit.append("is_limit_cond",true);

  }
  else{
    FormdataLimit.append("amount",0);
    FormdataLimit.append("is_limit_cond",false);

  }
  FormdataLimit.append("cust_openingBalance",limitvalue.cust_openingBalance);
  FormdataLimit.append("user_id",limitvalue.user_id);
  FormdataLimit.append("sales_type",limitvalue.sales_type);
  FormdataLimit.append("rcm",limitvalue.rcm);
  
formDataCust.append("master_id",user.master_id)
formDataCust.append("cust_name",user.cust_name)
formDataCust.append("cust_code",user.cust_code)
formDataCust.append("Image",user.Image) // Need to pass an image in either of the case.
formDataCust.append("cust_state_id",user.cust_state_id)
formDataCust.append("cust_pincode",user.cust_pincode)
formDataCust.append("cust_pan",user.cust_pan)
formDataCust.append("cust_place",user.cust_place)
formDataCust.append("cust_group",user.cust_group)
formDataCust.append("cust_mobile",user.cust_mobile)
formDataCust.append("cust_landline",user.cust_landline)
formDataCust.append("cust_email",user.cust_email)
formDataCust.append("address",user.address)
formDataCust.append("cust_is_reg",user.cust_is_reg)
formDataCust.append("cust_dealer_type",user.cust_dealer_type)
formDataCust.append("cust_gst",user.cust_gst)
formDataCust.append("cust_currency",user.cust_currency)
formDataCust.append("export_option",user.export_option)
formDataCust.append("export_type",user.export_type)
formDataCust.append("modified_by",user.modified_by)
formDataCust.append("status",user.status)
  
  console.log(user,limitvalue)

  try {
    const resp = await fetch(`${API}bill/bank/HO/AddCustomer/`, {
      method: "POST",
      body: formDataCust,
      headers: { Authorization: null },
      withCredentials: true,
    });
    const data = await resp.json();
    FormdataLimit.append("cust_id", data);
    let m = await fetch(`${API}bill/bank/HO/AddCustomerLimit/`, {
      method: "POST",
      body: FormdataLimit,
      headers: {
        Authorization: null
      },
      withCredentials: true,
    })
      .then((response) => {
        return response.json();
      })
      .then((data_1) => {
        return data_1;
      })
      .catch((err) => {
        console.log(err);
      });
    return await [data, true];
  } catch (err_1) {
    console.log(err_1);
  }
}

export async function AddMessageRequest(msg,id,typeMsg){
  const FormMsg = new FormData();
  FormMsg.append("message",msg.msg);
  FormMsg.append("ShortId",msg.UIden);
  var D = []
  var S = []
  var H = []
  var B = []
  if (msg.dist){
    msg.dist.forEach((val)=>{D.push(val.value)})
    FormMsg.append("dist",D);
}
  if (msg.sales){
    msg.sales.forEach((val)=>{S.push(val.value)})
    FormMsg.append("sales",S);}
  if (msg.HO){
    msg.HO.forEach((val)=>{H.push(val.value)})
    FormMsg.append("HO",H);}
  if (msg.Br){
    msg.Br.forEach((val)=>{B.push(val.value)})
    FormMsg.append("Br",B);}
  
  if (typeMsg === "SMS"){
    try {
      const response = await fetch(`${API}bill/admin/sendmessage`, {
        method: "POST",
        body: FormMsg,
        headers: { Authorization: null },
        withCredentials: true,
      });
      const data_1 = await response.json();
      return data_1;
    } catch (err) {
      console.log(err);
    }
  }
  else if (typeMsg === "WHATSAPP"){
    try {
      const response = await fetch(`${API}bill/admin/sendmessageW`, {
        method: "POST",
        body: FormMsg,
        headers: { Authorization: null },
        withCredentials: true,
      });
      const data_1 = await response.json();
      return data_1;
    } catch (err) {
      console.log(err);
    }
  }
  else if (typeMsg === "EMAIL"){
    try {
      const response = await fetch(`${API}bill/admin/sendmessageE`, {
        method: "POST",
        body: FormMsg,
        headers: { Authorization: null },
        withCredentials: true,
      });
      const data_1 = await response.json();
      return data_1;
    } catch (err) {
      console.log(err);
    }
  }
  else if (typeMsg === "MOS"){
    try {
      const response = await fetch(`${API}bill/admin/sendmessageMOS`, {
        method: "POST",
        body: FormMsg,
        headers: { Authorization: null },
        withCredentials: true,
      });
      const data_1 = await response.json();
      return data_1;
    } catch (err) {
      console.log(err);
    }
  }
 


}
export async function AddInvoice_Series (data,series){
  const FormdataInvoice = new FormData();
  const FormdataSeries = new FormData();
  FormdataInvoice.append("user_id",data.user_id);
  FormdataInvoice.append("is_logo_img",data.is_logo_img)
  FormdataInvoice.append("logo",data.Image)
  FormdataInvoice.append("logo_text",data.logo_text)
  FormdataInvoice.append("invoice_design_temp",data.invoice_design_temp)
  FormdataInvoice.append("currency",data.currency)
  FormdataInvoice.append("term_condition",data.term_condition)
  FormdataInvoice.append("additional_option_type",data.additional_option_type)
  FormdataInvoice.append("option_values","data.option_values")
  FormdataInvoice.append("ecommerce_trader",data.ecommerce_trader)
  FormdataInvoice.append("reverse_charge",data.reverse_charge)
  FormdataInvoice.append("to_bill_ship_applicabletrue",data.to_bill_ship_applicabletrue)
  FormdataInvoice.append("gst_shipping_address",data.gst_shipping_address)
  FormdataInvoice.append("from_date",data.from_date)
  FormdataInvoice.append("till_date",data.till_date)
  FormdataInvoice.append("bank_def",data.bank_def)


  FormdataSeries.append("user_id",series.user_id);
  FormdataSeries.append("invoice_id",series.invoice_id);
  FormdataSeries.append("series_num",series.series_num);
  FormdataSeries.append("name",series.name);
  FormdataSeries.append("prefix_surfix_type",series.prefix_surfix_type);
  FormdataSeries.append("sl_num",series.sl_num);
  FormdataSeries.append("prefix_surfix",series.prefix_surfix);
  FormdataSeries.append("primary_type",series.primary_type);
  FormdataSeries.append("genrate_invoice",series.genrate_invoice);
   console.log(...FormdataInvoice.values())

   console.log(...FormdataSeries.values())
}