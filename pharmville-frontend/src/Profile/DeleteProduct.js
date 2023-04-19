import React from "react";

const DeleteProduct = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the logic to delete a product
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-medicine-delete">Product/Medicine:</label>
        <input
          type="text"
          id="product-medicine-delete"
          placeholder="Enter product or medicine name"
        />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default DeleteProduct;
