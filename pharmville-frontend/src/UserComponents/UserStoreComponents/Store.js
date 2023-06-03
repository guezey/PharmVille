import React, { useState, useEffect } from 'react';
import axios from "axios";
import Pharmacies from './Pharmacies';
import "./Pharmacies.css";
import Paginate from './Paginate';
import Filter from './Filter';

function Store() {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    // fetch pharmacies:


    useEffect(() => {
        fetch('http://localhost:5000/medicine', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({}) // Empty body
        })

            .then(response => response.json())
            .then(data => {
                setPharmacies(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // burada top ratinge göre sırala
    // get current posts:
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPharmacies = pharmacies.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }


    return (
        <div className="container">
            <div className="column-1">
                <Filter></Filter>
            </div>
            <div className="column-2">
                <Pharmacies pharmacies={currentPharmacies} loading={loading} />
                <Paginate postsPerPage={postPerPage} totalPosts={pharmacies.length} paginate={paginate} />
            </div>
        </div>



    );
}

export default Store;