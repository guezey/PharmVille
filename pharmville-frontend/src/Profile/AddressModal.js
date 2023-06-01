import React, { useState } from 'react';
import "./AddressModal.css";

const AddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [newAddress, setNewAddress] = useState({
    name: '',
    country: '',
    city: '',
    addressField1: '',
    addressField2: '',
    postalCode: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/add_address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAddress)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      onAddAddress(newAddress);
      setNewAddress({name: '', country: '', city: '', addressField1: '', addressField2: '', postalCode: ''});
      onClose();
    }).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="address-modal">
      <div className="modal-content">
        <h2>Add Address</h2>
        <input
          type="text"
          name="name"
          value={newAddress.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="country"
          value={newAddress.country}
          onChange={handleInputChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="city"
          value={newAddress.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="addressField1"
          value={newAddress.addressField1}
          onChange={handleInputChange}
          placeholder="Address Field 1"
        />
        <input
          type="text"
          name="addressField2"
          value={newAddress.addressField2}
          onChange={handleInputChange}
          placeholder="Address Field 2"
        />
        <input
          type="text"
          name="postalCode"
          value={newAddress.postalCode}
          onChange={handleInputChange}
          placeholder="Postal Code"
        />
        <button onClick={handleSubmit}>Add Address</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddressModal;
