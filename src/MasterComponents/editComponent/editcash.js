import React, { useEffect, useState } from "react";
import { EditCashHO, isAuthenticated } from "../../auth/authIndex";
import Navb from "../../Components/navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { Button, Form } from "react-bootstrap";
// import "./css/addbank.css";
import { API } from "../../backend";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FooterC from "../../Components/footer";

// GST ISSUE needs resolution
export function EditCash() {
    const {id} = useParams();
    const nav = useNavigate();
    const [values, setvalues] = useState({
        user_id:isAuthenticated().user.id,
        cash_name : "",
        cash_balance:0
    });
    const FecthEditcash =async () => {
        await fetch(`${API}bill/bank/HO/fetchcash/${id}`, { // put user id here!!!
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
    const performNavigate = () => {
        if (values.didNavigate) {
          return <Navigate to="/user/dashboard/headOffice/bank" />;
        }
      };

      const handleChange = (name) => (event) => {
        if (name === "cash_balance"){
            if ((event.target.value.slice(event.target.value.length-1,event.target.value.length) <=9 || event.target.value.slice(event.target.value.length-1,event.target.value.length) >= 0) ){
                console.log(values,event.target.value)
                if (values.cash_balance.length < 11){
                    setvalues({ ...values, error: false, [name]: event.target.value,errormsg:""});    
                }
                else{
                    setvalues({ ...values, error: true,[name]: event.target.value, errormsg:"Cash balance Cannot exceed limit."});
                }
                }
                else{
                    setvalues({ ...values, error: true,[name]: event.target.value, errormsg:"Enter Numerical Value."});
                }
        }
        else{
            setvalues({ ...values, error: false, [name]: event.target.value });

        }
      };
      const [validated, setValidated] = useState(false);
      useEffect(() => {
        FecthEditcash();
        setValidated(false);
      }, []);
    return(<>
    <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />

      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Edit Cash Master</h3>
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
               EditCashHO(values)
                  .then((data) => {
                    if (data) {
                      console.log(data);
                      setvalues({
                        ...values,
                        didNavigate: true,
                        loading: false,
                      });
                      <Navigate to="/user/dashboard/headOffice/cash" />
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
                  <Form.Label>Cash Name :</Form.Label>
                  <Form.Control
                    onChange={handleChange("cash_name")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Cash Name"
                    required
                    value={values.cash_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Cash Name Required{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="pad div2">
                <Form.Group>
                  <Form.Label>Cash Balance :</Form.Label>
                  <Form.Control
                    onChange={handleChange("cash_balance")} // add change condition and function call to check for uniqueness from backend.
                    size="sm"
                    type="input"
                    className="form-control"
                    placeholder="Cash Balance"
                    required
                    value={values.cash_balance}
                    isInvalid = {values.error && (values.errormsg ==="Cash balance Cannot exceed limit." || values.errormsg ==="Enter Numerical Value.")}
                  />
                  <Form.Control.Feedback type="invalid">
                  {values.errormsg && <>{values.errormsg}</>} 
                   
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="ButtonWrapper pad div4">
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
              {JSON.stringify(values)}
          </Form>
        </div>
        <div></div>
      </div>
      <FooterC/>
    </>);}