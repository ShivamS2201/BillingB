import React, { useEffect, useState } from "react";
import { API } from "../../backend";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import { Table } from "react-bootstrap";
import "./css/tablesales.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import { JdateGet, isAuthenticated } from "../../auth/authIndex";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

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
  },
  {
    sort: true,
    dataField: "first_name_sales",
    text: "Sales",
  },
  {
    sort: true,
    dataField: "first_name_dist",
    text: "Distributor",
  },
];
export function DistHOtable() {
  let icon1 = require("../../assets/images/icon1.png");
  let icon2 = require("../../assets/images/icon2.png");

  const [TableValue, SetTableValue] = useState();
  const SalesTableData = async () => {
    await fetch(`${API}user/register/distHOdata/${isAuthenticated().user.id}/5`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        SetTableValue(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    SalesTableData();
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

  return (
    <>
      <div className="ButtonTextWrapper">
        <div className="LOS">List of Head Office</div>
        
      </div>
      {TableValue && (
        <div className="TableContainer" style={{}}>
          <ToolkitProvider
            keyField="first_name"
            data={TableValue}
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
                      data={TableValue}
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
}
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination%20with%20Search&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
              // for making the required type of table with custom pagination and search bar
              // and hooks to chnages: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Selection%20Hooks&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
              