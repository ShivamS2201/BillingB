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
import "./css/bank.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");

export function Place(){
    const [placeHOstate, setPlaceSt] = useState({ place: true, group: false,category:false });
    const [Place,setPlace] = useState("");
    const [group,setGroup] = useState("");
    const [category,setCategory] = useState("");

    const fetchPlace = async () => {
      await fetch(`${API}bill/bank/HO/fetchplace/${isAuthenticated().user.id}`, {
        method: "GET",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setPlace(data);
          console.log(data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchGroup = async () => {
        await fetch(`${API}bill/bank/HO/fetchGroup/${isAuthenticated().user.id}`, {
          method: "GET",
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setGroup(data);
            console.log(data.response);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const fetchCategory = async () => {
        await fetch(`${API}bill/bank/HO/fetchcategory/${isAuthenticated().user.id}`, {
          method: "GET",
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setCategory(data);
            console.log(data.response);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    let icon1 = require("../assets/images/icon1.png");
    let icon2 = require("../assets/images/icon2.png");
    useEffect(()=>{
      fetchPlace();
      fetchGroup();
      fetchCategory();
    },[])
    const columnsPlace = [
      {
        sort: true,
        dataField: "place_name",
        text: "Name",
      },
     {
        sort: true,
        dataField: "timeStamp",
        text: "timeStamp",
        formatter: (cell, row, rowIndex, extraData) => (
          <div>
            <span>
            {JdateGet(row["timeStamp"])}
            </span>
          </div>
        )
      }
    ];
    const columnsGroup= [
        {
          sort: true,
          dataField: "cust_grp",
          text: "Name",
        },
       {
          sort: true,
          dataField: "timeStamp",
          text: "timeStamp",
          formatter: (cell, row, rowIndex, extraData) => (
            <div>
              <span>
              {JdateGet(row["timeStamp"])}
              </span>
            </div>
          )
        }
      ];
      const columnsCat = [
        {
          sort: true,
          dataField: "cat_name",
          text: "Name",
        },
       {
          sort: true,
          dataField: "timeStamp",
          text: "timeStamp",
          formatter: (cell, row, rowIndex, extraData) => (
            <div>
              <span>
              {JdateGet(row["timeStamp"])}
              </span>
            </div>
          )
        }
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
          value: Place ? Place.length : 0,
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
        <div className="DashboardBar">
          <h3>Place Master</h3>
        </div>
      </div>

      <div className="BankContainer">
        <div className="BCContainer">
          <div className="BCContainerbutt">
            <button
              className="BHObutt"
              style={{
                backgroundColor: placeHOstate.place
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setPlaceSt({ place: true,group: false,category:false });
              }}
            >
              Place
            </button>
            <button
              className="BHObutt"
              style={{
                backgroundColor: placeHOstate.group
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setPlaceSt({ place: false,group: true,category:false });
              }}
            >
              Group
            </button>
            <button
              className="BHObutt"
              style={{
                backgroundColor: placeHOstate.category
                  ? "#f24e52"
                  : "rgb(49, 52, 147)",
              }}
              onClick={() => {
                setPlaceSt({ place: false,group: false,category:true });
              }}
            >
              Category
            </button>
          </div>
        </div>

        { placeHOstate.place && <div className="tablecontainer">
          <div className="ButtonTextWrapper">
            <div className="LOS"></div>
            <div className="ButtonContainer">
              <Link to="/user/dashboard/headOffice/addplace/">
                <button>Add Place/Group/Category</button>
              </Link>
            </div>{" "}
          </div>
          {Place && (
            <div className="TableContainer" style={{}}>
              <ToolkitProvider
                keyField="first_name"
                data={Place}
                columns={columnsPlace}
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
                        data={Place}
                        columns={columnsPlace}
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
        </div>}

        { placeHOstate.group && <div className="tablecontainer">
          <div className="ButtonTextWrapper">
            <div className="LOS"></div>
            <div className="ButtonContainer">
              <Link to="/user/dashboard/headOffice/addplace/">
                <button>Add Place/Group/Category</button>
              </Link>
            </div>{" "}
          </div>
          {group && (
            <div className="TableContainer" style={{}}>
              <ToolkitProvider
                keyField="first_name"
                data={group}
                columns={columnsGroup}
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
                        data={group}
                        columns={columnsGroup}
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
        </div>}

        { placeHOstate.category && <div className="tablecontainer">
          <div className="ButtonTextWrapper">
            <div className="LOS"></div>
            <div className="ButtonContainer">
              <Link to="/user/dashboard/headOffice/addplace/">
                <button>Add Place/Group/Category</button>
              </Link>
            </div>{" "}
          </div>
          {category && (
            <div className="TableContainer" style={{}}>
              <ToolkitProvider
                keyField="first_name"
                data={category}
                columns={columnsCat}
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
                        data={category}
                        columns={columnsCat}
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
        </div>}
      </div>
     
        <FooterC/>
        </>
    )
}