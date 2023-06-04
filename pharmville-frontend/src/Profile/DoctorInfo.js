import React from "react";

const DoctorInfo = ({ doctorData }) => {
  return (
    <div>
      <h2>Doctor Information</h2>
      <p style={{color:"black"}}>
        <strong>Name:</strong> {doctorData.name} {doctorData.surname}
      </p>
      <p style={{color:"black"}}>
        <strong>Email:</strong> {doctorData.email}
      </p>
      <p style={{color:"black"}}>
        <strong>Speciality:</strong> {doctorData.speciality}
      </p>
      <p style={{color:"black"}}>
        <strong>Approval Status:</strong> {doctorData.approval_status}
      </p>
    </div>
  );
};

export default DoctorInfo;
