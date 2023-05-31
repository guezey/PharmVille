import React, { useState, useEffect } from "react";
import PatientInfo from "./PatientInfo";
import AddressList from "./AddressList";
import PasswordChange from "./PasswordChange";
import MedicineHistory from "./MedicineHistory";
import Orders from "./Orders";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const PatientProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL with your Flask backend endpoint
    fetch('http://localhost:5000/api/patient_profile')
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!patientData) return <p>Error loading patient data</p>;
  
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
