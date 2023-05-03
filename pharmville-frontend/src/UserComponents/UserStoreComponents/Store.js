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
    const [postPerPage, setPostPerPage] = useState(6);

    useEffect(() => {
        const fetchPharmacy = async () => {
            setLoading(true);
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPharmacies(res.data);
            setLoading(false);
        }
        fetchPharmacy();
    }, [])
    console.log(pharmacies)
    // burada top ratinge göre sırala
    // get current posts:
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPharmacies = pharmacies.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }


    return (
        <div class="container">
            <div class="column-1">
                <Filter></Filter>
            </div>
            <div class="column-2">
                <Pharmacies pharmacies={currentPharmacies} loading={loading} />
                <Paginate postsPerPage={postPerPage} totalPosts={pharmacies.length} paginate={paginate} />
            </div>
        </div>



    );
}

export default Store;