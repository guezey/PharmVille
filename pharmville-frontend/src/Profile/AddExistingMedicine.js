import React, { useState } from "react";

const AddExistingMedicine = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [stock, setStock] = useState("");

  // Dummy data
  const medicines = [
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Ibuprofen" },
    { id: 3, name: "Paracetamol" },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMedicine || !stock) {
      alert("Please select a medicine and enter the stock number.");
      return;
    }
    // Implement the logic to add the selected medicine and stock number
    console.log("Medicine:", selectedMedicine);
    console.log("Stock:", stock);
  };

  const searchResults = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>Add Existing Medicine</h2>
      <input
        type="text"
        placeholder="Search medicine"
        value={searchText}
        onChange={handleSearchChange}
      />
      <div>
        {searchResults.map((medicine) => (
          <div
            key={medicine.id}
            onClick={() => handleSelectMedicine(medicine)}
            style={{ cursor: "pointer" }}
          >
            {medicine.name}
          </div>
        ))}
      </div>
      {selectedMedicine && (
        <form onSubmit={handleSubmit}>
          <div>
            <strong>Selected Medicine:</strong> {selectedMedicine.name}
          </div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            placeholder="Enter stock number"
            value={stock}
            onChange={handleStockChange}
          />
          <button type="submit">Add to Stock</button>
        </form>
      )}
    </div>
  );
};

export default AddExistingMedicine;
