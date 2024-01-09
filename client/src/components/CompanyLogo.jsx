import React from "react";
import { Image } from "react-bootstrap";

const CompanyLogo = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Image
        src="images/company-logo.jpg"
        alt="Aviokompanija Logo"
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </div>
  );
};

export default CompanyLogo;
