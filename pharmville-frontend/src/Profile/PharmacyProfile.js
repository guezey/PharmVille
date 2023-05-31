import React, { useState, useEffect } from "react";
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
  const [pharmacyData, setPharmacyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL with your Flask backend endpoint for pharmacy profile
    fetch('http://localhost:5000/api/pharmacy_profile')
      .then(response => response.json())
      .then(data => {
        setPharmacyData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!pharmacyData) return <p>Error loading pharmacy data</p>;

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
