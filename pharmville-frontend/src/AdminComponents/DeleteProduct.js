import React, { useState } from 'react';

function DeleteProduct() {
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = () => {
    fetch(`http://localhost:5000/api/delete_product/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Error in deletion');
    })
    .then(data => {
      // Handle the response here
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Product Name:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <br />
        <label>
          Product Company:
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </label>
        <br />
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </form>
    </div>
  );
}

export default DeleteProduct;
