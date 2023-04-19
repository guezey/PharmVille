import React, { useState } from "react";
import PharmacyInfo from "./PharmacyInfo";
import PharmacyAddress from "./PharmacyAddress";
import PasswordChange from "./PasswordChange";
import AddExistingMedicine from "./AddExistingMedicine";
import AddProduct from "./AddProduct";
import UpdateStocks from "./UpdateStocks";
import DeleteProduct from "./DeleteProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const PharmacyProfile = () => {
  const [pharmacyData, setPharmacyData] = useState({
    name: "Healthy Pharmacy",
    onDuty: true,
    diplomaPath: "/path/to/diploma.pdf",
    balance: 1500,
    approvalStatus: "Approved",
    address: {
      id: 1,
      street: "456 Market St",
      city: "New York",
      state: "NY",
      zip: "10002",
    },
    password: "password123",
  });

  return (
    <Container>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <PharmacyInfo pharmacyData={pharmacyData} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <PharmacyAddress address={pharmacyData.address} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <PasswordChange />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <AddExistingMedicine />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <AddProduct />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <UpdateStocks />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <DeleteProduct />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PharmacyProfile;
