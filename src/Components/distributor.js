import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import "./css/distributor.css";
import { API } from "../backend";
import { SalesTable } from "./tables/tablesales";
import { DistHOtable } from "./tables/distHOtable";
import { DistBrtable } from "./tables/distBranchtable";
import { Updater } from "./updateuserself";
const Distributor = () => {
  const [dataholder, changeDataholder] = useState([8]);
  const [salesNum,setSN] = useState(0);
  const [HONum,setHO] = useState(0);
  const [BrNum,setBr] = useState(0);
  const [states, setstates] = useState({
    distributor: true,
    profile: false,
    sales: false,
    Hoffice: false,
    Branch: false,
  });
  const dataFetch = async () => {
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
  const salefetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbydist/${isAuthenticated().user.id}/${4}`,
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
      `${API}user/register/user/Getbydist/${isAuthenticated().user.id}/${5}`,
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
      `${API}user/register/user/Getbydist/${isAuthenticated().user.id}/${6}`,
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
    dataFetch();
    salefetch();
    HOfetch();
    Branchfetch();
    // fetch data
  }, []);

  function DistributorClick() {
    return states.distributor && <>
    <br />
    <br />
    <br />
    </>;
  }
  function ProfileClick() {
    // Profile update form comes here.
    return states.profile && <><Updater/></>;
  }
  function SalesClick() {
    return states.sales && <>
    <div>
      <hr />
       <SalesTable/>
    </div>
    </>;
  }
  function HofficeClick() {
    return states.Hoffice && <>
    <div >
      <hr/>
      <DistHOtable />
    </div>
    </>;
  }
  function BranchClick() {
    return states.Branch && <>
    <div >
      <hr/>
      <DistBrtable />
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
                    backgroundColor: states.distributor ? "#2f3192" : "",
                    color: states.distributor ? "white" : "",
                    borderLeft: states.distributor
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
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
                    backgroundColor: states.profile ? "#2f3192" : "",
                    color: states.profile ? "white" : "",
                    borderLeft: states.profile
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
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
                    backgroundColor: states.sales ? "#2f3192" : "",
                    color: states.sales ? "white" : "",
                    borderLeft: states.sales
                      ? "5px solid #2088cb"
                      : "",
                  }}
                  className="beforeSelect"
                  onClick={() => {
                    setstates({
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
              <div className="profileWrapper"><ProfileClick />
              </div>
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
                      <div className="textholder">Sales</div>
                      <div className="dataholder">
                        {JSON.stringify(salesNum)}
                      </div>
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
                </div>
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
            </div>
          </div>
        </div>
        <div className="tablewrapper">
          <DistributorClick />
          <SalesClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default Distributor;
