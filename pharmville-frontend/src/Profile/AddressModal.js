import React, { useState } from 'react';
import "./AddressModal.css";

const AddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    onAddAddress(newAddress);
    setNewAddress({ street: '', city: '', state: '', zip: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="address-modal">
      <div className="modal-content">
        <h2>Add Address</h2>
        <input
          type="text"
          name="street"
          value={newAddress.street}
          onChange={handleInputChange}
          placeholder="Street"
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
          name="state"
          value={newAddress.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        <input
          type="text"
          name="zip"
          value={newAddress.zip}
          onChange={handleInputChange}
          placeholder="Zip"
        />
        <button onClick={handleSubmit}>Add Address</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddressModal;
