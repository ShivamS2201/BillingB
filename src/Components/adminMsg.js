import React, { useEffect, useState } from "react";
import { JdateGet, isAuthenticated } from "../auth/authIndex";
import Navb from "./navbar";
import { SignoutNav } from "../UserView/singoutnav";
import FooterC from "./footer";
import { Button } from "react-bootstrap";
import "./css/adminmsg.css";
import { Link } from "react-router-dom";
import ToolkitProvider, {
    Search,
  } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { API } from "../backend";
import AddMessage from "./addMessage";
import Loader from "./loader";

export default function AdminMessage() {    
  const TableandButton = (tableData, typemsg) => {
    const columns = [
        {
          sort: true,
          dataField: "id",
          text: "S.no.",
        },
        {
          sort: true,
          dataField: "ShortId",
          text: "Unique Identifier",
        },
        {
          dataField: "message",
          text: "Message",
        },
          {
            dataField: "timestamp",
            text: "Sent At",
            formatter: (cell, row, rowIndex, extraData) => (
              <div>
                <span>
                  {JdateGet(row["timestamp"])}
                </span>
              </div>
            )
          },
      ];
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing {from} to {to} of {size} Results
        </span>
      );
      const sortOption = {
        sortCaret: (order, column) => {
          const sortIcon = !order
            ? icon1
            : order === "asc"
            ? icon1
            : order === "desc"
            ? icon2
            : null;
          if (sortIcon !== null) {
            return (
              <span>
                {" "}
                <img src={sortIcon} width="10" height="10" alt="sortIcon" />{" "}
              </span>
            );
          }
          return null;
        },
      };
      const rowStyle = { 
      
    
    };
    
      const options = {
        paginationSize: 2,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: "First",
        prePageText: "Back",
        nextPageText: "Next",
        lastPageText: "Last",
        nextPageTitle: "First page",
        prePageTitle: "Pre page",
        firstPageTitle: "Next page",
        lastPageTitle: "Last page",
        showTotal: true,
        disablePageTitle: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
          {
            text: "5",
            value: 5,
          },
          {
            text: "10",
            value: 10,
          },
          {
            text: "All",
            value: tableData ? tableData.length : 0,
          },
        ], // A numeric array is also available. the purpose of above example is custom the text
      };
      let icon1 = require("../assets/images/icon1.png");
      let icon2 = require("../assets/images/icon2.png");
      const { SearchBar } = Search;
      const selectRow = {
        mode: "checkBox",
    
        clickToSelect: true,
    
        style: { background: "#def3ff" },
      };
    return (
      <>
        <div className="Containermsg">
          <div className="ButtonTextWrapper">
            <div className="LOS"></div>
            <div className="ButtonContainer">
              <Link to={`/user/dashboard/messages/add/${typemsg}`}>
                <button style={{marginRight:"12px"}}>Add {typemsg} Message </button>
              </Link>
            </div>
          </div>
        </div>
        {tableData && (
        <div className="TableContainer" style={{}}>
          <ToolkitProvider
            keyField="first_name"
            data={tableData}
            columns={columns}
            search
          >
            {
              (props) => (
                <div className="TableBarWrapper">
                  <div className="ButtonSearchCont">
                    <SearchBar {...props.searchProps} />
                  </div>
                  <div className="TableWrapper">
                    <BootstrapTable
                      bootstrap4
                      striped
                      hover
                      selectRow={selectRow}
                      keyField="first_name"
                      data={tableData}
                      columns={columns}
                      pagination={paginationFactory(options)}
                      sort={sortOption}
                      noDataIndication={"Loading..."}
                      {...props.baseProps}
                      rowStyle={ rowStyle }
                    />
                  </div>
                </div>
              )
            }
          </ToolkitProvider>
        </div>
      )}
      </>
    );
  };
  const [msgtype, setmsgtype] = useState({
    sms: true,
    whatsapp: false,
    email: false,
    MOS: false,
    loading:true
  });
  const [Table,setTable] = useState();
  const Typehandlechange = (name) => (event) => {
    if (name === "sms") {
      setmsgtype({ sms: true, whatsapp: false, email: false, MOS: false});
    } else if (name === "whatsapp") {
      setmsgtype({ sms: false, whatsapp: true, email: false, MOS: false });
    } else if (name === "email") {
      setmsgtype({ sms: false, whatsapp: false, email: true, MOS: false });
    } else if (name === "MOS") {
      setmsgtype({ sms: false, whatsapp: false, email: false, MOS: true });
    }
  };

  function FetchTable(){
    if (msgtype.sms){
         fetch(
            `${API}bill/admin/fetchMsgTable`,
            {
              method: "GET",
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((data) => {
              setTable(data);
              setmsgtype({...msgtype,loading:false})
            })
            .catch((err) => {
              console.log(err);
            });

    }
  }
  useEffect(()=>{
    Typehandlechange("sms")
    FetchTable();
  },[])
  return (
    <>
        {msgtype.sms && msgtype.loading && <><Loader/></>}
      <div className="name__top">
        Welcome to Owner {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} />
      <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Message Center</h3>
          <div className="MasterButton">
            <div className="ButtonTextWrapper">
              <div className="LOS"></div>
              <div className="ButtonContainerm">
                {/* Data can come here a button maybe */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ConatinerMsg">
        <div className="MessageFlex">
          <Button onClick={Typehandlechange("sms")}> SMS </Button>
          <Button onClick={Typehandlechange("whatsapp")}> WHATSAPP </Button>
          <Button onClick={Typehandlechange("email")}> EMAIL </Button>
          <Button onClick={Typehandlechange("MOS")}> MESSAGE ON SCREEN </Button>
        </div>
        <div className="ContentContainer">
          {msgtype.sms && Table &&<>{TableandButton(Table,"SMS")}</>}
          {msgtype.whatsapp && <>{TableandButton([],"Whatsapp")}</>}
          {msgtype.email && <>{TableandButton([],"Email")}</>}
          {msgtype.MOS && <>{TableandButton([],"MOS")}</>}
        </div>
      </div>

      <FooterC />
    </>
  );
}
