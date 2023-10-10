import React, { useEffect, useState } from "react";
import FooterC from "./footer";
import Navb from "./navbar";
import { TransferSalesreq, isAuthenticated } from "../auth/authIndex";
import { SignoutNav } from "../UserView/singoutnav";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import { API } from "../backend";

export default function TransferSales(){
  var nav = useNavigate();
    const [dist,setdist] = useState();
    const [sales,setsales] = useState();
    const [distShow,setdshow] = useState();
    const [senddist,setsenddist] = useState();
    const [values,setvalues] = useState({
        sales:"",
        dist:""
    });

    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
         setsenddist();

     }
    const handleChange = (selectedOption) => {
        setvalues({...values,sales:selectedOption.value,dist:selectedOption.distributor.first_name,email:selectedOption.email,role_id:selectedOption.role_id});
        setdshow(dist.filter(ele=> ele.value !== selectedOption.dist_id))
        reset();
      };
const handleChangedist = (selectedOption) => {
        setsenddist({dist_id:selectedOption.value,dist:selectedOption.label,id:values.sales});
      };

  const SendUpdate = ()=>{
    var resp = TransferSalesreq({id:values.sales,dist_id:senddist.dist_id,email:values.email,role_id:values.role_id});
    if (resp){
      nav('user/dashboard'); // else show an error
    }
  
  }
    
    // register/distdropdown/<int:id>/<int:role>
    const SalesData = async () => {
        await fetch(
          `${API}user/register/salesdropdown/${
            isAuthenticated().user.id
          }/${4}`,
          {
            method: "GET",
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setsales(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const DistData = async () => {
        await fetch(
          `${API}user/register/distdropdown/${
            isAuthenticated().user.id
          }/${3}`,
          {
            method: "GET",
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setdist(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        SalesData();
        DistData();

      }, []);
    return(
        <>
        <div className="name__top">Welcome to Owner {isAuthenticated().user.first_name}</div>
            <Navb component={<SignoutNav />}/>
            <div className="DashContainer">
        <div className="DashboardBarM">
          <h3>Transfer Sales</h3>
          <div className="MasterButton">  <div className="ButtonTextWrapper">
         <div className="LOS"></div>
         <div className="ButtonContainerm">
            {/* Data can come here a button maybe */}
         </div>{" "}
       </div></div>
        </div>
      </div>
      {/* Two drop downs each having list of sales */}
      <Form style={{display: "flex",alignItems:" center",minHeight: "57vh"}} >
      <Container fluid style={{width: "50%",margin: "0 auto"}}>
      <Row>
        <Col xs={10}>
        {sales && <div className="SalesSelect">
          <Form.Label style={{fontWeight:"600"}}>Select Sales :</Form.Label>
        <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name="Sales"
        options={sales}
        onChange={handleChange} />
        </div>}
        </Col>
        </Row>
        <Row>
        {values.dist && <> <div style={{fontWeight:"600", marginTop:"6vh"}}> Current Distributor : <div style={{padding:"3px",display:"inline",border:"1px solid black"}}> {values.dist}</div></div></>}
        </Row>
        <Row>
          <Col xs={10}>
        {values.dist && <>
          <Form.Label style={{fontWeight:"600",marginTop:"6vh"}}>Select Distributor :</Form.Label>
        <Select
        key={seed}
        className="basic-single"
        classNamePrefix="select"
        isClearable={distShow}
        isSearchable={true}
        name="Distributors"
        options={distShow}
        onChange={handleChangedist}
        
      />
              </>}  
              </Col>          

        </Row>
        <Row>
          <Col style={{display:" flex",justifyContent: "flex-end",padding:" 12px 9vw 0 0"}}>
          { values.dist &&<>
          {senddist && <Button onClick={SendUpdate}> Update</Button>}
          {!senddist && <Button onClick={SendUpdate} disabled> Update</Button>}
          
          </> }
          </Col>
        </Row>
    </Container>
    </Form>
            <FooterC/>
        </>
    )
}

// Approach
// From the sales select a sales which you want to transfer now depepeninding upon the id we will also have the dist id embeeded into it.
// Now after a sales is selected will we have 1 - which is current id and ithers whic can be 
// Select the id of dist which you wanto transfer and then just send an update request.
