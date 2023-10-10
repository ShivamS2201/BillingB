import React, { useEffect, useState } from "react";
import Navb from "../Components/navbar";
import { SignoutNav } from "../UserView/singoutnav";
import { Link, useNavigate } from "react-router-dom";
import { JdateGet, isAuthenticated } from "../auth/authIndex";
import FooterC from "../Components/footer";
import { API } from "../backend";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

export function Stock() {
  const [bankHOState, setBankSt] = useState({
    goods: true,
    service: false,
    expanse: false,
    capgoods: false,
  });
  const [TableValue, SetTableValue] = useState([""]);

  const HOBankfetch = async () => {
    await fetch(`${API}bill/getBank/HO/${isAuthenticated().user.id}`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // SetTableValue(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      sort: true,
      dataField: "bank_name",
      text: "Bank",
    },
    {
      sort: true,
      dataField: "account_num",
      text: "Account No.",
    },
    {
      sort: true,
      dataField: "open_balance",
      text: "Bank Opening Balance",
    },
    {
      sort: true,
      dataField: "bank_name",
      text: "State Name", // Change backend data to bring the State Name along
    },
    {
      sort: true,
      dataField: "created_at", // Created at changed to creater form
      text: "Date",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>{JdateGet(row["created_at"])}</span>
        </div>
      ), ////JdateGet(row["created_at"]).slice(0,row["created_at"].length))}
    },

    {
      sort: true,
      dataField: "Primary_type",
      text: "Actions",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>
            {(row["Primary_type"] === true && (
              <div className="tableOptions">
                <i
                  className="bi bi-pencil-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    nav(`/user/dashboard/headOffice/editbank/${row.id}`);
                  }}
                ></i>
              </div>
            )) ||
              (row["Primary_type"] === false && (
                <div className="tableOptions">
                  <i
                    className="bi bi-pencil-fill"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      nav(`/user/dashboard/headOffice/editbank/${row.id}`);
                    }}
                  ></i>
                </div>
              ))}
          </span>
        </div>
      ),
    },
  ];
  const handleChange = (name, idx) => (event) => {
    // if (name === "renew_year") {
    //   if (
    //     window.confirm(
    //       `Renew ${TableValue[idx].first_name} by ${event.target.value} year`
    //     )
    //   ) {
    //     alert("Changed");
    //     UpdateRY({ ...TableValue[idx], renew_year: event.target.value });
    //   } else {
    //     alert("Not changed");
    //   }
    // }
  };
  let icon1 = require("../assets/images/icon1.png");
  let icon2 = require("../assets/images/icon2.png");

  useEffect(() => {
    HOBankfetch();
  }, []);
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
  const rowStyle = {};

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
        value: TableValue ? TableValue.length : 0,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  const { SearchBar } = Search;
  const selectRow = {
    mode: "checkBox",

    clickToSelect: true,

    style: { background: "#def3ff" },
  };
  const nav = useNavigate();

  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Stock Master</h3>
        </div>
      </div>

      <div className="BankContainer">
        <div className="BCContainer">
          <div className="BCContainerbutt">
            <button
              className="BHObutt"
              style={{
                backgroundColor: bankHOState.goods
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setBankSt({
                  goods: true,
                  service: false,
                  expanse: false,
                  capgoods: false,
                });
              }}
            >
              GOODS
            </button>
            <button
              className="BHObutt"
              style={{
                backgroundColor: bankHOState.service
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setBankSt({
                  goods: false,
                  service: true,
                  expanse: false,
                  capgoods: false,
                });
              }}
            >
              SERVICE
            </button>
            <button
              className="BHObutt"
              style={{
                backgroundColor: bankHOState.expanse
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setBankSt({
                  goods: false,
                  service: false,
                  expanse: true,
                  capgoods: false,
                });
              }}
            >
              EXPANSE
            </button>
            <button
              className="BHObutt"
              style={{
                backgroundColor: bankHOState.capgoods
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setBankSt({
                  goods: false,
                  service: false,
                  expanse: false,
                  capgoods: true,
                });
              }}
            >
              CAPITAL GOODS
            </button>
          </div>
        </div>

        <div className="tablecontainer">
          <div className="ButtonTextWrapper">
            <div className="LOS"></div>
            <div className="ButtonContainer">
              <Link to="/user/dashboard/headOffice/addbank/">
                <button>Add Bank</button>
              </Link>
            </div>{" "}
          </div>
          {TableValue && (
            <div className="TableContainer" style={{}}>
              <ToolkitProvider
                keyField="first_name"
                data={TableValue}
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
                        data={TableValue}
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
      </div>
      <FooterC />
    </>
  );
}
