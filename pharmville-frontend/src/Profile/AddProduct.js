import React, { useState } from "react";

const AddProduct = () => {
    const [productType, setProductType] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [image, setImage] = useState(null);
    const [aroma, setAroma] = useState("");
    const [weight, setWeight] = useState("");
    const [BCAA, setBCAA] = useState("");
    const [service_amount, setService_amount] = useState("");
    const [arginine, setArginine] = useState("");
    const [carb, setCarb] = useState("");
    const [fat, setFat] = useState("");
    const [protein, setProtein] = useState("");
    const [category, setCategory] = useState("");
    const [skinType, setSkinType] = useState("");
    const [volume, setVolume] = useState("");

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

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

                <label htmlFor="company">Company:</label>
                <input
                    type="text"
                    id="company"
                    placeholder="Enter company"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
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

                <label htmlFor="image">Product Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
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
                        <label htmlFor="weight">Weight:</label>
                        <input
                            type="text"
                            id="weight"
                            placeholder="Enter weight"
                            value={weight}
                            onChange={(event) => setWeight(event.target.value)}
                        />
                        <label htmlFor="BCAA">BCAA:</label>
                        <input
                            type="text"
                            id="BCAA"
                            placeholder="Enter BCAA Percentage"
                            value={BCAA}
                            onChange={(event) => setBCAA(event.target.value)}
                        />
                        <label htmlFor="service_amount">Service Amount:</label>
                        <input
                            type="text"
                            id="service_amount"
                            placeholder="Enter service amount"
                            value={service_amount}
                            onChange={(event) => setService_amount(event.target.value)}
                        />
                        <label htmlFor="arginine">Arginine:</label>
                        <input
                            type="text"
                            id="arginine"
                            placeholder="Enter arginine percentage"
                            value={arginine}
                            onChange={(event) => setArginine(event.target.value)}
                        />
                        <label htmlFor="carb">Carbonhydrate:</label>
                        <input
                            type="text"
                            id="carb"
                            placeholder="Enter carbonhydrate percentage"
                            value={carb}
                            onChange={(event) => setCarb(event.target.value)}
                        />
                        <label htmlFor="fat">Fat:</label>
                        <input
                            type="text"
                            id="fat"
                            placeholder="Enter fat percentage"
                            value={fat}
                            onChange={(event) => setFat(event.target.value)}
                        />
                        <label htmlFor="protein">Protein:</label>
                        <input
                            type="text"
                            id="protein"
                            placeholder="Enter protein percentage"
                            value={protein}
                            onChange={(event) => setProtein(event.target.value)}
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
                        <label htmlFor="volume">Volume:</label>
                        <input
                            type="text"
                            id="volume"
                            placeholder="Enter volume"
                            value={volume}
                            onChange={(event) => setVolume(event.target.value)}
                        />
                    </>
                )}

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;