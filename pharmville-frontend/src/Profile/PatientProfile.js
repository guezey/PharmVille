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
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching patient data
    fetch('http://localhost:5000/patient', {credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        setPatientData(data);
        if (!addressData) setLoading(false); // Only stop loading if addressData has been fetched too
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });

    // Fetching address data
    fetch('http://localhost:5000/address', {credentials: 'include'})
      .then(response => response.json())
      .then(data => {
        setAddressData(data);
        if (!patientData) setLoading(false); // Only stop loading if patientData has been fetched too
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!patientData) return <p>Error loading patient data</p>;

  if (!addressData) return <p>Error loading address data</p>;

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
            <AddressList addresses={addressData} />
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
