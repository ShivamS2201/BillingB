import React, { useState } from "react";
import SignOut, { isAuthenticated } from '../auth/authIndex';
import Navb from "../Components/navbar";
import './css/userboard.css'
import { GetRole } from "../auth/authIndex";
import Distributor from "../Components/distributor";
import Owner from "../Components/owner";
import Salescomponent from "../Components/sales";
import HeadOfficeComponent from "../Components/headOffice";
import FooterC from "../Components/footer"
import {SignoutNav} from './singoutnav'
const UserDashboard = (props)=>{
    var [Role,setRole] = useState(GetRole(JSON.parse(localStorage.getItem("Data")).user.role_id))
    const {owner,distributor,sales,headOffice,Branch,Cust} = Role

    return(
        owner &&<div>
            <div className="name__top">Welcome to Owner {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <Owner/>
            <FooterC />            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        distributor &&<div>
            <div className="name__top">Welcome to Distributor {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <Distributor/>
            <FooterC />            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        sales &&<div>
            <div className="name__top">Welcome to Sales {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <Salescomponent />
            <FooterC/>
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        headOffice &&<div>
            <div className="name__top">Welcome to Head Office {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />} state = {"headOffice"}/>
            <HeadOfficeComponent/>
            <FooterC/>
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
        ||
        Branch &&<div>
            <div className="name__top">Welcome to Branch {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />} state = {"Branch"} />
            {/* Set up compoenwts for all roles separately and bring about functionalities */}

        </div>
    )
};

export default UserDashboard;