import React from "react";

const PatientInfo = ({ patientData }) => {
  return (
    <div className="patient-info">
      <h2>Patient Information</h2>
      <p style={{color:"black"}}>
        Name: {patientData.name} {patientData.surname}
      </p>
      <p style={{color:"black"}}>Email: {patientData.email}</p>
      <p style={{color:"black"}}>TC National ID: {patientData.tcNationalId}</p>
    </div>
  );
};

export default PatientInfo;
