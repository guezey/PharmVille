import "./Medicine.css";
import star from '../../images/star.png';
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
        fetch('http://localhost:5000/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //medicine_classes: selectedDrugClass,
            }) // Empty body
        })

            .then(response => response.json())
            .then(data => {
                //setPharmacies(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    // onu satan eczaneleri çekk

    // TODO

    // burada bi şekilde medicine mı product mı öğrenmem lazım:
    // TODO
    let isMedicine = true;



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
        navigate(`/review/${item}`);
    };

    const goToPharmacyStoreHandler = (item) => {
        navigate(`/pharmacyStore/${item}`);
    };

    // check if the item is medicine or prescription is needed, else no need to show a modal while adding to cart:
    // TODO
    let isModalNeeded = true;

    return (
        <div>
            <div className="medicineInfoHolder">
                <div className="elementsHolder">
                    <div className="sectionHolder">
                        <h1 className="medicineTitle">Parol</h1>
                        <img src={"https://picsum.photos/200/200"} className="productImg"></img>
                        <p style={{ color: "whitesmoke" }}>22 TL</p>
                    </div>
                    <div className="sectionHolder2">
                        {isMedicine &&
                            <div>
                                <p className="productInfoPar"><strong>Drug Class:</strong> Fever reducer, Painkiller</p>
                                <p className="productInfoPar"><strong>Side Effects:</strong> Headache, Dizziness</p>
                                <p className="productInfoPar"><strong>Company:</strong> Atabay</p>
                                <p className="productInfoPar"><strong>Prescription Type:</strong> None</p>
                                <p className="productInfoPar"><strong>Age Group:</strong> Adolescents, Adults</p>
                                <p className="productInfoPar"><strong>Intake Method:</strong> Oral</p>
                                <p className="productInfoPar"><strong>Medicine Type:</strong> Tablet</p>
                            </div>
                        }
                        {!isMedicine &&
                            <div>
                                <p className="productInfoPar"><strong>Company:</strong> Atabay</p>
                                <p className="productInfoPar"><strong>Prescription Type:</strong> None</p>
                                <p className="productInfoPar"><strong>Age Group:</strong> Adolescents, Adults</p>
                                <p className="productInfoPar"><strong>Intake Method:</strong> Oral</p>
                                <p className="productInfoPar"><strong>Medicine Type:</strong> Tablet</p>
                            </div>}
                    </div>
                </div>
            </div>
            <div className="medicineInfoHolder2">
                {arr.map(item => (
                    <div className="pharmacyInfoHolder">
                        <p className="pharmacyTitle" onClick={() => goToPharmacyStoreHandler(item)}>Gönül Pharmacy</p>
                        <div className="pharmacyReviewInfo">
                            <p className="pharmacyInfoPar" onClick={() => goToReviewHandler(item)}>123 Reviews</p>
                            <div className="starHolder">
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <img src={star} className="starImg"></img>
                                <p style={{ color: "black" }}>(5.0)</p>
                            </div>
                            <button className="addCartBtn" onClick={() => addToCartHandler(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
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