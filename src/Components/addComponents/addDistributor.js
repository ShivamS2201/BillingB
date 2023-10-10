import React, { useEffect, useState } from "react";
import FooterC from "../footer";
import Navb from "../navbar";
import "../css/addsales.css";
import { SignoutNav } from "../../UserView/singoutnav";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import {
  isAuthenticated,
  RegisterUser,
  GetBillingInfo,
} from "../../auth/authIndex";
import { API } from "../../backend";
import Loader from "../loader";
export function DistributorForm() {
  const [salesNum,setSN] = useState(0);
  const [values, setvalues] = useState({
    //For User Registeraion
    first_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    role_id: 3,
    role_id_of_creator: isAuthenticated().user.role_id, // 2 i.e. Owner
    creator_id: isAuthenticated().user.id,
    // For Billing Info
    system_credit: 0,
    sms_credit: 0,
    whatsapp_credit: 0,
    phone: "",
    state: "",
    GSTno: "",
    pancardNo: "",
    KYC_no: "",
    address: "",
    reason: "",
    error: "",
    success: false,
    loading: false,
    didNavigate: false,
  });
  const [validated, setValidated] = useState(false);
  const loadingMsg = () => {
    return loading && <Loader />;
  };
  const performNavigate = () => {
    if (didNavigate) {
      return <Navigate to="/user/dashboard" />;
    }
  };
  // If error returns in register this saves from User prevent default from hatao all content and we use the useeffect to see any changes at all which make validated false at time when changes happen after a registerion request all though we will add a link to naviogate ot to sales page.
  const {
    first_name,
    username,
    email,
    password,
    role_id,
    role_id_creator,
    system_credit,
    sms_credit,
    whatsapp_credit,
    phone,
    state,
    GSTno,
    pancardNo,
    KYC_no,
    address,
    reason,
    error,
    success,
    loading,
    didNavigate,
  } = values;
  const distfetch =async ()=>{
    return await fetch(
      `${API}user/register/user/Getbyowner/${isAuthenticated().user.id}/${3}`,
      { method: "GET" }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data)
        setSN(data)
        return data;

      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setValidated(false);
    distfetch()
  }, [values]);
  const handleChange = (name) => (event) => {
    if (name === "sms_credit") {
      if (event.target.value > GetBillingInfo().sms_credit) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value,
        });
      }
    }

    if (name === "phone") {
      if (event.target.value.slice(0) < 9 || event.target.value.slice(0) >= 0) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value.slice(0, 10),
        });
      }
    } else {
      setvalues({ ...values, error: false, [name]: event.target.value });
    }
  };
  const handleSubmit = (event) => {};
  return (
    <>
      {loadingMsg()}
      <div className="name__top">Welcome to Owner {isAuthenticated().user.first_name}</div>
      <Navb component={<SignoutNav />} />
      <div className="CardContainer" style={{position:"relative",maxWidth: "28vw"}}>
      <div className="cards card1" style={{padding: "2px",
    position:" relative",left: "35vw",margin: "12px 0 12px"}}>
                  <div className="cardWrapper">
                    <div className="imgcontainer">
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "3.8em" }}
                      ></i>
                    </div>
                    <div className="dataconatiner">
                      <div className="textholder">Distributor</div>
                      <div className="dataholder">
                        {JSON.stringify(salesNum)}
                      </div>
                    </div>
                  </div>
                </div></div>
      <div className="FormSet">
        <div className="HeadingWrapper">
        <hr/>
          <h2>ADD Distributor</h2>
        </div>
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
                RegisterUser({ ...values, password2: password })
                  .then((data) => {
                    console.log(data)
                    if (data) {
                      //nav
                      console.log(data)
                      setvalues({ ...values, didNavigate: true,loading:false });
                      <Navigate to="/user/dashboard" />;
                    } else {
                      console.log(data)
                      setvalues({ ...values, loading: false });
                    }
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
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Unique Email Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div2">
                <Form.Group
                  size="sm"
                  controlId="formBasicPassword"
                  autoComplete="off"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={handleChange("password")}
                    size="sm"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Password required{" "}
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
                    value={username}
                    onChange={handleChange("username")}
                    size="sm"
                    type="username"
                    placeholder="Username"
                    autoComplete="off"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div5">
                {" "}
                <Form.Group>
                  <Form.Label>
                    System ({JSON.stringify(GetBillingInfo()["system_credit"])})
                  </Form.Label>
                  <Form.Control // Needs Constrint!!
                    onChange={handleChange("system_credit")}
                    size="sm"
                    type="text"
                    placeholder="System Credit"
                    required
                    isInvalid={
                      values.system_credit > GetBillingInfo().system_credit
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    System credit should be in 0-({GetBillingInfo().sms_credit}
                    ).
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div6">
                {" "}
                <Form.Group>
                  <Form.Label>
                    SMS ({JSON.stringify(GetBillingInfo()["sms_credit"])})
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("sms_credit")}
                    size="sm"
                    type="text"
                    placeholder="SMS credit"
                    required
                    isInvalid={
                      values.sms_credit > GetBillingInfo().sms_credit ||
                      values.sms_credit === 0
                    }
                    isValid={
                      values.sms_credit < GetBillingInfo().sms_credit &&
                      values.sms_credit > 0
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Sms credit should be in 0-({GetBillingInfo().sms_credit}).
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div7">
                {" "}
                <Form.Group>
                  <Form.Label>
                    Whatsapp (
                    {JSON.stringify(GetBillingInfo()["whatsapp_credit"])})
                  </Form.Label>
                  <Form.Control
                    onChange={handleChange("whatsapp_credit")}
                    size="sm"
                    type="text"
                    placeholder="Whatsapp Credit"
                    required
                    isInvalid={
                      values.whatsapp_credit > GetBillingInfo().whatsapp_credit
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Whatsapp credit should be in 0-(
                    {GetBillingInfo().whatsapp_credit}).
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div8">
                {" "}
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={phone}
                    onChange={handleChange("phone")}
                    size="sm"
                    type="text"
                    placeholder="Phone Number"
                    required
                    isInvalid={values.phone.length !== 10} //|| (values.phone.length < 10 && values.phone.length!==-1)   }
                    // isValid={ values.phone.length===10 ||values.phone.length ===0 }
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid phone number.
                    {values.phone.length}
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div9">
                {" "}
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={state}
                    onChange={handleChange("state")}
                    isInvalid={values.state === ""}
                    isValid={values.state !== ""}
                    required
                  >
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Select a state code!
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div10">
                {" "}
                <Form.Group>
                  <Form.Label>GST No.</Form.Label>
                  <Form.Control
                    value={GSTno}
                    onChange={handleChange("GSTno")}
                    size="sm"
                    type="text"
                    placeholder="GST Number"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid GST no.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div11">
                {" "}
                <Form.Group>
                  <Form.Label>Pan Card No.</Form.Label>
                  <Form.Control
                    value={pancardNo}
                    onChange={handleChange("pancardNo")}
                    size="sm"
                    type="text"
                    placeholder="Pancard number"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid Pan Card no.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div12">
                {" "}
                <Form.Group>
                  <Form.Label>KYC No.</Form.Label>
                  <Form.Control
                    value={KYC_no}
                    onChange={handleChange("KYC_no")}
                    size="sm"
                    type="text"
                    placeholder="KYC Number"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid KYC number.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </div>
              <div className="pad div13">
                {" "}
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={handleChange("address")}
                    size="sm"
                    type="text"
                    placeholder="Address"
                  />
                </Form.Group>{" "}
              </div>
              <div className="pad div14">
                {" "}
                <Form.Group>
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    value={reason}
                    onChange={handleChange("reason")}
                    as="textarea"
                  />
                </Form.Group>{" "}
              </div>
            </div>
            <div className="ButtonWrapper">
            <Button type="submit">Submit form
            {performNavigate()}
            </Button>
            </div>
          </Form>
        </div>
      </div>
      <FooterC />
    </>
  );
}
