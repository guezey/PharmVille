import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pharmacies from './Pharmacies';
import "./Pharmacies.css";
import Paginate from './Paginate';
import Filter from './Filter';
import { useNavigate } from 'react-router-dom';

function PharmacyStorePage() {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    // get pharmacy products from id:

    useEffect(() => {
        const fetchPharmacy = async () => {
            setLoading(true);
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPharmacies(res.data);
            setLoading(false);
        }
        fetchPharmacy();
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPharmacies = pharmacies.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }

    const navigate = useNavigate();
    const goToReviewHandler = (item) => {
        navigate(`/review/${item}`);
    };


    return (
        <div>
            <div className='pharmacyTitleHolder'>
                <h1 className='pharmacyTitleForStore'>Products of Faruk Pharmacy</h1>
                <p className='pharmacyParForStore' onClick={() => goToReviewHandler(1)}>Reviews 4.2/5.0</p>
            </div>
            <div  className="container">
            <div className="column-1">
                <Filter></Filter>
            </div>
            <div className="column-2">
                <Pharmacies pharmacies={currentPharmacies} loading={loading} />
                <Paginate postsPerPage={postPerPage} totalPosts={pharmacies.length} paginate={paginate} />
            </div>
            </div>
        </div>



    );
}

export default PharmacyStorePage;