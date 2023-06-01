import React, { useState } from "react";

const UpdateStocks = () => {
  const [productMedicine, setProductMedicine] = useState("");
  const [newStock, setNewStock] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/updateStocks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          product: productMedicine, 
          stock: newStock 
        })
      });
      if(response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setProductMedicine('');
        setNewStock('');
      } else {
        console.error('Error updating stocks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Stocks</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-medicine">Product/Medicine:</label>
        <input
          type="text"
          id="product-medicine"
          placeholder="Enter product or medicine name"
          value={productMedicine}
          onChange={e => setProductMedicine(e.target.value)}
        />
        <label htmlFor="new-stock">New Stock:</label>
        <input
          type="number"
          id="new-stock"
          placeholder="Enter new stock"
          value={newStock}
          onChange={e => setNewStock(e.target.value)}
        />
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default UpdateStocks;
