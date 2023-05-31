import React, { useState } from 'react';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productCompany, setProductCompany] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [newDrugClass, setNewDrugClass] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newUndesiredSideEffect, setNewUndesiredSideEffect] = useState('');
  const [newPrescriptionType, setNewPrescriptionType] = useState('');
  const [newAgeGroup, setNewAgeGroup] = useState('');
  const [newProspectus, setNewProspectus] = useState(null);

  const handleUpdateProduct = () => {
    const productData = {
      productId,
      productName,
      productCompany,
      productDescription,
      productPrice,
      newDrugClass,
      newAmount,
      newUndesiredSideEffect,
      newPrescriptionType,
      newAgeGroup,
      // Add other product fields here
    };
  
    fetch(`http://localhost:5000/api/update_product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Error in update');
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Product ID:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <br />
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          Product Company:
          <input type="text" value={productCompany} onChange={(e) => setProductCompany(e.target.value)} />
        </label>
        <br />
        <label>
          New Description:
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </label>
        <br />
        <label>
          New Price (TL):
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </label>
        <br />
        <label>
          New Drug Class:
          <input type="text" value={newDrugClass} onChange={(e) => setNewDrugClass(e.target.value)} />
        </label>
        <br />
        <label>
          New Amount:
          <input type="text" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
        </label>
        <br />
        <label>
          New Undesired Side Effect:
          <input type="text" value={newUndesiredSideEffect} onChange={(e) => setNewUndesiredSideEffect(e.target.value)} />
        </label>
        <br />
        <label>
          New Prescription Type:
          <input type="text" value={newPrescriptionType} onChange={(e) => setNewPrescriptionType(e.target.value)} />
        </label>
        <br />
        <label>
          New Age Group:
          <input type="text" value={newAgeGroup} onChange={(e) => setNewAgeGroup(e.target.value)} />
        </label>
        <br />
        <label>
          New Prospectus:
          <input type="file" onChange={(e) => setNewProspectus(e.target.files[0])} />
        </label>
        <br />
        <button onClick={handleUpdateProduct}>Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
