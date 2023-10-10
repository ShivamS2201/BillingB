import React, { useEffect, useState } from "react";
import { CustomerAdd, isAuthenticated } from "../../auth/authIndex";
import Navb from "../../Components/navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { Button, Form } from "react-bootstrap";
import "./css/addcustomer.css";
import { API } from "../../backend";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FooterC from "../../Components/footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// GST ISSUE needs resolution
export function Addcustomer() {
  const nav = useNavigate();
  const [stateChoice, SetStatechoice] = useState();
  const [Placemaster, SetPlacemaster] = useState();
  const [RegisterDtype, SetRegDealer] = useState();
  const [CurrencyData, setCurrency] = useState();
  const [groupdata, setGroup] = useState();
  const [Exporttypes, setExportTypes] = useState();
  const [values, setvalues] = useState({
    master_id: isAuthenticated().user.id,
    cust_name: "",
    cust_code: 0,
    Image: "",
    ImageUrl: "",
    cust_state_id: "",
    cust_pincode: "",
    cust_pan: "",
    cust_place: "",
    cust_group: "",
    cust_mobile: "",
    cust_landline: "",
    cust_email: "",
    address: "",
    cust_is_reg: "true",
    cust_dealer_type: "",
    cust_gst: "",
    cust_currency: "",
    export_option: "true",
    export_type: "",
    modified_by: `${isAuthenticated().user.id}`,
    status: true,
    error: false,
    loading: false,
    didNavigate: false,
  });
  const [Limit_values, setlimitvalues] = useState({
    is_limit: "true",
    amount: 0,
    cust_openingBalance: 0,
    user_id: isAuthenticated().user.id,
    sales_type: "Inter",
    rcm: true,
    cust_id: "",
  });
  let icon1 = require("../../assets/images/blackPerson.png");
  // const GSTvalidator = (NUM) => {
  //   const GSTREGEX = new RegExp(
  //     /^([0][1-9]|[1-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/
  //   );
  //   if (GSTREGEX.test(NUM)) {
  //     if (NUM.slice(0, 2) < 10) {
  //       console.log(NUM.slice(0, 2));
  //     } else {
  //       console.log(NUM.slice(0, 2));
  //     }
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const performNavigate = () => {
    if (values.didNavigate) {
      return <Navigate to="/user/dashboard/headOffice/customer" />;
    }
  };
  const handleChange = (name) => (event) => {
    if (name === "Image") {
      setvalues({
        ...values,
        ImageUrl: URL.createObjectURL(event.target.files[0]),
        Image: event.target.files[0],
      });
      console.log(values);
    }
    // else if (name === "cust_is_regular") {
    //   if(values.cust_is_reg==="on"){
    //     setvalues({ ...values, [name]:true });
    //   }
    // }
    else {
      setvalues({ ...values, [name]: event.target.value });
    }
  };
  const handleChangeLimit = (limit) => (event) => {
    // Keep amount as zero if limit is false
    setlimitvalues({ ...Limit_values, [limit]: event.target.value });
  };
  function states() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">State Name: *</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_state_id}
          onChange={handleChange("cust_state_id")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select State</option>
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
  function DealerType() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">
          Registered Dealer Type:
        </Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_dealer_type}
          onChange={handleChange("cust_dealer_type")}
          // isInvalid={}
          // isValid={values.state !== ""}
        >
          <option defaultValue>Select Dealer Type</option>
          {RegisterDtype.map((item, index) => (
            <option key={index} value={item.id}>
              {item.dealer_name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Dealer Type!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function Places() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">Place: * <Button style={{fontSize:"70%", padding:"0 1.3vw 0 1.3vw", borderRadius:"0"}} variant="danger"> <Link to="/user/dashboard/headOffice/addplace/" style={{textDecoration:"none", color:"white"}}>Add</Link></Button> </Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_place}
          onChange={handleChange("cust_place")}
          // isInvalid={values.state === ""}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Place</option>
          {Placemaster.map((item, index) => (
            <option key={index} value={item.id}>
              {item.place_name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function Currency() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">Currency: *</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_currency}
          onChange={handleChange("cust_currency")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Currency</option>
          {CurrencyData.map((item, index) => (
            <option key={index} value={item.id}>
              {item.type_C}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Currency code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  function Export() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">Export Type: *</Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.export_type}
          onChange={handleChange("export_type")}
          // isInvalid={}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Export</option>
          {Exporttypes.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a Currency code!
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
  function Groups() {
    return (
      <Form.Group>
        <Form.Label className="RowBoxHeading">Group: * <Button style={{fontSize:"70%", padding:"0 1.3vw 0 1.3vw", borderRadius:"0"}} variant="danger"><Link to="/user/dashboard/headOffice/addplace/" style={{textDecoration:"none", color:"white"}}>Add</Link></Button> </Form.Label>
        <Form.Select
          size="md"
          aria-label="Default select example"
          value={values.cust_group}
          onChange={handleChange("cust_group")}
          // isInvalid={values.state === ""}
          // isValid={values.state !== ""}
          required
        >
          <option defaultValue>Select Group</option>
          {groupdata.map((item, index) => (
            <option key={index} value={item.id}>
              {item.cust_grp}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Select a state code!
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
  const getDealerType = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/customer/RegisterDealer`, {
        method: "GET",
      });
      const data = await resp.json();
      SetRegDealer(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getPlacebymaster = async () => {
    try {
      const resp = await fetch(
        `${API}bill/bank/HO/getplaces/${isAuthenticated().user.id}`,
        {
          method: "GET",
        }
      );
      const data = await resp.json();
      SetPlacemaster(data);
      return data;
    } catch (err) {
      console.log(err);
    }
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCurrency = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/fetchcurrency/`, {
        method: "GET",
      });
      const data = await resp.json();
      setCurrency(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getExport = async () => {
    try {
      const resp = await fetch(`${API}bill/bank/HO/fetchExport/`, {
        method: "GET",
      });
      const data = await resp.json();
      setExportTypes(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
    getState();
    getPlacebymaster();
    getDealerType();
    getCurrency();
    fetchGroup();
    getExport();
  }, []);
  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>

      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Add Customer Master</h3>
        </div>
      </div>
      <div className="FormSet">
        <div className="Formhandlercust">
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
                CustomerAdd(values,Limit_values).then((data) => {
                  if (data) {
                    console.log(data);
                    setvalues({
                      ...values,
                      didNavigate: true,
                      loading: false,
                    });
                    <Navigate to="/user/dashboard/headOffice/customer" />
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
            <Container fluid="lg" className="Container">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Customer Name: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_name")} // add change condition and function call to check for uniqueness from backend.
                      size="lg"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      isInvalid={/^\d+$/.test(values.cust_name)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Bank Name Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading TopMargin">
                      Code: *
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("cust_code")} // add change condition and function call to check for uniqueness from backend.
                      size="lg"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      // isInvalid={/^\d+$/.test(values.cust_code)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Code Incorrect
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="RowBoxHeading TopMargin">
                      Upload Image
                    </Form.Label>
                    <Form.Control
                      style={{ marginTop: "1vh" }}
                      size="md"
                      type="file"
                      accept="image/*"
                      onChange={handleChange("Image")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {values.Image && values.ImageUrl && (
                    <>
                      <Image
                        className="TopMargin"
                        required
                        src={`${values.ImageUrl}`}
                        height="150px"
                        width="150px"
                        style={{ border: "2px solid #4a4d9a" }}
                        xs={6}
                        md={4}
                      />
                    </>
                  )}
                  {!values.Image && !values.ImageUrl && (
                    <>
                      <Image
                        className="TopMargin"
                        src={icon1}
                        height="150px"
                        width="150px"
                        style={{ border: "2px solid #4a4d9a" }}
                        xs={6}
                        md={4}
                      />
                    </>
                  )}
                </Col>
              </Row>
              <Row className="RowBoxHeading TopMargin">Address :</Row>
              <Row className="AddressContainer">
                <Row className="TopMargin">
                  <Col>{stateChoice && states()}</Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Pin Code: *
                      </Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_pincode")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        // isInvalid={/^\d+$/.test(values.cust_code)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>{Placemaster && Places()}</Col>
                </Row>

                <Col>
                  <Form.Group>
                    <Form.Label className="RowBoxHeading">
                      Address: * (Maximum Characters: 100)
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange("address")} // add change condition and function call to check for uniqueness from backend.
                      size="lg"
                      type="input"
                      className="form-control"
                      placeholder=""
                      required
                      isInvalid={values.address.length > 100}
                    />
                    <Form.Control.Feedback type="invalid">
                      Address Cannot Exceed 100 Characters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="RowBoxHeading TopMargin">Contact Details :</Row>
              <Row className="AddressContainer">
                <Row className="TopMargin">
                  <Col>
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Mobile Number: *
                      </Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_mobile")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        isInvalid={values.cust_mobile.length > 10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Landline No.:
                      </Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_landline")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        type="input"
                        className="form-control"
                        placeholder=""
                        isInvalid={values.cust_landline.length > 10}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid Number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Email: *
                      </Form.Label>
                      <Form.Control
                        onChange={handleChange("cust_email")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        type="input"
                        className="form-control"
                        placeholder=""
                        required
                        // isInvalid={values.cust_landline}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
              <Row className="RowBoxHeading TopMargin">
                Registeration Details:
              </Row>
              <Row className="AddressContainer">
                <Row>
                  <Row className="TopMargin">
                    <Col>
                      <Form.Group>
                        <Form.Label className="RowBoxHeading">
                          Pan No.: *
                        </Form.Label>
                        <Form.Control
                          onChange={handleChange("cust_pan")} // add change condition and function call to check for uniqueness from backend.
                          size="md"
                          type="input"
                          className="form-control"
                          placeholder=""
                          required
                          isInvalid={values.cust_pan.length > 10}
                        />
                        <Form.Control.Feedback type="invalid">
                          Invalid pan
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Row className="RowBoxHeading">Is Registered Dealer :</Row>
                      <Row
                        style={{ transform: "scale(0.9)", marginTop: "12px" }}
                      >
                        <Col xs={2}>
                          <Form.Check
                            inline
                            value={true}
                            label="Yes"
                            name="group1"
                            type="radio"
                            checked={values.cust_is_reg === "true"}
                            onChange={handleChange("cust_is_reg")}
                            id={`inline-radio-1`}
                          />
                        </Col>
                        <Col xs={2}>
                          <Form.Check
                            inline
                            value={false}
                            label="No"
                            name="group1"
                            type="radio"
                            onChange={handleChange("cust_is_reg")}
                            id={`inline-radio-2`}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {values.cust_is_reg === "true" && (
                    <>
                      <Row className="DealerSelection">
                        <Col>{RegisterDtype && DealerType()}</Col>
                        <Col>
                          <Form.Group>
                            <Form.Label className="RowBoxHeading">
                              Enter GST Number:
                            </Form.Label>
                            <Form.Control
                              onChange={handleChange("cust_gst")} // add change condition and function call to check for uniqueness from backend.
                              size="md"
                              type="input"
                              className="form-control"
                              placeholder="GST number"
                              isInvalid={values.error && values.Etype === "GST"}
                            />
                            <Form.Control.Feedback type="invalid">
                              GST number Invalid !
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}
                  {values.cust_is_reg === "false" && (
                    <div className="DealerSelectionf"> </div>
                  )}
                </Row>
              </Row>
              <Row className="RowBoxHeading TopMargin">Customer Balance:</Row>

              <Row className="AddressContainer TopMargin">
                <Row>
                  <Col className="RowBoxHeading" style={{ marginTop: "12px" }}>
                    Is Limit Applicable: *
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <Row style={{ transform: "scale(0.9)" }}>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={true}
                          label="Yes"
                          name="group2"
                          type="radio"
                          checked={Limit_values.is_limit === "true"}
                          onChange={handleChangeLimit("is_limit")}
                          id={`inline-radio-1`}
                        />
                      </Col>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={false}
                          label="No"
                          name="group2"
                          type="radio"
                          onChange={handleChangeLimit("is_limit")}
                          id={`inline-radio-2`}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {Limit_values.is_limit === "true" && (
                    <>
                      <Col xs={4} className="OBDiv">
                        <Form.Group>
                          <Form.Label className="RowBoxHeading">
                            Enter Amount : (₹)
                          </Form.Label>
                          <Form.Control
                            onChange={handleChangeLimit("amount")} // add change condition and function call to check for uniqueness from backend.
                            size="md"
                            type="input"
                            className="form-control"
                            placeholder=""
                            isInvalid={Limit_values.amount.length > 10}
                          />
                          <Form.Control.Feedback type="invalid">
                            Invalid Amount
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </>
                  )}

                  <Col
                    xs={4}
                    className={
                      Limit_values.is_limit === "false" ? "OPBDIV" : ""
                    }
                  >
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Opening Balance : (₹)
                      </Form.Label>
                      <Form.Control
                        onChange={handleChangeLimit("cust_openingBalance")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        type="input"
                        className="form-control"
                        placeholder=""
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid Amount
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="TopMargin">
                  {CurrencyData && (
                    <>
                      <Col>{Currency()}</Col>
                      <Col>{groupdata && Groups()}</Col>
                    </>
                  )}
                </Row>
                <Row className="TopMargin">
                  <Col className="RowBoxHeading">Export: *</Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <Row style={{ transform: "scale(0.9)" }}>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={true}
                          label="Yes"
                          name="group3"
                          type="radio"
                          checked={values.export_option === "true"}
                          onChange={handleChange("export_option")}
                          id={`inline-radio-1`}
                        />
                      </Col>
                      <Col xs={2}>
                        <Form.Check
                          inline
                          value={false}
                          label="No"
                          name="group3"
                          type="radio"
                          onChange={handleChange("export_option")}
                          id={`inline-radio-2`}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {values.export_option === "true" && (
                    <>
                      <Col xs={4} className="OBDiv">
                        {Exporttypes && Export()}
                      </Col>
                    </>
                  )}

                  <Col
                    xs={4}
                    className={values.export_option === "false" ? "OPBDIV" : ""}
                  >
                    <Form.Group>
                      <Form.Label className="RowBoxHeading">
                        Type of Sales : *
                      </Form.Label>
                      <Form.Control
                        onChange={handleChangeLimit("sales_type")} // add change condition and function call to check for uniqueness from backend.
                        size="md"
                        value={Limit_values.sales_type}
                        type="input"
                        disabled
                        className="form-control"
                        placeholder=""
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid Amount
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
              <Row>
              <Col md={{ span: 6, offset: 6 }}>
                </Col>
              </Row>
              <Row className="ButtonsForm">
                <Col xs={1}>
                <Button type="submit" onClick={()=>{nav(-1)}} >Back</Button>
                </Col>
                <Col xs={1}>
                <Button type="submit" >Save</Button> 
                {performNavigate()}
                </Col>
              </Row>
            </Container>
           
          </Form>
        </div>
        <div></div>
      </div>
      {/* {JSON.stringify(values)}
      {JSON.stringify(Limit_values)} */}
      <FooterC />
    </>
  );
}
