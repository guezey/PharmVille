import React from "react";

const PharmacyInfo = ({ pharmacyData }) => {
    return (
        <div>
            <h2>Pharmacy Information</h2>
            <p style={{color:"black"}}>
                <strong>Name:</strong> {pharmacyData.name}
            </p>
            <p style={{color:"black"}}>
                <strong>On Duty:</strong> {pharmacyData.is_on_duty ? "Yes" : "No"}
            </p>
            <p style={{color:"black"}}>
                <strong>Balance:</strong> ${pharmacyData.balance}
            </p>
            <p style={{color:"black"}}>
                <strong>Approval Status:</strong> {pharmacyData.approval_status}
            </p>
        </div>
    );
};

export default PharmacyInfo;
