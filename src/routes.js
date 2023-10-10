import React from "react";
import {BrowserRouter, Switch,Route, Routes} from 'react-router-dom';
import PrivateRoutes from "./auth/privateRoute";
import App from "./App";
import Register from "./UserView/registerUser";
import UserDashboard from "./UserView/Userdashboard";
import LOGIN from "./UserView/login";
import Notfound from "./Components/notfound";
import { SalesForm } from "./Components/addComponents/addsales";
import {HooficeForm} from "./Components/addComponents/addHoffice"
import { BranchForm } from "./Components/addComponents/addBranch";
import { DistributorForm } from "./Components/addComponents/addDistributor";
import { UpdateMadeUser } from "./Components/updateusermade";
import {MasterRoute } from "./MasterComponents/bank";
import { Transport } from "./MasterComponents/transport";
import { Stock } from "./MasterComponents/stock";
import { Adjustment } from "./MasterComponents/adjustment";
import { SaleR } from "./MasterComponents/sale";
import { Receipt } from "./MasterComponents/receipt";
import { Purchase } from "./MasterComponents/purchase";
import { Production } from "./MasterComponents/production";
import { Place } from "./MasterComponents/place";
import { Payements } from "./MasterComponents/payment";
import { Customer } from "./MasterComponents/customer";
import { Master } from "./MasterComponents/master";
import { CDebit } from "./MasterComponents/CDebit";
import { AddBank } from "./MasterComponents/addComponent/addBank";
import { EditBank } from "./MasterComponents/editComponent/editbank";
import { AddCash } from "./MasterComponents/addComponent/addCash";
import { EditCash } from "./MasterComponents/editComponent/editcash";
import { AddPlace } from "./MasterComponents/addComponent/addplace";
import { Addcustomer } from "./MasterComponents/addComponent/addCustomer";
import AdminMessage from "./Components/adminMsg";
import TransferSales from "./Components/transfersales";
import TransferHO from "./Components/trasnsferHO";
import AddMessage from "./Components/addMessage";
import EditProfile from "./Components/SubComponents/editProfile";

const RoutesD = () =>{
  return(

    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={<LOGIN />}></Route>
    <Route path="/signin" exact element={<LOGIN />} />
    <Route path="*" exact element={<Notfound/>} />
    <Route path="/user/dashboard/*" element={<PrivateRoutes component={UserDashboard}/>}/>
    <Route path="/user/dashboard/adminMessage" element={<PrivateRoutes component={AdminMessage}/>}/>
    <Route path="/user/dashboard/transfersales" element={<PrivateRoutes component={TransferSales}/>}/>
    <Route path="/user/dashboard/transferHO" element={<PrivateRoutes component={TransferHO}/>}/>

    <Route path="/user/dashboard/register/addDistributor/*" exact element={<PrivateRoutes component={DistributorForm}/>} />
    <Route path="/user/dashboard/register/addsales/*" exact element={<PrivateRoutes component={SalesForm}/>} />
    <Route path="/user/dashboard/register/addHoffice/*" exact element={<PrivateRoutes component={HooficeForm}/>} />
    <Route path="/user/dashboard/register/addBranch/*" exact element={<PrivateRoutes component={BranchForm}/>} />
    <Route path="/user/dashboard/edit/user/:id" exact element={<PrivateRoutes component={UpdateMadeUser}/>} />

    <Route path="/user/dashboard/headOffice/bank/*" exact element={<PrivateRoutes component={MasterRoute}/>} />
    <Route path="/user/dashboard/headOffice/addbank/*" exact element={<PrivateRoutes component={AddBank}/>} />
    <Route path="/user/dashboard/headOffice/editbank/:id" exact element={<PrivateRoutes component={EditBank}/>} />
    <Route path="/user/dashboard/headOffice/addcash/*" exact element={<PrivateRoutes component={AddCash}/>} />
    <Route path="/user/dashboard/headOffice/editcash/:id" exact element={<PrivateRoutes component={EditCash}/>} />

    <Route path="/user/dashboard/headOffice/place/*" exact element={<PrivateRoutes component={Place}/>} />
    <Route path="/user/dashboard/headOffice/addplace/*" exact element={<PrivateRoutes component={AddPlace}/>} />

    <Route path="/user/dashboard/headOffice/customer/*" exact element={<PrivateRoutes component={Customer}/>} />
    <Route path="/user/dashboard/headOffice/addcustomer/*" exact element={<PrivateRoutes component={Addcustomer}/>} />
    <Route path="/user/dashboard/headOffice/editprofile" exact element={<PrivateRoutes component={EditProfile}/>} />






    <Route path="/user/dashboard/headOffice/payment/*" exact element={<PrivateRoutes component={Payements}/>} />
    <Route path="/user/dashboard/headOffice/master/*" exact element={<PrivateRoutes component={Master}/>} />
    <Route path="/user/dashboard/headOffice/stock/*" exact element={<PrivateRoutes component={Stock}/>} />
    <Route path="/user/dashboard/headOffice/receipt/*" exact element={<PrivateRoutes component={Receipt}/>} />
    <Route path="/user/dashboard/headOffice/sale/*" exact element={<PrivateRoutes component={SaleR}/>} />
    <Route path="/user/dashboard/headOffice/transport/*" exact element={<PrivateRoutes component={Transport}/>} />
    <Route path="/user/dashboard/headOffice/purchase/*" exact element={<PrivateRoutes component={Purchase}/>} />
    <Route path="/user/dashboard/headOffice/production/*" exact element={<PrivateRoutes component={Production}/>} />
    <Route path="/user/dashboard/headOffice/adjustment/*" exact element={<PrivateRoutes component={Adjustment}/>} />
    <Route path="/user/dashboard/headOffice/creddeb/*" exact element={<PrivateRoutes component={CDebit}/>} />

    <Route path="/user/dashboard/messages/add/sms" exact element={<PrivateRoutes component={AddMessage}/>} />
    <Route path="/user/dashboard/messages/add/Whatsapp" exact element={<PrivateRoutes component={AddMessage}/>} />
    <Route path="/user/dashboard/messages/add/Email" exact element={<PrivateRoutes component={AddMessage}/>} />
    <Route path="/user/dashboard/messages/add/MOS" exact element={<PrivateRoutes component={AddMessage}/>} />





    {/* <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/> */}
    {/* <Route path="/signup" exact element={<App />}></Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default RoutesD;