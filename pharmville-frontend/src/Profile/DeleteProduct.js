import React, { useState } from "react";

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`http://localhost:5000/api/delete_product/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Product Deleted Successfully');
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-medicine-delete">Product/Medicine:</label>
        <input
          type="text"
          id="product-medicine-delete"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          placeholder="Enter product or medicine ID"
        />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
