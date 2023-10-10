import React, { useEffect, useState } from "react";
import Navb from "../Components/navbar";
import { SignoutNav } from "../UserView/singoutnav";
import { useLocation } from "react-router-dom";
import { JdateGet, expBR, getExpiry, isAuthenticated } from "../auth/authIndex";
import FooterC from "../Components/footer";
import { API } from "../backend";
import { Link, useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import { Form,Button } from "react-bootstrap";
import "./css/master.css"
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

export function Master (){
    const [BrTable,setBrtable] = useState({response:""});
    const fetchBrtable = async () => {
      await fetch(`${API}user/register/hobrdata/${isAuthenticated().user.id}/6`, {
        method: "GET",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setBrtable(data);
          console.log(data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    let icon1 = require("../assets/images/icon1.png");
    let icon2 = require("../assets/images/icon2.png");
    useEffect(()=>{
      fetchBrtable();
    },[])
    const columns = [
      {
        sort: true,
        dataField: "first_name",
        text: "Name",
      },
      {
        sort: true,
        dataField: "email",
        text: "Email ID",
      },
      {
        sort: true,
        dataField: "bill_manage_info__landlineNUM",
        text: "Contact No.",
      },
      {
        sort: true,
        dataField: "bill_manage_info__sms_credit",
        text: "SMS",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
              {cell}({JSON.stringify(row["bill_manage_info__sms_debit"])})
            </span>
          </div>
        ),
      },
      {
        sort: true,
        dataField: "bill_manage_info__system_credit",
        text: "System",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
              {cell}({JSON.stringify(row["bill_manage_info__system_debit"])})
            </span>
          </div>
        ),
      },
      {
        sort: true,
        dataField: "bill_manage_info__whatsapp_credit",
        text: "Whatsapp",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
              {cell}({JSON.stringify(row["bill_manage_info__whatsapp_debit"])})
            </span>
          </div>
        ),
      },
     {
        sort: true,
        dataField: "joining_date",
        text: "Joining Date",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
            {JdateGet(row["joining_date"])}
            </span>
          </div>
        )
      }
      ,
      {
        sort: true,
        dataField: "renew_year",
        text: "Expiry Date",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
              {expBR(row["joining_date"], row["renew_year"])}
            </span>
          </div>
        ),
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
          value: BrTable ? BrTable.length : 0,
        },
      ], // A numeric array is also available. the purpose of above example is custom the text
    };
    const { SearchBar } = Search;
    const selectRow = {
      mode: "checkBox",
  
      clickToSelect: true,
  
      style: { background: "#def3ff" },
    };
  
    return(
        <>
          <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Branch Master</h3>
          <div className="MasterButton">  <div className="ButtonTextWrapper">
         <div className="LOS"></div>
         <div className="ButtonContainerm">
           <Link to="/user/dashboard/register/addBranch/">
             <button>Add Branch</button>
           </Link>
         </div>{" "}
       </div></div>
        </div>
      </div>
      {!BrTable.response &&
       <div className="NoTableCont">
        <div className="Content">
                 
                  You have not added any data. Please add new data
       </div>
     </div>
      }
      {BrTable.response && (
        <div className="tablecontainer">
        {BrTable.response && (
          <div className="TableContainer" style={{}}>
            <ToolkitProvider
              keyField="first_name"
              data={BrTable.response}
              columns={columns}
              search
            >
              {(props) => (
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
                      data={BrTable.response}
                      columns={columns}
                      pagination={paginationFactory(options)}
                      sort={sortOption}
                      noDataIndication={"Loading..."}
                      {...props.baseProps}
                      rowStyle={rowStyle}
                    />
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
        )}
      </div>
      )}
        <FooterC/>
        </>
    )
}