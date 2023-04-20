import React, { useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [drugClass, setDrugClass] = useState("");
  const [undesiredSideEffect, setUndesiredSideEffect] = useState("");
  const [prescriptionType, setPrescriptionType] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [aroma, setAroma] = useState("");
  const [category, setCategory] = useState("");
  const [skinType, setSkinType] = useState("");

  const handleAddProduct = () => {
    // Add the product to the system
    console.log("Product added");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price (TL):
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Type:
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Select a type</option>
            <option value="medicine">Medicine</option>
            <option value="proteinPowder">Protein Powder</option>
            <option value="skinCare">Skin Care</option>
          </select>
        </label>
        {productType === "medicine" && (
          <>
            <br />
            <label>
              Drug Class:
              <input
                type="text"
                value={drugClass}
                onChange={(e) => setDrugClass(e.target.value)}
              />
            </label>
            <br />
            <label>
              Amount:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Undesired Side Effect:
              <input
                type="text"
                value={undesiredSideEffect}
                onChange={(e) => setUndesiredSideEffect(e.target.value)}
              />
            </label>
            <br />
            <label>
              Prescription Type:
              <input
                type="text"
                value={prescriptionType}
                onChange={(e) => setPrescriptionType(e.target.value)}
              />
            </label>
            <br />
            <label>
              Age Group:
              <input
                type="text"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
            </label>
            <br />
            <label>
              Prospectus:
              <input
                type="file"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
              />
            </label>
          </>
        )}
        {productType === "proteinPowder" && (
          <>
            <br />
            <label>
              Aroma:
              <input
                type="text"
                value={aroma}
                onChange={(e) => setAroma(e.target.value)}
              />
            </label>
          </>
        )}
        {productType === "skinCare" && (
          <>
            <br />
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <br />
            <label>
              Skin Type:
              <input
                type="text"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
              />
            </label>
          </>
        )}
        <br />
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
