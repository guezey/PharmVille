import React, { useState, useEffect } from "react";

const AddExistingMedicine = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [stock, setStock] = useState("");
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/medicines')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error:', error));
  }, []);

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

    const medicineData = {
      medicineId: selectedMedicine.id,
      stock: parseInt(stock),
    };

    fetch('http://localhost:5000/api/add_medicine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicineData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
