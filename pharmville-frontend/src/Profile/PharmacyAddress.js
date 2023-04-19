import React from "react";

const PharmacyAddress = ({ address }) => {
  return (
    <div>
      <h2>Address</h2>
      <p style={{color:"black"}}>
        {address.street}, {address.city}, {address.state} {address.zip}
      </p>
    </div>
  );
};

export default PharmacyAddress;
