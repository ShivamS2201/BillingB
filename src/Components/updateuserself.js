import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/updateuser.css";
import SignOut, {
  GetBillingInfo,
  UpdateUser,
  isAuthenticated,
  isAuthenticatedBilling,SignIn,authenticate
} from "../auth/authIndex";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export function Updater() {
  const [success,setSuccess] = useState(false)
  const [values, setvalues] = useState(isAuthenticated().user);
  const [didNavigate, SetNavigate] = useState(false);
  const [valuesBill, setBvalues] = useState(isAuthenticatedBilling());
  // {
  //     //For User Registeraion
  //     first_name: "",
  //     username: "",
  //     email: "",
  //     password: "",
  //     password2: "",
  //     role_id: 6,// its sales
  //     dist_ID_data:isAuthenticated().user.distID, // dist that made the sales which made this branch
  //     role_id_of_creator: isAuthenticated().user.role_id, // 5 i.e head Office
  //     creator_id:isAuthenticated().user.id, // Current user id
  //     sales_ID_data:isAuthenticated().user.salesid,
  //     // For Billing Info
  //     system_credit: 0,
  //     sms_credit: 0,
  //     whatsapp_credit: 0,
  //     phone: "",
  //     state: "",
  //     GSTno: "",
  //     pancardNo: "",
  //     KYC_no: "",
  //     address: "",
  //     reason: "",
  //     error: "",
  //     success: false,
  //     loading: false,
  //     didNavigate: false,
  //   });
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
    SetNavigate(false);
  }, [values]);
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
      SignOut(()=>{
        SignIn({ email, password })
        .then((data) => {
          if (data[0].token) {
            authenticate(data, () => {
              setvalues({ ...values, didNavigate: true });
              setSuccess(true)
            });
          } else {
            setvalues({ ...values, loading: false });
          }
        })
        .catch((e) => {
          console.log(e);
        });
        setTimeout(() => {
          setSuccess(false);
       }, 5000);
     })
      
    }
  };
  const { password, first_name, user_name, email } = values;
  const { landlineNUM } = valuesBill;
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
    if (name === "sms_credit") {
      if (event.target.value > GetBillingInfo().sms_credit) {
        setvalues({
          ...values,
          error: false,
          [name]: event.target.value === GetBillingInfo().sms_credit,
        });
      }
    }

    if (name === "landlineNUM") {
      if (
        event.target.value.slice(0) <= 9 ||
        event.target.value.slice(0) >= 0
      ) {
        setBvalues({
          ...valuesBill,
          error: false,
          [name]: event.target.value.slice(0, 10),
        });
      }
    } else {
      setvalues({ ...values, error: false, [name]: event.target.value });
    }
  };
  return (
    <>
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
                UpdateUser(values, valuesBill)
                  .then((response) => {
                    return response;
                  })
                  .then((data_1) => {
                    if (data_1) {
                      SetNavigate(true);
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
                    Unique Email Required{" "}
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
                    value={landlineNUM}
                    onChange={handleChange("landlineNUM")}
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
              <div
                className="pad div6"
                style={{ textAlign: "center", marginTop: "25px" }}
              >
                <Button type="submit">Update</Button>
                {performNavigate() }
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
