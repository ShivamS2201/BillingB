import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, Navigate, NavLink } from "react-router-dom";
import { isAuthenticated } from "../auth/authIndex";
import "./css/sales.css";
import { API } from "../backend";
import { TableHO } from "./tables/tableHO";
import { SalesBrtable } from "./tables/salesBranchTable";
import { Updater } from "./updateuserself";
// Before making add branch remeber to change role id values elese user won't be created
const Salescomponent = () => {
  const [dataholder, changeDataholder] = useState([8]);
  const [salesNum,setSN] = useState(0);
  const [BrNum,setBr] = useState(0);
  const [states, setstates] = useState({
    profile: false,
    sales: true,
    Hoffice: false,
    Branch: false,
  });
  const HeadOfetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbysales/${isAuthenticated().user.id}/5`,
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
  const Branchfetch = async ()=>{
    return await fetch(
      `${API}user/register/user/Getbysales/${isAuthenticated().user.id}/${6}`,
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
  useEffect(() => {
    dataFetch();
    HeadOfetch();
    Branchfetch();
    // fetch data
  }, [states]);

  function ProfileClick() {
    // Profile update form comes here.
    return states.profile && <><Updater/></>;
  }
  function SalesClick() {
    return states.sales && <>
    <br/>
    <br/>
    <br/>
   
    </>;
  }
  function HofficeClick() {
    return states.Hoffice && <> <div>
      <hr/>
       <TableHO/>
    </div></>;
  }
  function BranchClick() {
    return states.Branch && <>
    <hr/>
    <SalesBrtable/>
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
              <div className="CardGridsa">
                {/* <div className="cardsales cardsales1">
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
                        {JSON.stringify(dataholder.sms_credit)}
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="cardsales cardsales2">
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
                <div className="cardsales cardsales3">
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Head Office</div>
                      <div className="dataholder">{JSON.stringify(salesNum)}</div>
                    </div>
                  </div>
                </div>
                <div className="cardsales cardsales4">
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
          <SalesClick />
          <HofficeClick />
          <BranchClick />
        </div>
      </div>
    </>
  );
};

export default Salescomponent;
