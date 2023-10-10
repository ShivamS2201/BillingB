import React from "react";
import { Card } from "react-bootstrap";


const FooterC = () => {
  return (
    <div className="BodyFooterContainer" style={{position: "static",
      left: "0",
      bottom: "0",
      width: "100%"}}>
      <Card>
        <Card.Footer>
          COPYRIGHT ©2017 - Click Pe Bill - All rights reserved <br />
          MADE BY MAPROLE
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FooterC