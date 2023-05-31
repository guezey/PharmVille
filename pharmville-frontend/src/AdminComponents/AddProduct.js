import React, { useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCompany, setProductCompany] = useState("");
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
  const [productImage, setProductImage] = useState(null);
  const [prospectus, setProspectus] = useState(null);
  const [amount, setAmount] = useState("");

  const handleAddProduct = () => {
    const productData = new FormData();
    productData.append('name', productName);
    productData.append('company', productCompany);
    productData.append('description', productDescription);
    productData.append('price', productPrice);
    productData.append('type', productType);
    productData.append('drugClass', drugClass);
    productData.append('undesiredSideEffect', undesiredSideEffect);
    productData.append('prescriptionType', prescriptionType);
    productData.append('ageGroup', ageGroup);
    productData.append('aroma', aroma);
    productData.append('category', category);
    productData.append('skinType', skinType);
    productData.append('amount', amount);
    if(productImage) {
      productData.append('productImage', productImage, productImage.name);
    }
    if(prospectus) {
      productData.append('prospectus', prospectus, prospectus.name);
    }

    fetch('http://localhost:5000/api/add_product', {
      method: 'POST',
      body: productData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
            value={productCompany}
            onChange={(e) => setProductCompany(e.target.value)}
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
          Image:
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
                onChange={(e) => setProspectus(e.target.files[0])}
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
