import React, { useState } from 'react';

function DeleteProduct() {
  const [productId, setProductId] = useState('');

  const handleDeleteProduct = () => {
    // Delete the product from the system using productId
    console.log('Product deleted');
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
