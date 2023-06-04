import React, { useState, useEffect } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [drugClass, setDrugClass] = useState([]);
  const [drugClassOptions, setDrugClassOptions] = useState([]);
  const [undesiredSideEffect, setUndesiredSideEffect] = useState([]);
  const [sideEffectOptions, setSideEffectOptions] = useState([]);
  const [prescriptionType, setPrescriptionType] = useState("");
  const [prescriptionTypeOptions, setPrescriptionTypeOptions] = useState([]);
  const [ageGroup, setAgeGroup] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const [prospectus, setProspectus] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/medicine/filter_options")
      .then((response) => response.json())
      .then((data) => {
        setDrugClassOptions(data.medicine_class);
        setPrescriptionTypeOptions(data.presc_types);
        setSideEffectOptions(data.side_effects.map((item) => item.effect_name));
        setAgeGroupOptions(data.age_groups.map((item) => item.group_name));
      });
  }, []);

  const handleAddProduct = () => {
    const productData = {
      name: productName,
      company: productCompany,
      price: productPrice,
      medicine_classes: drugClass,
      side_effects: undesiredSideEffect,
      presc_type: prescriptionType,
      age_groups: [],
      prospectus: prospectus,
      amount: amount,
      intake_type: "Capsule",
    };

    fetch("http://localhost:5000/medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Add Medicine Product</h2>
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
          Drug Class:
          <select
            //multiple={true}
            value={drugClass}
            onChange={(e) =>
              setDrugClass(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {drugClassOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
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
          <select
            //multiple={true}
            value={undesiredSideEffect}
            onChange={(e) =>
              setUndesiredSideEffect(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {sideEffectOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Prescription Type:
          <select
            value={prescriptionType}
            onChange={(e) => setPrescriptionType(e.target.value)}
          >
            {prescriptionTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Age Group:
          <select
            multiple={true}
            value={ageGroup}
            onChange={(e) =>
              setAgeGroup(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {ageGroupOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Prospectus:
          <textarea
            value={prospectus}
            onChange={(e) => setProspectus(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
