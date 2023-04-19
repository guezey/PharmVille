import React from "react";

const PharmacyInfo = ({ pharmacyData }) => {
    return (
        <div>
            <h2>Pharmacy Information</h2>
            <p style={{color:"black"}}>
                <strong>Name:</strong> {pharmacyData.name}
            </p>
            <p style={{color:"black"}}>
                <strong>On Duty:</strong> {pharmacyData.onDuty ? "Yes" : "No"}
            </p>
            <p style={{color:"black"}}>
                <strong>Diploma Path:</strong> {pharmacyData.diplomaPath}
            </p>
            <p style={{color:"black"}}>
                <strong>Balance:</strong> ${pharmacyData.balance}
            </p>
            <p style={{color:"black"}}>
                <strong>Approval Status:</strong> {pharmacyData.approvalStatus}
            </p>
        </div>
    );
};

export default PharmacyInfo;
