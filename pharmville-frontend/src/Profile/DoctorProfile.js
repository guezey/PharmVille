import React, { useState } from "react";
import DoctorInfo from "./DoctorInfo";
import DoctorAddress from "./DoctorAddress";
import PasswordChange from "./PasswordChange";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState({
    name: "Dağhan",
    surname: "Ünal",
    email: "daghanunal20@gmail.com",
    speciality: "Cardiology",
    approvalStatus: "Approved",
    address: {
      id: 1,
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    password: "password123",
  });

  return (
    <Container>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <DoctorInfo doctorData={doctorData} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <DoctorAddress address={doctorData.address} />
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
    </Container>
  );
};

export default DoctorProfile;
