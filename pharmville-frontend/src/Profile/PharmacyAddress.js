import React from "react";

const PharmacyAddress = ({ address }) => {
  return (
    <div>
      <h2>Address</h2>
      <p style={{color:"black"}}>
        {address.city}, {address.country}, {address.address_field} {address.address_field_2}, {address.postal_code}
      </p>
    </div>
  );
};

export default PharmacyAddress;
