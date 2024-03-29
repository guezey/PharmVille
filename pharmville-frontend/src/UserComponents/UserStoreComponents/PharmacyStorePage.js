import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pharmacies from './Pharmacies';
import "./Pharmacies.css";
import Paginate from './Paginate';
import Filter from './Filter';
import { useNavigate } from 'react-router-dom';

function PharmacyStorePage() {
    const [pharmacies, setPharmacies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    // state for which product type will be selected:
    const [selectedProductType, setSelectedProductType] = useState("medicine");

    // state for which drug class will be selected:
    const [selectedDrugClass, setSelectedDrugClass] = useState([]);

    // state for selected undesired effects:
    const [selectedUndesiredEffects, setSelectedUndesiredEffects] = useState([]);

    // state for selected prescription type:
    const [selectedPrescriptionType, setSelectedPrescriptionType] = useState([]);

    // state for age group:
    const [selectedAge, setSelectedAge] = useState([]);

    // state for intake method:
    const [selectedIntake, setSelectedIntake] = useState([]);

    const handleChildData = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedProductType(data);
        else
            setSelectedProductType(null);
    };

    const handleDrugClassSelection = (data) => {
        // Update the information in the parent component
        setSelectedDrugClass(data);
    };

    const handleUndesiredEffects = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedUndesiredEffects(data);
        else
            setSelectedUndesiredEffects(null);
    };

    const handlePrescriptionType = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedPrescriptionType(data);
        else
            setSelectedPrescriptionType(null);
    };

    const handleAgeSelection = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedAge(data);
        else
            setSelectedAge(null);
    };

    const handleIntakeSelection = (data) => {
        if (data.length > 0)
            setSelectedIntake(data);
        else
            setSelectedIntake(null);
    }

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);

    const handleMinChange = (data) => {
        setMinPrice(data);
        // Perform filtering logic or update the displayed data based on the filterData
    };

    const handleMaxChange = (data) => {
        setMaxPrice(data);
        // Perform filtering logic or update the displayed data based on the filterData
    };

    // state for aroma selection:
    const [selectedAroma, setSelectedAroma] = useState([]);

    const handleAromaSelection = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedAroma(data);
        else
            setSelectedAroma(null);
    };

    // state for skin care selection:
    const [selectedSkinCare, setSelectedSkinCare] = useState([]);

    const handleSkinCareSelection = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedSkinCare(data);
        else
            setSelectedSkinCare(null);
    };

    // state for skin type selection:
    const [selectedSkinType, setSelectedSkinType] = useState([]);

    const handleSkinTypeSelection = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedSkinType(data);
        else
            setSelectedSkinType(null);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

     // domain'den objeyi çekkk
     const currentURL = window.location.pathname;
     const parts = currentURL.split('pharmacyStore/'); // Split the pathname by '/'
     // set-id:
     const id = parts[parts.length - 1]; // Get the last part of the pathname
     console.log(id);
 

    // fetch medicine data:
    useEffect(() => {
        setIsLoading(true); // Set isLoading to true before starting the fetch
        fetch('http://localhost:5000/' + selectedProductType, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                medicine_classes: selectedDrugClass,
                side_effects: selectedUndesiredEffects,
                presc_types: selectedPrescriptionType,
                age_groups: selectedAge,
                intake_types: selectedIntake,
                min_price: minPrice,
                max_price: maxPrice,
                aromas: selectedAroma,
                skincare_types: selectedSkinCare,
                skin_types: selectedSkinType,
                pharmacy_id: id
            }) // Empty body
        })
            .then(response => response.json())
            .then(data => {
                setPharmacies(data);
                setIsLoading(false);
                setError(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(true);
            })
    }, [selectedProductType, selectedDrugClass, selectedPrescriptionType, selectedUndesiredEffects, selectedAge, selectedIntake, minPrice, maxPrice, selectedAroma, selectedSkinType, selectedSkinCare]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPharmacies = pharmacies.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const navigate = useNavigate();
    const goToReviewHandler = () => {
        navigate(`/review/${id}`);
    };


    return (
        <div>
            <div className='pharmacyTitleHolder'>
                <h1 className='pharmacyTitleForStore'>Products of Faruk Pharmacy</h1>
                <p className='pharmacyParForStore' onClick={() => goToReviewHandler()}>See Reviews</p>
            </div>
            <div className="container">
                <div className="column-1">
                    <Filter onData={handleChildData} onDrugSelection={handleDrugClassSelection}
                        onEffectSelection={handleUndesiredEffects} onPrescSelection={handlePrescriptionType}
                        onAgeSelection={handleAgeSelection} onIntakeSelection={handleIntakeSelection}
                        onMinChange={handleMinChange} onMaxChange={handleMaxChange} onAromaSelection={handleAromaSelection}
                        onSkinCareSelection={handleSkinCareSelection} onSkinTypeSelection={handleSkinTypeSelection}
                    ></Filter>
                </div>
                <div className="column-2">
                    <Pharmacies pharmacies={currentPharmacies} loading={isLoading} error={error} />
                    <Paginate postsPerPage={postPerPage} totalPosts={pharmacies.length} paginate={paginate} />
                </div>
            </div>
        </div>



    );
}

export default PharmacyStorePage;