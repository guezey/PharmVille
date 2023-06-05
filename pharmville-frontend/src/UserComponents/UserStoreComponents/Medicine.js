import "./Medicine.css";
import star from '../../images/star.png';
import blackStar from '../../images/black-star.png';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const arr = [1, 2, 3, 4, 5]; // örnek arr, her bunu satan eczane için eczaneyi sıralaaa



function Medicine(props) {

    // domain'den objeyi çekkk
    const currentURL = window.location.pathname;
    const parts = currentURL.split('medicine/'); // Split the pathname by '/'
    // set-id:
    const id = parts[parts.length - 1]; // Get the last part of the pathname
    console.log(id);

    // fetch medicine data:
    useEffect(() => {
        fetch('http://localhost:5000/products/' + id, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setIsProdType(data.prod_type);

            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    // onu satan eczaneleri çekk

    // TODO

    // burada bi şekilde medicine mı product mı öğrenmem lazım:
    // TODO
    const [product, setProduct] = useState([]);
    const [prodType, setIsProdType] = useState("");



    // button handler for adding toshopping cart
    const addToCartHandler = (item) => {
        // kullanıcının uyuşan prescriptionlarını çek
        setShow(true);
    }


    const handleClose = () => {
        setShow(false);
    }

    // state for opening & closing the modal
    const [show, setShow] = useState(false);

    // state for selecting the prescription
    const [selectedPresc, setSelectedPresc] = useState("");
    const prescription = ['ID: 287578, Due:12/12/23', 'ID: 287348, Due:12/11/23', 'ID: 187348, Due:8/11/23', 'ID: 9857348, Due:09/07/23'];

    // handle selected prescription:
    const handleSelect = (event) => {
        setSelectedPresc(event.target.value);
    };

    const navigate = useNavigate();
    const goToReviewHandler = (item) => {
        navigate(`/review/${item.pharmacy_id}`);
    };

    const goToPharmacyStoreHandler = (item) => {
        navigate(`/pharmacyStore/${item.pharmacy_id}`);
    };

    // check if the item is medicine or prescription is needed, else no need to show a modal while adding to cart:
    // TODO
    let isModalNeeded = true;

    return (
        <div>
            <div className="medicineInfoHolder">
                <div className="elementsHolder">
                    <div className="sectionHolder">
                        <h1 className="medicineTitle">{product.name}</h1>
                        <img src={"https://picsum.photos/200/200"} className="productImg"></img>
                        <p style={{ color: "whitesmoke" }}>{product.price} TL</p>
                    </div>
                    <div className="sectionHolder2">
                        {prodType === "Medicine" &&
                            <div>
                                <p className="productInfoPar"><strong>Drug Class:</strong>
                                    {product.medicine_classes.map((cause) => " " + cause + ", ")}</p>
                                <p className="productInfoPar"><strong>Side Effects:</strong>
                                    {product.side_effects.map((cause) => " " + cause + ", ")}</p>
                                <p className="productInfoPar"><strong>Company:</strong> {product.company}</p>
                                <p className="productInfoPar"><strong>Prescription Type:</strong> {product.presc_type}</p>
                                <p className="productInfoPar"><strong>Age Group:</strong>
                                    {product.age_groups.map((cause) => " " + cause.group_name + ", ")}
                                </p>
                                <p className="productInfoPar"><strong>Intake Method:</strong> {product.intake_type}</p>
                            </div>
                        }
                        {prodType === "Skincare" &&
                            <div>
                                <p className="productInfoPar"><strong>Company:</strong> {product.company}</p>
                                <p className="productInfoPar"><strong>Applicable Skin Types:</strong> 
                                {product.applicable_skin_types.map((cause) => " " + cause + ", ")}
                                </p>
                                <p className="productInfoPar"><strong>Volume:</strong> {product.volume}</p>
                                <p className="productInfoPar"><strong>Skin Care Type:</strong> {product.skincare_type}</p>
                            </div>}
                            {prodType === "ProteinPowder" &&
                            <div>
                                <p className="productInfoPar"><strong>Company: </strong> {product.company}</p>
                                <p className="productInfoPar"><strong>Aroma:</strong> {product.aroma_name}</p>
                                <p className="productInfoPar"><strong>Protein Percent: </strong> {product.protein_percent}</p>
                                <p className="productInfoPar"><strong>Fat Percent: </strong> {product.fat_percent}</p>
                                <p className="productInfoPar"><strong>Arginine Percent: </strong> {product.arginine_percent}</p>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="medicineInfoHolder2">
                {
                    prodType === "Medicine" &&
                    product.pharmacies.map(item => (
                        <div className="pharmacyInfoHolder">
                            <p className="pharmacyTitle" onClick={() => goToPharmacyStoreHandler(item)}>{item.name}</p>
                            <div className="pharmacyReviewInfo">
                                <p className="pharmacyInfoPar" onClick={() => goToReviewHandler(item)}>{item.total_reviews} Reviews</p>
                                <div className="starHolder">
                                    {[...Array(Math.ceil(item.avg_rating))].map((_, index) => (
                                        <img src={star} className="starImg"></img>
                                    ))}
                                    {[...Array(Math.ceil(5 - item.avg_rating))].map((_, index) => (
                                        <img src={blackStar} className="starImg"></img>
                                    ))}
                                    <p style={{ color: "black" }}>({item.avg_rating})</p>
                                </div>
                                <button className="addCartBtn" onClick={() => addToCartHandler(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                }
                {
                   ( prodType === "Skincare" || prodType === "ProteinPowder" ) &&
                        <div className="pharmacyInfoHolder">
                            <p className="pharmacyTitle" onClick={() => goToPharmacyStoreHandler(product.pharmacy)}>{product.pharmacy.name}</p>
                            <div className="pharmacyReviewInfo">
                                <p className="pharmacyInfoPar" onClick={() => goToReviewHandler(product.pharmacy)}>{product.pharmacy.total_reviews} Reviews</p>
                                <div className="starHolder">
                                    {[...Array(Math.ceil(product.pharmacy.avg_rating))].map((_, index) => (
                                        <img src={star} className="starImg"></img>
                                    ))}
                                    {[...Array(Math.ceil(5 - product.pharmacy.avg_rating))].map((_, index) => (
                                        <img src={blackStar} className="starImg"></img>
                                    ))}
                                    <p style={{ color: "black" }}>({product.pharmacy.avg_rating})</p>
                                </div>
                                <button className="addCartBtn" onClick={() => addToCartHandler(product.pharmacy)}>Add to Cart</button>
                            </div>
                        </div>
                }
            </div>
            {isModalNeeded && <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modalTitle">{arr.length > 0 ? "Select Prescription to Add Item to Cart" : "No prescription available"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Prescription</Form.Label>
                                <select value={selectedPresc} onChange={handleSelect} className="prescSelectDropdown">
                                    <option value="">Select a prescription</option>
                                    {prescription.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="modalAligner">
                        <button onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={handleClose}>
                            Add to Cart
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>}

        </div>
    );
}

export default Medicine