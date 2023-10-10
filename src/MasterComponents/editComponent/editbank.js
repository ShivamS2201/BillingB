import React, { useEffect, useState } from "react";
import { AddBankHO, EditBankHO, isAuthenticated } from "../../auth/authIndex";
import Navb from "../../Components/navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { Button, Form } from "react-bootstrap";
// import "./css/addbank.css";
import { API } from "../../backend";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// GST ISSUE needs resolution

export function EditBank() {
  const {id} = useParams();
  const nav = useNavigate();
  const [stateChoice, SetStatechoice] = useState();
  const [Acctype, SetAccType] = useState();
  const [values, setvalues] = useState({
    user_id: isAuthenticated().user.id, //user id that creates the bank
    bank_name: "",
    account_num: "",
    ifsc_code: "",
    Branch: "",
    StateCode_id: "",
    gstNumber: "",
    account_type: "",
    open_balance: "",
    Primary_type: true,
    error: false,
    loading: false,
    didNavigate: false,
  });
  const FecthEditbank =async () => {
    await fetch(`${API}bill/bank/HO/fetchbank/${id}`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setvalues(data[0]);
        console.log(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const GSTvalidator = (NUM) => {
    const GSTREGEX = new RegExp(
      /^([0][1-9]|[1-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/
    );
    if (GSTREGEX.test(NUM)) {
      return true;
    } else {
      return false;
    }
  };
  const performNavigate = () => {
    if (values.didNavigate) {
      return <Navigate to="/user/dashboard" />;
    }
  };
  const handleChange = (name) => (event) => {
    if (name === "gstNumber") { // checks will be sequential 1. State Code and 1 st 2 letters same.
      //2. uske baad length and GST validator-- idhr hoga error and type jisse invalid hoga ya nhi
      if (event.target.value.slice(0,2)<10){
        if (values.StateCode_id && (event.target.value.slice(1,2) === values.StateCode_id) && event.target.value.length<16){
          if (event.target.value.length>14){
            var resp = GSTvalidator(event.target.value);

            if (resp){
              setvalues({
                ...values,
                error: false,
                [name]: event.target.value.slice(0, 15),
              });
            }
            else{
              setvalues({ ...values, error: true, Etype: "GST" });
            }            
          }
        }
      }
      else{
        if (values.StateCode_id && (event.target.value.slice(0,2) === values.StateCode_id) && event.target.value.length<16){
          console.log(event.target.value.slice(0,2),values.StateCode_id,"ss")
          if (event.target.value.length>14){
            var resp = GSTvalidator(event.target.value);

            if (resp){
              setvalues({
                ...values,
                error: false,
                [name]: event.target.value.slice(0, 15),
              });
            }
            else{
              setvalues({ ...values, error: true, Etype: "GST" });
            }            
          }
        }
      }
    } else if(name === "account_type"){
      setvalues({ ...values, error: false,["account_type_id"]:event.target.value });
    }
    else if(name === "StateCode"){
      setvalues({ ...values, error: false,["StateCode_id"]:event.target.value });
      console.log(`${values.StateCode_id}`,`${values.gstNumber.slice(1,2)}`)
      if (! `${values.StateCode_id}`=== values.gstNumber.slice(1,2)){
        setvalues({ ...values, error: true, Etype: "GST" });        
      }
    }
    else{
      setvalues({ ...values, error: false, [name]: event.target.value });
      console.log(values)
    }
  };
  function states() {
    return (
      <Form.Group>
        <Form.Label>State Name</Form.Label>
        <Form.Select
        value={values.StateCode_id}
          aria-label="Default select example"
          onChange={handleChange("StateCode")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          {stateChoice.map((item, index) => (
            <option key={index} value={item.id}>
              {item.state_name} ({item.state_code})
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function AccType() {
    return (
      <Form.Group>
        <Form.Label>Account Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={values.account_type_id}
          onChange={handleChange("account_type")}
          // isInvalid={values.state === ""}
          // isValid={values.state !== ""}
          required
        >
          {Acctype.map((item, index) => (
            <option key={index} value={item.id}>
              {item.account_type_name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  const getState = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/addbank/stateCodes/`, {
        method: "GET",
      });
      const data = await resp.json();
      SetStatechoice(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getAccType = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/addbank/acctype/`, {
        method: "GET",
      });
      const data = await resp.json();
      SetAccType(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    FecthEditbank();
    setValidated(false);
    getAccType();
    getState();
  }, []);
  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      {JSON.stringify(values)}
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Edit Bank Master</h3>
        </div>
      </div>
      <div className="FormSet">
        <div className="Formhandler">
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              values.loading = true;
              const form = event.currentTarget;
              if (form.checkValidity() === false) {
                event.preventDefault(); // refresh problem is here
                event.stopPropagation();
              } else {
                event.preventDefault();
                setValidated(true);
                console.log(values);
                EditBankHO(values)
                  .then((data) => {
                    if (data) {
                      console.log(data);
                      setvalues({
                        ...values,
                        didNavigate: true,
                        loading: false,
                      });
                      <Navigate to="/user/dashboard/headOffice/bank" />
                    } else {
                      console.log(data);
                      setvalues({ ...values, loading: false });
                    }
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
              }
            }}
          >
            <div className="parent">
              <div className="pad div1">
                <Form.Group>
                  <Form.Label>Name of Bank :</Form.Label>
                  <Form.Control
                    onChange={handleChange("bank_name")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Bank Name"
                    required
                    value={values.bank_name}
                    isInvalid={/^\d+$/.test(values.bank_name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Bank Name Incorrect{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div2">{stateChoice && <>{states()}</>}</div>
              <div className="pad div4">
                <Form.Group>
                  <Form.Label>Enter GST Number:</Form.Label>
                  <Form.Control
                    onChange={handleChange("gstNumber")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="GST number"
                    required
                    value={values.gstNumber}
                    isInvalid={values.error && values.Etype === "GST"}
                  />
                  <Form.Control.Feedback type="invalid">
                    GST number Invalid !
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div5">
                <Form.Group>
                  <Form.Label>A/C Number :</Form.Label>
                  <Form.Control
                    onChange={handleChange("account_num")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Account Number"
                    required
                    value={values.account_num}
                    isInvalid={(values.account_num && values.account_num.length>10) && !/^\d{9,18}$/.test(values.account_num)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Account Number Incorrect{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div7">
                <Form.Group>
                  <Form.Label>IFSC Code :</Form.Label>
                  <Form.Control
                    onChange={handleChange("ifsc_code")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="IFSC Code"
                    required
                    value={values.ifsc_code}
                    // isInvalid={values.ifsc_code === ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    IFSC Code Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div8">
                <Form.Group>
                  <Form.Label>Branch :</Form.Label>
                  <Form.Control
                    onChange={handleChange("Branch")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Branch"
                    required
                    value={values.Branch}
                  />
                  <Form.Control.Feedback type="invalid">
                    Branch Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div10">{Acctype && <>{AccType()}</>}</div>
              <div className="pad div11">
                <Form.Group>
                  <Form.Label>Opening Balance :</Form.Label>
                  <Form.Control
                    onChange={handleChange("open_balance")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Opening Balance"
                    required
                    value={values.open_balance}
                  />
                  <Form.Control.Feedback type="invalid">
                    Opening Balance Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="ButtonWrapper">
                {values.error && (
                  <>
                    {" "}
                    <Button type="submit" disabled>
                      Add Bank {`>`}
                      {performNavigate()}
                    </Button>
                  </>
                )}
                {!values.error && (
                  <>
                    <Button type="submit" >
                      Add Bank {`>`}
                      {performNavigate()}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </>
  );
}
