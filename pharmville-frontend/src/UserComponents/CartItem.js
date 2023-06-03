import "./Cart.css"
import React, { useState } from "react";
import binIcon from '../images/bin.png';
import Modal from 'react-bootstrap/Modal';
function CartItem(props) {

    // state to show warning modal:
    const [showModal, setShowModal] = useState(false);

    let [num, setNum] = useState(props.qty);

    let incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
        }
    };
    let decNum = () => {
        if (num > 1) {
            setNum(num - 1);
        }
        // burada aslında sepetten çıkarma işlemi yapılacak
        else if (num === 1) {
            setShowModal(true);
        }
    }
    let handleChange = (e) => {
        setNum(e.target.value);
    }

    // function to hide warning modal:
    const hideModalHandler = () => {
        setShowModal(false);
    };

    // function to delete item from cart:
    const deleteItemHandler = () => {
        // burada aslında sepetten çıkarma işlemi yapılacak
        setShowModal(true);
    };

    // function to delete item from cart:
    const deleteActualDeletion = () => {
        // burada aslında sepetten çıkarma işlemi yapılacak
        setShowModal(false);
        console.log("Item deleted");
    };


    return (
        <div className="cartitemDiv">
            <div className="cartItemSection">

                <img src={props.imgURL} className="cartImg"></img>

            </div>
            <div className="cartItemSection">
                <p className="cartInfo">{props.name}</p>
            </div>
            <div className="cartItemSection">
                <p className="cartInfo">{props.prec}</p>
            </div>
            <div className="cartItemSection">
                <button className="decreaseBtn" onClick={decNum}>-</button>
                <p className="quantityShow">{num}</p>
                <button className="incrementBtn" onClick={incNum}>+</button>
            </div>
            <div className="cartItemSection">
                <p className="cartInfo">{props.price} TL</p>
            </div>
            <div className="cartItemSection">
                <img src={binIcon} className="binIcon" onClick={deleteItemHandler}></img>
            </div>
            <div>
                <Modal show={showModal} onHide={hideModalHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to remove the item?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button variant="secondary" onClick={hideModalHandler}>Cancel</button>
                        <button variant="primary" onClick={deleteActualDeletion} >Remove</button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}

export default CartItem;