import React, { useEffect, useState } from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { Link, Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import "./css/owner.css";
import { API } from "../backend";
import { OwnerSalesTable } from "./tables/OwnerSalestable";
import {OwnerHOTable} from "./tables/OwnerHOtable";
import {OwnerBrTable} from "./tables/OwnerBrTable";
import {OwnerDistTable} from "./tables/OwnerDistTable";
import { Updater } from "./updateuserself";
const Owner = () => {
  const [dataholder, changeDataholder] = useState([8]);
  const [distNum,setDN] = useState(0);
  const [salesNum,setSN] = useState(0);
  const [HONum,setHO] = useState(0);
  const [BrNum,setBr] = useState(0);
  const [states, setstates] = useState({
    owner:true,
    distributor: false,
    profile: false,
    sales: false,
    Hoffice: false,
    Branch: false,
  });
 
  const BillingdataFetch = async () => {
    return await fetch(
      `${API}user/register/bill_info/getd/${isAuthenticated().user.id}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        changeDataholder(data[0]);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    // set state when the data received
  };
  const distfetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbyowner/${isAuthenticated().user.id}/${3}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setDN(data)
        return data;

      })
      .catch((err) => {
        console.log(err);
      });
  }
  const salefetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbyowner/${isAuthenticated().user.id}/${4}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setSN(data)
        return data;

      })
      .catch((err) => {
        console.log(err);
      });
  }
  const HOfetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbyowner/${isAuthenticated().user.id}/${5}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setHO(data)
        return data;

      })
      .catch((err) => {
        console.log(err);
      });
  }
  const Branchfetch = async ()=>{
    return await fetch(
      `${API}user/register/user/Getbyowner/${isAuthenticated().user.id}/${6}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setBr(data)
        return data;

      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  useEffect(() => {
    BillingdataFetch();
    salefetch();
    HOfetch();
    Branchfetch();
    distfetch();
    // fetch data
  }, []);

  function OwnerClick() {
    return states.owner && <>
    OWNER Functions
    <br />
    <br />
    <br />
    </>;
  }
  function DistributorClick() {
    return states.distributor && <>
    <hr />
    <OwnerDistTable/>
    </>;
  }
  function ProfileClick() {
    // Profile update form comes here.
    return states.profile && <><Updater/></>;
  }
  //Put a boolean prop for seeing if the user renders has
  function SalesClick() {
    return states.sales && <>
    <div>
      <hr />
       <OwnerSalesTable/>
    </div>
    </>;
  }
  function HofficeClick() {
    return states.Hoffice && <>
    <div >
      <hr/>
      <OwnerHOTable />
    </div>
    </>;
  }
  function BranchClick() {
    return states.Branch && <>
    <div >
      <hr/>
      <OwnerBrTable />
    </div>
    </>;
  }
  return (
    <>
      <div className="distributorWrapper">
        <div className="buttoncontentwrapper">
          <div className="flexContainer">
            <div className="buttoncontainer">
              <div className="buttonwrapper">
              <button
                  style={{
                    backgroundColor: states.owner ? "#2f3192" : "",
                    color: states.owner ? "white" : "",
                    borderLeft: states.owner
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      owner: true,
                      distributor:false,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                  }}
                >
                  Owner
                </button>
                <button
                  style={{
                    backgroundColor: states.profile ? "#2f3192" : "",
                    color: states.profile ? "white" : "",
                    borderLeft: states.profile
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      profile: true,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                  }}
                >
                  Profile
                </button>
                <button
                  style={{
                    backgroundColor: states.distributor ? "#2f3192" : "",
                    color: states.distributor ? "white" : "",
                    borderLeft: states.distributor
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      distributor: true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                      Branch: false,
                    });
                  }}
                >
                  Distributor
                </button>
                <button
                  style={{
                    backgroundColor: states.sales ? "#2f3192" : "",
                    color: states.sales ? "white" : "",
                    borderLeft: states.sales
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      sales: true,
                      profile: false,
                      Hoffice: false,
                      Branch: false,
                    });
                  }}
                >
                  Sales
                </button>
                <button
                  style={{
                    backgroundColor: states.Hoffice ? "#2f3192" : "",
                    color: states.Hoffice ? "white" : "",
                    borderLeft: states.Hoffice
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      Hoffice: true,
                      profile: false,
                      sales: false,
                      Branch: false,
                    });
                  }}
                >
                  Head Office
                </button>
                <button
                  style={{
                    backgroundColor: states.Branch ? "#2f3192" : "",
                    color: states.Branch ? "white" : "",
                    borderLeft: states.Branch
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
                        owner:false,
                      Branch: true,
                      profile: false,
                      sales: false,
                      Hoffice: false,
                    });
                  }}
                >
                  Branch
                </button>
              </div>
            </div>
            {states.profile && (
              <div className="profileWrapper"><ProfileClick/></div>
            )}
            <div
              className="cardconatiner"
              style={{ display: states.profile ? "none" : "" }}
            >
              <div className="CardGrid">
              <div className="cards card1">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Distributor</div>
                      <div className="dataholder">{JSON.stringify(distNum)}</div>
                    </div>
                  </div>
                </div>
                <div className="cards card2">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Sales</div>
                      <div className="dataholder">
                        {JSON.stringify(salesNum)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="cards card2">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          SYSTEM ({JSON.stringify(dataholder.system_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.system_debit)}
                        </div>
                      </div>
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          SMS ({JSON.stringify(dataholder.sms_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.sms_debit)}
                        </div>
                      </div>
                      <div
                        className="dataconatinerMSG"
                        style={{ display: "flex" }}
                      >
                        <div className="textholdermsg">
                          Whatsup ({JSON.stringify(dataholder.whatsapp_credit)})
                        </div>
                        <div className="dataholdermsg">
                          {JSON.stringify(dataholder.whatsapp_debit)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="cards card3">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Head Office</div>
                      <div className="dataholder">{JSON.stringify(HONum)}</div>
                    </div>
                  </div>
                </div>
                <div className="cards card4">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Branch</div>
                      <div className="dataholder">{JSON.stringify(BrNum)}</div>
                    </div>
                  </div>
                </div>
              </div> 
              {/* The admin Buttons are added.Can be conditional Need to change just add it to render for Owner state */}
              <Container fluid="md" style={{display:"inline"}}>
                <Row>
                  <Col>
                  <Link to="/user/dashboard/transfersales">
                  <Button style={{width:"18.6vw",background:"rgb(47, 49, 146)",border:"none"}}>
                    Transfer Sales
                    </Button>
                    </Link>
                  </Col>
                  <Col><Link to="/user/dashboard/transferHO">
                  <Button style={{width:"18.6vw",background:"rgb(47, 49, 146)",border:"none"}}>
                    Transfer Head Office
                  </Button>
                  </Link>
                  </Col>
                  <Col><Link to="/user/dashboard/adminMessage">
                  <Button style={{width:"18.6vw",background:"rgb(47, 49, 146)",border:"none"}}>
                    Admin Messages
                  </Button>
                  </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
        <div className="tablewrapper">
          <OwnerClick/>
          <DistributorClick />
          <SalesClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default Owner;
