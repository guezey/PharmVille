import React, { useState } from 'react';

function UpdateProduct() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleUpdateProduct = () => {
    // Update the product in the system using productId and the new information
    console.log('Product updated');
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Product Name:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <br />
        <label>
          New Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          New Description:
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </label>
        <br />
        <label>
          New Price:
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </label>
        <br />
        <button onClick={handleUpdateProduct}>Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
