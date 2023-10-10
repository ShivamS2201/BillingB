import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddMessageRequest, isAuthenticated } from "../auth/authIndex";
import Navb from "./navbar";
import { SignoutNav } from "../UserView/singoutnav";
import FooterC from "./footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CHILD from "./MultiSelect";
import { API } from "../backend";

export default function AddMessage() {
  const [dist, setdist] = useState();
  const [HO, setHO] = useState();
  const [Br, setBr] = useState();
  const [sales, setsales] = useState();
  const [distlist, setdistlist] = useState([]);
  const [saleslist, setsaleslist] = useState([]);
  const [HOlist, setHolist] = useState([]);
  const [Brlist, setBrlist] = useState([]);

  const distref = useRef();
  const salesref = useRef();
  const HOref = useRef();
  const Brref = useRef();

  const GetChildstate = (name) => (event) => {
    event.preventDefault();
    if (name === "dist") {
      const childstate = distref.current.getchildstate();
      setmsg({ ...msg, dist: [...childstate] });
    } else if (name === "sales") {
      const childstate = salesref.current.getchildstate();
      setmsg({ ...msg, sales: [...childstate] });
    } else if (name === "headO") {
      const childstate = HOref.current.getchildstate();
      setmsg({ ...msg, HO: [...childstate] });
    } else if (name === "BR") {
      const childstate = Brref.current.getchildstate();
      setmsg({ ...msg, Br: [...childstate] });
    }
  };
  //
  const SalesData = async () => {
    await fetch(
      `${API}user/register/salesHOdropdown/${isAuthenticated().user.id}/${4}`,
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
      `${API}user/register/distdropdown/${isAuthenticated().user.id}/${3}`,
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
  const HOData = async () => {
    await fetch(
      `${API}user/register/distdropdown/${isAuthenticated().user.id}/${5}`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setHO(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const BRdata = async () => {
    await fetch(
      `${API}user/register/msgbrdropdown/${isAuthenticated().user.id}/${6}`,
      {
        method: "GET",
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setBr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    SalesData();
    DistData();
    HOData();
    BRdata();
  }, []);
  const currentRoute = useLocation();

  const [msg, setmsg] = useState({ msg: "", UIden: "" });

  const handleChange = (name) => (event) => {
    setmsg({ ...msg, [name]: event.target.value });
  };

  const SendMsg = (name) => (event)=>{
    if(msg.dist.length===0 && msg.sales.length===0 && msg.HO.length===0 &&msg.Br.length===0){
      alert("Atleast one recipient is required.")
    }
    else{
      alert(msg.UIden + " Sent to " + msg.dist.length + " Distribtuor "+
msg.sales.length + " Sales " +
msg.HO.length+ " Head Office "+
msg.Br.length+ " Branch " )

if(name === "SMS"){
  var ret = AddMessageRequest(msg,isAuthenticated().user.id,name)  
}
else if(name === "WHATSAPP"){
  var ret = AddMessageRequest(msg,isAuthenticated().user.id,name)
}
else if(name === "EMAIL"){
  var ret = AddMessageRequest(msg,isAuthenticated().user.id,name)
}else if(name === "MOS"){
  // var ret = AddMessageRequest(msg,isAuthenticated().user.id)
}
}
  }
  return (
    <>
      <div className="name__top">
        Welcome to Owner {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} />
      {currentRoute.pathname.toLowerCase().includes("sms") && (
        <>
          <Form style={{ margin: "7vw 7vw 2vw 7vw" }}>
            <Container fluid>
              <Row>
                <Col xs={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <div
                        style={{
                          fontWeight: "600",
                          display: "inline",
                          fontSize: "18px",
                        }}
                      >
                        Message Body
                      </div>
                      ({500 - msg.msg.length})
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      isInvalid={msg.msg.length > 499}
                      onChange={handleChange("msg")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        <div
                          style={{
                            fontWeight: "600",
                            display: "inline",
                            fontSize: "18px",
                          }}
                        >
                          Message Identifier
                        </div>
                        ({100 - msg.UIden.length})
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Message Subject"
                        isInvalid={msg.UIden.length > 99}
                        onChange={handleChange("UIden")}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: "0 0vw 0 0vw" }}>
                    <Button type="alert" size="md">
                      Insert Standard Message
                    </Button>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Form.Label>
                  <div
                    style={{
                      fontWeight: "600",
                      display: "inline",
                      fontSize: "18px",
                    }}
                  >
                    Send To <i class="bi bi-arrow-right-circle"></i>
                  </div>
                </Form.Label>
              </Row>
              {dist && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Distributors
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={distref}
                      options={dist}
                      value={distlist}
                      onChange={setdistlist}
                      type={"Distributor"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("dist")}>
                      Fix Recipients
                    </Button>
                    {"dist" in msg && msg.dist.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {sales && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Sales</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={salesref}
                      options={sales}
                      value={saleslist}
                      onChange={setsaleslist}
                      type={"Sales"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("sales")}>
                      Fix Recipients
                    </Button>
                    {"sales" in msg && msg.sales.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}

              {HO && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Head Office
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={HOref}
                      options={HO}
                      value={HOlist}
                      onChange={setHolist}
                      type={"Head Office"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("headO")}>
                      Fix Recipients
                    </Button>
                    {"HO" in msg && msg.HO.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {Br && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Branch</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={Brref}
                      options={Br}
                      value={Brlist}
                      onChange={setBrlist}
                      type={"Branch"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("BR")}>
                      Fix Recipients
                    </Button>
                    {"Br" in msg && msg.Br.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}

                  </Col>
                </Row>
              )}
              <Row style={{marginTop:"5vh"}}>
                <Col xs={{offset:"9"}} >
                <Button style={{margin:" 0 -6vw 0 1vw"}} onClick={SendMsg("SMS")}> Send Message</Button> 
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      )}
      {currentRoute.pathname.toLowerCase().includes("whatsapp") && (
        <>
          <Form style={{ margin: "7vw 7vw 2vw 7vw" }}>
            <Container fluid>
              <Row>
                <Col xs={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <div
                        style={{
                          fontWeight: "600",
                          display: "inline",
                          fontSize: "18px",
                        }}
                      >
                        Message Body
                      </div>
                      ({500 - msg.msg.length})
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      isInvalid={msg.msg.length > 499}
                      onChange={handleChange("msg")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        <div
                          style={{
                            fontWeight: "600",
                            display: "inline",
                            fontSize: "18px",
                          }}
                        >
                          Message Identifier
                        </div>
                        ({100 - msg.UIden.length})
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Message Subject"
                        isInvalid={msg.UIden.length > 99}
                        onChange={handleChange("UIden")}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: "0 0vw 0 0vw" }}>
                    <Button type="alert" size="md">
                      Insert Standard Message
                    </Button>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Form.Label>
                  <div
                    style={{
                      fontWeight: "600",
                      display: "inline",
                      fontSize: "18px",
                    }}
                  >
                    Send To <i class="bi bi-arrow-right-circle"></i>
                  </div>
                </Form.Label>
              </Row>
              {dist && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Distributors
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={distref}
                      options={dist}
                      value={distlist}
                      onChange={setdistlist}
                      type={"Distributor"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("dist")}>
                      Fix Recipients
                    </Button>
                    {"dist" in msg && msg.dist.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {sales && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Sales</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={salesref}
                      options={sales}
                      value={saleslist}
                      onChange={setsaleslist}
                      type={"Sales"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("sales")}>
                      Fix Recipients
                    </Button>
                    {"sales" in msg && msg.sales.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}

              {HO && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Head Office
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={HOref}
                      options={HO}
                      value={HOlist}
                      onChange={setHolist}
                      type={"Head Office"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("headO")}>
                      Fix Recipients
                    </Button>
                    {"HO" in msg && msg.HO.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {Br && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Branch</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={Brref}
                      options={Br}
                      value={Brlist}
                      onChange={setBrlist}
                      type={"Branch"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("BR")}>
                      Fix Recipients
                    </Button>
                    {"Br" in msg && msg.Br.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}

                  </Col>
                </Row>
              )}
              <Row style={{marginTop:"5vh"}}>
                <Col xs={{offset:"9"}} >
                <Button style={{margin:" 0 -6vw 0 1vw"}} onClick={SendMsg("WHATSAPP")}> Send Message</Button> 
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      )}
      {currentRoute.pathname.toLowerCase().includes("email") && (
        <>
          <Form style={{ margin: "7vw 7vw 2vw 7vw" }}>
            <Container fluid>
              <Row>
                <Col xs={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <div
                        style={{
                          fontWeight: "600",
                          display: "inline",
                          fontSize: "18px",
                        }}
                      >
                        Message Body
                      </div>
                      ({500 - msg.msg.length})
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      isInvalid={msg.msg.length > 499}
                      onChange={handleChange("msg")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        <div
                          style={{
                            fontWeight: "600",
                            display: "inline",
                            fontSize: "18px",
                          }}
                        >
                          Message Identifier
                        </div>
                        ({100 - msg.UIden.length})
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Message Subject"
                        isInvalid={msg.UIden.length > 99}
                        onChange={handleChange("UIden")}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: "0 0vw 0 0vw" }}>
                    <Button type="alert" size="md">
                      Insert Standard Message
                    </Button>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Form.Label>
                  <div
                    style={{
                      fontWeight: "600",
                      display: "inline",
                      fontSize: "18px",
                    }}
                  >
                    Send To <i class="bi bi-arrow-right-circle"></i>
                  </div>
                </Form.Label>
              </Row>
              {dist && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Distributors
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={distref}
                      options={dist}
                      value={distlist}
                      onChange={setdistlist}
                      type={"Distributor"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("dist")}>
                      Fix Recipients
                    </Button>
                    {"dist" in msg && msg.dist.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {sales && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Sales</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={salesref}
                      options={sales}
                      value={saleslist}
                      onChange={setsaleslist}
                      type={"Sales"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("sales")}>
                      Fix Recipients
                    </Button>
                    {"sales" in msg && msg.sales.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}

              {HO && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Head Office
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={HOref}
                      options={HO}
                      value={HOlist}
                      onChange={setHolist}
                      type={"Head Office"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("headO")}>
                      Fix Recipients
                    </Button>
                    {"HO" in msg && msg.HO.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {Br && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Branch</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={Brref}
                      options={Br}
                      value={Brlist}
                      onChange={setBrlist}
                      type={"Branch"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("BR")}>
                      Fix Recipients
                    </Button>
                    {"Br" in msg && msg.Br.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}

                  </Col>
                </Row>
              )}
              <Row style={{marginTop:"5vh"}}>
                <Col xs={{offset:"9"}} >
                <Button style={{margin:" 0 -6vw 0 1vw"}} onClick={SendMsg("EMAIL")}> Send Message</Button> 
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      )}
      {currentRoute.pathname.toLowerCase().includes("mos") && (
        <>
          <Form style={{ margin: "7vw 7vw 2vw 7vw" }}>
            <Container fluid>
              <Row>
                <Col xs={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <div
                        style={{
                          fontWeight: "600",
                          display: "inline",
                          fontSize: "18px",
                        }}
                      >
                        Message Body
                      </div>
                      ({500 - msg.msg.length})
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      isInvalid={msg.msg.length > 499}
                      onChange={handleChange("msg")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>
                        <div
                          style={{
                            fontWeight: "600",
                            display: "inline",
                            fontSize: "18px",
                          }}
                        >
                          Message Identifier
                        </div>
                        ({100 - msg.UIden.length})
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Message Subject"
                        isInvalid={msg.UIden.length > 99}
                        onChange={handleChange("UIden")}
                      />
                    </Form.Group>
                  </Row>
                  <Row style={{ margin: "0 0vw 0 0vw" }}>
                    <Button type="alert" size="md">
                      Insert Standard Message
                    </Button>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Form.Label>
                  <div
                    style={{
                      fontWeight: "600",
                      display: "inline",
                      fontSize: "18px",
                    }}
                  >
                    Send To <i class="bi bi-arrow-right-circle"></i>
                  </div>
                </Form.Label>
              </Row>
              {dist && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Distributors
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={distref}
                      options={dist}
                      value={distlist}
                      onChange={setdistlist}
                      type={"Distributor"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("dist")}>
                      Fix Recipients
                    </Button>
                    {"dist" in msg && msg.dist.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {sales && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Sales</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={salesref}
                      options={sales}
                      value={saleslist}
                      onChange={setsaleslist}
                      type={"Sales"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("sales")}>
                      Fix Recipients
                    </Button>
                    {"sales" in msg && msg.sales.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}

              {HO && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>
                    Head Office
                  </Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={HOref}
                      options={HO}
                      value={HOlist}
                      onChange={setHolist}
                      type={"Head Office"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("headO")}>
                      Fix Recipients
                    </Button>
                    {"HO" in msg && msg.HO.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}
                  </Col>
                </Row>
              )}
              {Br && (
                <Row>
                  <Form.Label style={{ marginTop: "12px" }}>Branch</Form.Label>
                  <Col xs={10}>
                    <CHILD
                      ref={Brref}
                      options={Br}
                      value={Brlist}
                      onChange={setBrlist}
                      type={"Branch"}
                    />
                  </Col>
                  <Col>
                    <Button onClick={GetChildstate("BR")}>
                      Fix Recipients
                    </Button>
                    {"Br" in msg && msg.Br.length > 0 &&
                    <i style={{margin:"0 0 0 10px",fontSize:"20px",color:"green"}} class="bi bi-check-circle"></i>}

                  </Col>
                </Row>
              )}
              <Row style={{marginTop:"5vh"}}>
                <Col xs={{offset:"9"}} >
                <Button style={{margin:" 0 -6vw 0 1vw"}} onClick={SendMsg("MOS")}> Send Message</Button> 
                </Col>
              </Row>
            </Container>
          </Form>
        </>
      )}
{JSON.stringify(msg)}
      <FooterC />
    </>
  );
}
