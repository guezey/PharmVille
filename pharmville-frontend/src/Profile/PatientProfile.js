import React, { useState } from "react";
import PatientInfo from "./PatientInfo";
import AddressList from "./AddressList";
import PasswordChange from "./PasswordChange";
import MedicineHistory from "./MedicineHistory";
import Orders from "./Orders";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const PatientProfile = () => {
  const [patientData, setPatientData] = useState({
    name: "Dağhan",
    surname: "Ünal",
    email: "daghanunal20@gmail.com",
    tcNationalId: "12345678901",
    addresses: [
      {
        id: 1,
        street: "9048",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      {
        id: 2,
        street: "9048",
        city: "Ankara",
        state: "Çankaya",
        zip: "06000",
      },
    ],
    password: "password123",
    medicineHistory: [
      {
        id: 1,
        name: "Aspirin",
        dose: "81 mg",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
      },
      {
        id: 2,
        name: "Ibuprofen",
        dose: "200 mg",
        startDate: "2022-01-01",
        endDate: "2022-06-30",
      },
    ],
    orders: [
      {
        id: 1,
        medication: "Lisinopril",
        quantity: "30",
        dateOrdered: "2023-01-01",
      },
      {
        id: 2,
        medication: "Metformin",
        quantity: "60",
        dateOrdered: "2023-01-01",
      },
    ],  
  });

  return (
    <Container>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <PatientInfo patientData={patientData} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <AddressList addresses={patientData.addresses} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <MedicineHistory medicineHistory={patientData.medicineHistory} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="bg-light p-4 mb-4 text-dark text-left">
            <Orders orders={patientData.orders} />
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

export default PatientProfile;
