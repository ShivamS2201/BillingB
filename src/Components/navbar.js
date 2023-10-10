import React from "react";
import "./css/navbar.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const Navb = (props) => {
  const currentRoute = useLocation();
  return (
    (props.state === "headOffice" && (
      <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <Link to="/user/dashboard">
            <img
              alt="nothong"
              src={require("../assets/images/email-logo.png")}
              width="200"
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto" id="navHO">
          <Nav.Link
           href="/user/dashboard/headOffice/master"
           className={
             currentRoute.pathname.toLowerCase().includes("Branch")|| currentRoute.pathname.toLowerCase().includes("master")
               ? "masterHOactive"
               : "masterHO"
           }>
            Master
          </Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/customer"
            className={
              currentRoute.pathname.toLowerCase().includes("customer")
                ? "custHOactive"
                : "custHO"
            }>Customer</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/stock"
            className={
              currentRoute.pathname.toLowerCase().includes("stock")
                ? "stockHOactive"
                : "stockHO"
            }>Stock</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/receipt"
            className={
              currentRoute.pathname.toLowerCase().includes("receipt")
                ? "receiptHOactive"
                : "receiptHO"
            }>Receipt</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/payment"
            className={
              currentRoute.pathname.toLowerCase().includes("payment")
                ? "PaymentHOactive"
                : "PaymentHO"
            }>Payment</Nav.Link>
          <Nav.Link
            href="/user/dashboard/headOffice/bank"
            className={
              currentRoute.pathname.toLowerCase().includes("bank") || currentRoute.pathname.toLowerCase().includes("cash")

                ? "bankHOactive"
                : "bankHO"
            }
          >
            Bank
          </Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/place"
            className={
              currentRoute.pathname.toLowerCase().includes("place")
                ? "placeHOactive"
                : "placeHO"
            }>Place</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/sale"
            className={
              currentRoute.pathname.toLowerCase().includes("sale")
                ? "saleHOactive"
                : "saleHO"
            }>Sale</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/transport"
            className={
              currentRoute.pathname.toLowerCase().includes("transport")
                ? "transportHOactive"
                : "transportHO"
            }>Tranport</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/purchase"
            className={
              currentRoute.pathname.toLowerCase().includes("purchase")
                ? "PurchaseHOactive"
                : "PurchaseHO"
            }>Purchase</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/production"
            className={
              currentRoute.pathname.toLowerCase().includes("production")
                ? "ProudctionHOactive"
                : "ProudctionHO"
            }>Production</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/adjustment"
            className={
              currentRoute.pathname.toLowerCase().includes("adjustment")
                ? "adjustmentHOactive"
                : "adjustmentHO"
            }>Adjustment</Nav.Link>
          <Nav.Link href="/user/dashboard/headOffice/creddeb"
            className={
              currentRoute.pathname.toLowerCase().includes("creddeb")
                ? "CredDebHOactive"
                : "CredDebHO"
            }>Credit/Debit</Nav.Link>
        </Nav>
        {props.component}
      </Navbar>
    )) ||
    (props.state === "Branch" && (
      <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <Link to="/user/dashboard">
            <img
              alt="nothong"
              src={require("../assets/images/email-logo.png")}
              width="200"
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        {props.state}
        {props.component}
      </Navbar>
    )) || (
      <Navbar className="navbar_login">
        <Navbar.Brand href="#home">
          <Link to="/user/dashboard">
            <img
              alt="nothong"
              src={require("../assets/images/email-logo.png")}
              width="200"
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        {props.state}
        {props.component}
      </Navbar>
    )
  );
};

export default Navb;
