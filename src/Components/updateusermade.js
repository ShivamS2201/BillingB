import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/updateuser.css";
import SignOut, {
  GetBillingInfo,
  UpdateMadeUserRq,
  isAuthenticated,
  isAuthenticatedBilling,SignIn,authenticate
} from "../auth/authIndex";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Navb from "./navbar";
import { Navigate, useParams } from "react-router-dom";
import { API } from "../backend";
import Loader from "./loader";
export function UpdateMadeUser(props) {
  const {id} = useParams()
    //Need to set the details as per user data being sent 
  const [success,setSuccess] = useState(false)
  const [values, setvalues] = useState("[]"); // remove this 
  const [didNavigate, SetNavigate] = useState(false);

  const [validated, setValidated] = useState(false);

  const fetchUserMade = async () => {
    return await fetch(`${API}user/getbyid/userform/${id}`, {
      method: "GET",
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setvalues(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUserMade()
    setValidated(false);
    SetNavigate(false);
  }, []);
  const successmsg = () => {
    return (
      <div>
        <div
          className="alert alert-success"
          style={{ display: success ? "block" : "none" }}
        >
          Details updated successfully, reload to see changes
        </div>
      </div>
    );
   
  };
  const performNavigate = () => {
    if (didNavigate) {
      console.log("Navigate")
      
    }
  };
  const {first_name, user_name, email,bill_manage_info__landlineNUM ,bill_manage_info__system_credit,bill_manage_info__system_debit,bill_manage_info__sms_credit,bill_manage_info__sms_debit,bill_manage_info__whatsapp_credit,bill_manage_info__whatsapp_debit,bill_manage_info__reason,bill_manage_info__kyc,bill_manage_info__gstNum,bill_manage_info__pan_card,password,bill_manage_info__stateCode} = values;
  
  const Tool =()=>{
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Provide old Password in case no new password is set.</Tooltip>
    );
    return (
      <>{!password &&  <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
<i className="bi bi-info-circle"></i>
      </OverlayTrigger>}</>
    )
  }
  const handleChange = (name) => (event) => {
    if (name === "bill_manage_info__sms_debit") {
      if (event.target.value < bill_manage_info__sms_credit) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value === bill_manage_info__sms_debit,
        });
      }
    }

    if (name === "bill_manage_info__system_debit") {
      if (event.target.value > bill_manage_info__system_debit) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value === bill_manage_info__system_debit,
        });
      }
    }
    if (name === "bill_manage_info__whatsapp_debit") {
      if (event.target.value > bill_manage_info__whatsapp_debit) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value === bill_manage_info__whatsapp_debit,
        });
      }
    }

    if (name === "bill_manage_info__landlineNUM") {
      if (
        event.target.value.slice(0) <= 9 ||
        event.target.value.slice(0) >= 0
      ) {
       setvalues({ ...values, error: false,[name]: event.target.value.slice(0, 10)});
      }
    } else {
      setvalues({ ...values, error: false, [name]: event.target.value });
    }
    if (name === "password"){
      setvalues({...values,error:false,[name]:event.target.value});
    }
  };
  return (
    values === "[]" &&<>
    <Loader/>
    </>
    ||
    values !=="[]" &&
    <>
    <Navb/>
    {successmsg()}
      <div className="Formwrapper">
        <div className="Formcontainer">
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => {
              const form = event.currentTarget;
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              } else {
                event.preventDefault();
                setValidated(true);
                console.log(values)
                UpdateMadeUserRq(values)
                  .then((response) => {
                    return response;
                  })
                  .then((data_1) => {
                    if (data_1) {
                      console.log(data_1)
                    }
                    return data_1;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            <div className="parent">
              <div className="pad div1">
                <Form.Group>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={handleChange("email")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div2">
                <Form.Group>
                  <Form.Label>New Password :</Form.Label>
                  <Tool/>
                  <Form.Control
                    value={password}
                    onChange={handleChange("password")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Need Password
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div3">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={first_name}
                    onChange={handleChange("first_name")}
                    size="sm"
                    type="username"
                    placeholder="First Name"
                    autoComplete="off"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    User needs a first name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div4">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={user_name}
                    onChange={handleChange("user_name")}
                    size="sm"
                    type="username"
                    placeholder="First Name"
                    autoComplete="off"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    User needs a first name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div5">
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={bill_manage_info__landlineNUM}
                    onChange={handleChange("bill_manage_info__landlineNUM")}
                    size="sm"
                    type="username"
                    placeholder="Phone"
                    autoComplete="off"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    User needs a first name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div6">
                <Form.Group>
                  <Form.Label>System(Credit - <span style={{color:"green"}}>{bill_manage_info__system_credit}</span>)</Form.Label>
                  <Form.Control
                    value={bill_manage_info__system_debit}
                    onChange={handleChange("bill_manage_info__system_debit")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="System debit"
                    isInvalid = {bill_manage_info__system_debit > bill_manage_info__system_credit}

                    />
                    <Form.Control.Feedback type="invalid">
                      Debit cannot be more than credit
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div7">
                <Form.Group>
                  <Form.Label>SMS(Credit - <span style={{color:"green"}}>{bill_manage_info__sms_credit}</span>)</Form.Label>
                  <Form.Control
                    value={bill_manage_info__sms_debit}
                    onChange={handleChange("bill_manage_info__sms_debit")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="SMS debit"
                    isInvalid = {bill_manage_info__sms_debit > bill_manage_info__sms_credit}

                  />
                   <Form.Control.Feedback type="invalid">
                      Debit cannot be more than credit
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div8">
                <Form.Group>
                  <Form.Label>Whatsapp(Credit - <span style={{color:"green"}}>{bill_manage_info__whatsapp_credit}</span>)</Form.Label>
                  <Form.Control
                    value={bill_manage_info__whatsapp_debit}
                    onChange={handleChange("bill_manage_info__whatsapp_debit")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="Whatsapp Debit"
                    isInvalid = {bill_manage_info__whatsapp_debit > bill_manage_info__whatsapp_credit}

                  />
                  <Form.Control.Feedback type="invalid">
                  Debit cannot be more than credit
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div9">
                <Form.Group>
                  <Form.Label>GST No. :</Form.Label>
                  <Form.Control
                    value={bill_manage_info__gstNum}
                    onChange={handleChange("bill_manage_info__gstNum")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="GST No."
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div10">
                <Form.Group>
                  <Form.Label>State Code :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={bill_manage_info__stateCode}
                    onChange={handleChange("bill_manage_info__stateCode")}
                    isInvalid={values.state === ""}
                    isValid={values.state !== ""}
                    required
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="pad div11">
                <Form.Group>
                  <Form.Label>Pan Card No. :</Form.Label>
                  <Form.Control
                    value={bill_manage_info__pan_card}
                    onChange={handleChange("bill_manage_info__pan_card")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="Pan card Number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div12">
                <Form.Group>
                  <Form.Label>KYC No. :</Form.Label>
                  <Form.Control
                    value={bill_manage_info__kyc}
                    onChange={handleChange("bill_manage_info__kyc")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="KYC Number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div13">
                <Form.Group>
                  <Form.Label>Reason :</Form.Label>
                  <Form.Control
                    value={bill_manage_info__reason}
                    onChange={handleChange("bill_manage_info__reason")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="text"
                    className="form-control"
                    placeholder="Reason"
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div
                className="pad div14"
                style={{ textAlign: "center", marginTop: "25px" }}
              >
                <Button type="submit">Update</Button>
              </div>
            </div>
            {JSON.stringify(values)}
          </Form>
        </div>
      </div>
    </>
  );
}
