import React, { useState, useEffect } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import CartItem from './CartItem';
import "./Cart.css"
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

function Cart() {
  const navigate = useNavigate();

  // to show in which step:
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  // state for total price:
  const [totalPrice, setTotalPrice] = useState(0);

  // state to determine if cart is empty: 
  const [isEmpty, setIsEmpty] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  // fetch cart items from database:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/patient/cart', {
          credentials: 'include'});
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setCartItems(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  /*
  
    { id: 1, imgURL: "https://picsum.photos/200/200", name: "Panadol", prec: "No prescription", qty: 1, price: 10 },
    { id: 2, imgURL: "https://picsum.photos/200/200", name: "Parol", prec: "No prescription", qty: 1, price: 200 },
    { id: 3, imgURL: "https://picsum.photos/200/200", name: "Aspirin", prec: "No prescription", qty: 1, price: 15 },
  ]);
  */


  useEffect(() => {
    // if cart not null:
    if (cartItems !== null) {
      if (cartItems.length !== 0) {
        let total = 0;
        cartItems.forEach(item => {
          total += item.price * 1;
        });
        setTotalPrice(total);
      }
    }
  }, [cartItems]);

  // ADDRESS PART:

  // fetch address from database:
  /*
  useEffect(() => {

  }, []);
  */

  // state for address array:
  const [address, setAddress] = useState([{ id: 1, name: "Home", address: "Kızılay Mahallesi, 06420 Çankaya/Ankara" },
  { id: 2, name: "Work", address: "Üniversiteler Mah., 06420 Çankaya/Ankara" }]);

  // state for selected address:
  const [selectedAddress, setSelectedAddress] = useState(address[0]);

  // when clicked on set address option on pop up:
  const setAddressOption = (item) => {
    setSelectedAddress(item);
  };


  // state for credit card info:
  const [cardOwner, setCardOwner] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');

  const handleCardOwnerChange = (e) => {
    setCardOwner(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  };

  // final submit:

  const [isSubmitted, setIsSubmitted] = useState(false);
  
  

  const handleSubmit = () => {
    console.log("Card Owner: " + cardOwner);
    console.log("Card Number: " + cardNumber);
    console.log("CVV: " + cvv);

    setIsSubmitted(true);
    setTimeout(() => {
      // Reset the success message state
      setIsSubmitted(false);
      // Navigate to the desired page

      navigate(`/`);
    }, 800); // Wait for 2 seconds (adjust as needed)
  }




  return (
    <div>
      {isSubmitted &&
            <div className="alertDiv">
              <Alert variant="success">
                Submitted
              </Alert>
            </div>
      }
      {step1 &&
        <div className='generalHolder'>
          <div className='cartDiv'>
            <h1 className='cartTitle'>Pharmacy: Yıldız Pharmacy</h1>
            {cartItems.map((item) =>
              <CartItem
                key={item.prod_id}
                id={item.prod_id}
                imgURL={item.imgURL}
                name={item.name}
                prec={item.prec}
                qty={1}
                price={item.price}
              />
            )}
          </div>
          <div>
            <div className='cartPriceInfoHolder'>
              <h1 className='cartPriceTitle'>Summary</h1>
              <p className='cartPriceInfo'>Total: {totalPrice} TL</p>
              <p className='cartPriceInfo'>Shipment: 19.99 TL</p>
              <p className='cartPriceInfo'>Overall: {totalPrice + 19.99} TL</p>
            </div>
            <div>
              <button className='cartProceedBtn' onClick={() => { setStep1(false); setStep2(true); }}>Proceed >></button>
            </div>
          </div>
        </div>
      }
      {step2 &&
        <div className='cartAdressHolder'>
          <div className='cartAdrrDivider'>
            <h1 className='cartPriceTitle'>Delivery Address</h1>
            <div className='addressInfoHolder'>
              {address.map((item) => (
                <div className={`addressInfo ${selectedAddress.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setAddressOption(item)} >
                  <p className='addressName'>{item.name}</p>
                </div>))}
            </div>
            <button className='addAddrBtn' onClick={() => { setStep1(true); setStep2(false); }}>Add Address</button>
          </div>
          <div style={{ width: "500px" }}>
            <h1 className='cartPriceTitle'>Payment</h1>
            <div className='cartPaymentHolder'>
              <label htmlFor="cardOwner" className='cartCardLabel'>Card Owner:</label>
              <div className='inputField'>
                <input
                  type="text"
                  id="cardOwner"
                  value={cardOwner}
                  onChange={handleCardOwnerChange}
                  required

                />
              </div>
              <label htmlFor="cardNumber" className='cartCardLabel'>Card Number:</label>
              <div className='inputField'>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required

                />
              </div>
              <div style={{ display: 'flex' }} className='inputsHolder'>
                <div>
                  <label htmlFor="cvv" className='cartCardLabel'>CVV:</label>
                  <div className='cvvField'>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="expirationMonth" className='cartCardLabel'>Expiration Month:</label>
                  <select
                    id="expirationMonth"
                    value={expirationMonth}
                    onChange={handleExpirationMonthChange}
                    required
                  >
                    <option value="">--Select Month--</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="expirationYear" className='cartCardLabel'>Expiration Year:</label>
                  <select
                    id="expirationYear"
                    value={expirationYear}
                    onChange={handleExpirationYearChange}
                    required
                  >
                    <option value="">--Select Year--</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>
            </div>
            <button className='payBtn' onClick={handleSubmit}>Buy</button>
          </div>
        </div>
      }
    </div >
  );
}

export default Cart;