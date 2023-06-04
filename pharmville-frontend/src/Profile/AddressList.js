import React, { useState } from 'react';
import AddressModal from './AddressModal';
import "./Profile.css"

const AddressList = ({ addresses, setPatientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (newAddress) => {
    setPatientData((prevState) => ({
      ...prevState,
      addresses: [...prevState.addresses, { ...newAddress, id: Date.now() }],
    }));
  };

  const handleDeleteAddress = (id) => {
    setPatientData((prevState) => ({
      ...prevState,
      addresses: prevState.addresses.filter((address) => address.id !== id),
    }));
  };

  return (
    <div className="address-list">
      <h2>Addresses</h2>
      <div class="container">
      <ul style={{color:"black"}} class="addressUL">
        {addresses.map((address) => (
          <li key={address.id}>
            {address.name}: {address.address_field}, {address.address_field_2}, {address.city} {address.country} {address.postal_code}
            <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      <button onClick={() => setIsModalOpen(true)}>Add Address</button>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
};

export default AddressList;
