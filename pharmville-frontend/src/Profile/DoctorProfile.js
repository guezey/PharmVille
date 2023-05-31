import React, { useState, useEffect } from "react";
import DoctorInfo from "./DoctorInfo";
import DoctorAddress from "./DoctorAddress";
import PasswordChange from "./PasswordChange";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const DoctorProfile = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL with your Flask backend endpoint for doctor profile
    fetch('http://localhost:5000/api/doctor_profile')
      .then(response => response.json())
      .then(data => {
        setDoctorData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!doctorData) return <p>Error loading doctor data</p>;

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
