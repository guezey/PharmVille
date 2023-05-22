import "./Reviews.css";
import { useNavigate } from 'react-router-dom';

function Reviews() {
    // fetch reviews from domain
    //TODO

    // for now: a fake arr:
    const reviews = [
        {
            id: 1,
            user: "Ceren",
            rating: 4.0,
            comment: "Fast delivery. Totally will buy from them again.",
        },
        {
            id: 2,
            user: "Deniz",
            rating: 4.3,
            comment: "I asked only for Parol. They shipped it 6 days after??? It was extremely slow.",
        },
        {
            id: 3,
            user: "Ali Emir",
            rating: 3.3,
            comment: "Bought protein powder, they even send me a little gift! It was quite refreshing to see some stores care about customer service.",
        },
        {
            id: 4,
            user: "Dağhan",
            rating: 2.1,
            comment: "It was mid. This whole idea of online pharmacy is weird in general.",
        },
        {
            id: 5,
            user: "Dağhan",
            rating: 2.1,
            comment: "It was mid. This whole idea of online pharmacy is weird in general.",
        },
        {
            id: 6,
            user: "Dağhan",
            rating: 2.1,
            comment: "It was mid. This whole idea of online pharmacy is weird in general.",
        },
        {
            id: 7,
            user: "Dağhan",
            rating: 2.1,
            comment: "It was mid. This whole idea of online pharmacy is weird in general.",
        },
    ];

    const navigate = useNavigate();
    const goToPharmacyStoreHandler = (item) => {
        navigate(`/pharmacyStore/${item}`);
    };

    return (
        <div className="reviewHolder">

            <div className="pharTitleElements">
                <h1 className="reviewPharmacyTitle" onClick={() => goToPharmacyStoreHandler(1)}>Reviews for <u>Gönül Pharmacy</u></h1>
                <p className="pharTitlePar"><strong>(9 Reviews)</strong></p>
                <p className="pharTitlePar">4.2/5.0</p>
            </div>

            <div className="commentsHolder">
                {reviews.map(review => (
                    <div key={review.id} className="commentHolder">
                        <div className="commentHeaderElements">
                            <p className="commentHeader" ><strong>{review.user}</strong></p>
                            <p className="commentHeader">{review.rating}/5.0</p>
                        </div>
                        <p className="commentBody">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;