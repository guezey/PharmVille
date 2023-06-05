import "./Reviews.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Reviews() {

    // domain'den objeyi çekkk
    const currentURL = window.location.pathname;
    const parts = currentURL.split('/'); // Split the pathname by '/'
    // set-id:
    const id = parts[parts.length - 1]; // Get the last part of the pathname
    console.log(id);

    // state for reviews:
    const [reviews, setReviews] = useState([]);

    // fetch medicine data:
    useEffect(() => {
        fetch('http://localhost:5000/reviews/pharmacy/' + id, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const navigate = useNavigate();
    const goToPharmacyStoreHandler = () => {
        navigate(`/pharmacyStore/${id}`);
    };

    return (
        <div className="reviewHolder">

            <div className="pharTitleElements">
                <h1 className="reviewPharmacyTitle" onClick={() => goToPharmacyStoreHandler()}>Reviews for <u>{(reviews.stats ) ? (reviews.stats.name): "Pharmacy"}</u></h1>
                <p className="pharTitlePar"><strong>({(reviews.stats) ? (reviews.stats.total_reviews): "0"} Reviews)</strong></p>
                <p className="pharTitlePar">{(reviews.stats )? (reviews.stats.avg_rating): "-"}/5.0</p>
            </div>

            <div className="commentsHolder">
                { reviews.reviews && reviews.reviews.map(review => (
                    <div className="commentHolder">
                        <div className="commentHeaderElements">
                            <p className="commentHeader" ><strong>{review.title}</strong></p>
                            <p className="commentHeader">{review.rating}/5.0</p>
                        </div>
                        <p className="commentBody">{review.body}</p>
                    </div>
                ))}
                {
                    !reviews && <p className="commentBody">No reviews yet.</p>
                }
            </div>
        </div>
    );
}

export default Reviews;