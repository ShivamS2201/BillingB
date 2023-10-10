import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Navb from "../Components/navbar";
import Card from "react-bootstrap/Card";
import {Navigate} from "react-router-dom";
import "./css/login.css";
import FooterC from "../Components/footer";
import { authenticate, isAuthenticated, SignIn } from "../auth/authIndex";
import Loader from "../Components/loader";
/// take on submit error messgae suucess mesg onsubit
const LOGIN = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didNavigate: false,
  });
  const { name, email, password, error, success, loading, didNavigate } =
    values;

    const loadingMsg=()=>{
      return (
        loading && 
          <Loader/>
      )
    }
  const successmsg = () => {
    return (
      <div>
        <div
          className="alert alert-danger"
          style={{ display: success ? "" : "none" }}
        >
          {" "}
          LOGGED IN
        </div>
      </div>
    );
  };
  const errormsg = () => {
    return (error &&
      <div>
        <div
          className="alert alert-danger"
          style={{ display: error ? "contents" : "none" }}
        >
          {" "}
          {error} Login Unsuccessful!
        </div>
      </div>
    );
  };
  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const performNavigate = ()=>{
    if(isAuthenticated()){
      return <Navigate to='/user/dashboard'/>
    }
  }
  return (
    <div className="LoginWrapper">
      {loadingMsg()}
      <Navb />
      <div className="BodyFooterContainer">
        <Card>
          <Card.Body>
            <div className="FormWrapper">
              {successmsg()}
              {errormsg()}
              <Form>
                <div className="TextPay">
                  <div className="HeadTP">WELCOME TO PAY</div>
                  <br />
                  (A PRODUCT OF MAPROLE)
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={handleChange("email")}
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <div className="ButtonLogin">
                  <div className="FoPass">Forgot Password ?</div>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setvalues({ ...values, error: false, loading: true });
                      SignIn({ email, password })
                        .then((data) => {
                          console.log("signin", data);
                          if (data[0].token){
                            authenticate(data,()=>{
                              console.log("token added");
                              setvalues({...values,didNavigate:true})
                            })
                          }
                          else{
                            setvalues({...values,loading:false})
                          }
                        })
                        .catch((e) => {
                          setvalues({...values,error:true,loading:false})
                          setTimeout(() => {
                            setvalues({...values,error:false});
                         }, 3000);
                          console.log("Error during login",e);
                        });
                    }}
                  >
                    LOGIN
                    {performNavigate()}
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
          <FooterC />
        </Card>
      </div>
    </div>
  );
};

export default LOGIN;
