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
    onAddAddress(newAddress);
    setNewAddress({name: '', country: '', city: '', addressField1: '', addressField2: '', postalCode: ''});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="address-modal">
      <div className="modal-content">
        <h2>Add Address</h2>
        <input
          type="text"
          name="name"
          value={newAddress.street}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="country"
          value={newAddress.city}
          onChange={handleInputChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="city"
          value={newAddress.state}
          onChange={handleInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="address field 1"
          value={newAddress.postalCode}
          onChange={handleInputChange}
          placeholder="Address Field 1"
        />
        <input
          type="text"
          name="address field 2"
          value={newAddress.postalCode}
          onChange={handleInputChange}
          placeholder="Address Field 2"
        />
        <input
          type="text"
          name="postal code"
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
