import React from "react";

const UpdateStocks = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to update stocks
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
        />
        <label htmlFor="new-stock">New Stock:</label>
        <input
          type="number"
          id="new-stock"
          placeholder="Enter new stock"
        />
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default UpdateStocks;
