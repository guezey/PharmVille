import React, { useState } from 'react';
import AddressModal from './AddressModal';
import "./Profile.css"

const AddressList = ({ addresses = [], setAddressData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (newAddress) => {
    setAddressData((prevState) => ([
      ...prevState,
      { ...newAddress, id: Date.now() },
    ]));
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/address/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if(response.status === 401) {
        alert("There is an ongoing order to this address. You cannot delete it.");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setAddressData((prevState) => (
        prevState.filter((address) => address.id !== id)
      ));
      window.location.reload();

    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  return (
    <div className="address-list">
      <h2>Addresses</h2>
      <div class="container">
      <ul style={{color:"black"}} class="addressUL">
        {addresses.map((address) => (
          <li key={address.id}>
            {address.name}: {address.address_field}, {address.address_field_2}, {address.city} {address.country} {address.postal_code}
            <button onClick={() => handleDeleteAddress(address.address_id)}>Delete</button>
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
