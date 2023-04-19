import React, { useState } from "react";

const AddProduct = () => {
    const [productType, setProductType] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [aroma, setAroma] = useState("");
    const [category, setCategory] = useState("");
    const [skinType, setSkinType] = useState("");

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement the logic to add a new product
        console.log("Product Type:", productType);
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Stock:", stock);
        console.log("Price:", price);
        if (productType === "proteinPowder") {
            console.log("Aroma:", aroma);
        } else if (productType === "skincare") {
            console.log("Category:", category);
            console.log("Skin Type:", skinType);
        }
    };
    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="product-type">Product Type:</label>
                <select id="product-type" value={productType} onChange={handleProductTypeChange}>
                    <option value="">Select a product type</option>
                    <option value="proteinPowder">Protein Powder</option>
                    <option value="skincare">Skincare</option>
                </select>

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    placeholder="Enter stock number"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />

                {productType === "proteinPowder" && (
                    <>
                        <label htmlFor="aroma">Aroma:</label>
                        <input
                            type="text"
                            id="aroma"
                            placeholder="Enter aroma"
                            value={aroma}
                            onChange={(event) => setAroma(event.target.value)}
                        />
                    </>
                )}

                {productType === "skincare" && (
                    <>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            placeholder="Enter category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                        <label htmlFor="skin-type">Skin Type:</label>
                        <input
                            type="text"
                            id="skin-type"
                            placeholder="Enter skin type"
                            value={skinType}
                            onChange={(event) => setSkinType(event.target.value)}
                        />
                    </>
                )}

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;