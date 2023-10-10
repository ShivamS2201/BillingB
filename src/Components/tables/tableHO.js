import React, { useEffect, useState } from "react";
import { API } from "../../backend";
import { Link, useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { JdateGet, UpdateRY, getExpiry, isAuthenticated } from "../../auth/authIndex";
import paginationFactory, {
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import { Form,Button } from "react-bootstrap";
import "./css/tablesales.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

export function TableHO() {
  const nav = useNavigate()
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
            {getExpiry(row["joining_date"], row["renew_year"])}
          </span>
        </div>
      ),
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
    {
      sort: true,
      dataField: "is_active",
      text: "Actions",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <span>
            {(row["is_active"] === true && (
              <div className="tableOptions">
                <Button variant="success">
                  {JSON.stringify(row["is_active"])}
                </Button>
                <i
                  className="bi bi-pencil-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    nav(`/user/dashboard/edit/user/${row.id}`);
                  }}
                >
                </i>
                <Form.Group>
                  <Form.Select size="sm"
                    aria-label="Default select example"
                    value={TableValue.renew_year}
                    onChange={handleChange("renew_year",rowIndex)}
                    required
                  >
                   <option value="1">Renew</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )) ||
              (row["is_active"] === false && (
                <div className="tableOptions">
                  <Button variant="light">
                    {JSON.stringify(row["is_active"])}
                  </Button>
                  <i
                  className="bi bi-pencil-fill"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    nav(`/user/dashboard/edit/user/${row.id}`);
                  }}
                >
                </i>
                  <Form.Group>
                  <Form.Select size="sm"
                    aria-label="Default select example"
                    value={TableValue.renew_year}
                    onChange={handleChange("renew_year",rowIndex)}
                    required
                    title="Renew Year"
                  >
                    <option value="1">Renew</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </Form.Group>
                </div>
              ))}
          </span>
        </div>
      ),
    },
  ];
  const handleChange = (name,idx)=>(event)=>{
    if (name === "renew_year") {
    if (window.confirm(`Renew ${TableValue[idx].first_name} by ${event.target.value} year`)){
      alert("Changed")
      UpdateRY({...TableValue[idx], "renew_year":event.target.value})
    }
    else{
      alert("Not changed")
    }
}
}
  let icon1 = require("../../assets/images/icon1.png");
  let icon2 = require("../../assets/images/icon2.png");

  const [TableValue, SetTableValue] = useState();
  const HODataFetch = async () => {
    await fetch(`${API}user/register/saleshodata/${isAuthenticated().user.id}/5`, {
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
    HODataFetch();
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

  return (
    <>
      <div className="ButtonTextWrapper">
        <div className="LOS">List of Head Office</div>
        <div className="ButtonContainer">
          <Link to="/user/dashboard/register/addHoffice">
            <button>Add Head Office</button>
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
    </>
  );
}