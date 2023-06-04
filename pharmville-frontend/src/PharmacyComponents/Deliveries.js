import React, { useState, useEffect } from 'react';
import './Deliveries.css';
function Deliveries() {

    // state for showing new delivery form
    const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);

    // state for showing buttons:
    const [showButtons, setShowButtons] = useState(true);

    // fetch non-completed deliveries:
    const [nonCompDeliveries, setnonCompDeliveries] = useState([]);

    // state for error:
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/pharmacy/orders');
                if (!response.ok) {
                    setError(true);
                }
                const data = await response.json();
                setnonCompDeliveries(data);
            } catch (error) {
                console.error('Error:', error);
                setError(true);
            }
        };
        fetchData();
        console.log(nonCompDeliveries);
    }, []);

    // state for currently selected order:
    const [selectedOrder, setSelectedOrder] = useState({});

    // viewButtonHandler:
    const viewButtonHandler = (bool, id) => {
        setShowNewDeliveryForm(true);
        setShowButtons(bool);
        
        // join nonCompDeliveries and compDeliveries:
        let totalDeliveries = [...nonCompDeliveries.active_orders, ...nonCompDeliveries.shipped_and_delivered_orders];
        setSelectedOrder(totalDeliveries.find((delivery) => delivery.order_id === id));
        console.log(selectedOrder);
        console.log(id);
        console.log(totalDeliveries.find((delivery) => delivery.order_id === id))
    }

    const updateStatusHandler = async (stats) => {
        try {
            const response = await fetch('http://localhost:5000/pharmacy/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id: selectedOrder.order_id,
                    order_status: stats,
                })
            });
            if (!response.ok) {
                setError(true);
            }
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        }
    }


    return (
        <div className='generalHolder'>
            {error && <p className='error'>Something Went Wrong</p>}
            {!error && nonCompDeliveries != null && nonCompDeliveries.length !== 0 &&
                <div className='generalHolder'>
                    <div>
                        <h1 className='deliveriesTitle'>Non-Completed Orders</h1>
                        <div className='deliveriesHolder'>
                            <div className='deliveriesRow'>
                                <p className='pFirstOne'>Date</p>
                                <p className='pFirstOne'>Order ID</p>
                                <p className='pSecondOne'>Actions</p>
                            </div>
                            {nonCompDeliveries.active_orders.map((delivery, index) => 
                               <div className='deliveriesRow' key={index}>
                                    <p className='pFirstOne'>{delivery.order_time}</p>
                                    <p className='pFirstOne'>{delivery.order_id}</p>
                                    <p className='pSecondOne'>
                                        <button className='deliveriesButton' onClick={() => viewButtonHandler(true, delivery.order_id)}>View</button>
                                    </p>
                                </div>
                            )}
                        </div>
                        <h1 className='deliveriesTitle'>Completed Orders</h1>
                        <div className='deliveriesHolder2'>
                            <div className='deliveriesRow'>
                                <p className='pFirstOne'>Date</p>
                                <p className='pFirstOne'>Order ID</p>
                                <p className='pFirstOne'>Status</p>
                                <p className='pSecondOne'>Actions</p>
                            </div>
                            {nonCompDeliveries.shipped_and_delivered_orders.map((delivery, index) =>
                                <div className='deliveriesRow' key={index}>
                                    <p className='pFirstOne'>{delivery.order_time}</p>
                                    <p className='pFirstOne'>{delivery.order_id}</p>
                                    <p className='pFirstOne'>{delivery.order_status}</p>
                                    <p className='pSecondOne'>
                                        <button className='deliveriesButton' onClick={() => viewButtonHandler(false, delivery.order_id)}>View</button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    {showNewDeliveryForm && selectedOrder != null && selectedOrder.length !== 0 &&
                        <div className='deliveryDetailsHolder'>
                            <h1 className='deliveryDetailsTitle'>Order ID: {selectedOrder.order_id}</h1>
                            {selectedOrder.products.map((item, index) =>
                                <div className='deliveryDetailInfoHolder' key={index}>
                                    <p className='deliveryDetailInfo'>{item.name} x{item.count}</p>
                                </div>
                            )}
                            <h1 className='deliveryDetailsTitle2'>Address:</h1>
                            <p className='deliveryDetailInfo'>{selectedOrder.address_field_2 ? (selectedOrder.address_field + " " + selectedOrder.address_field_2 + " ") : (selectedOrder.address_field + " " )}
                            {selectedOrder.city + " " + selectedOrder.country + " " + selectedOrder.postal_code}</p>
                            {showButtons &&
                                <div className='deliveryDetailsButtonsHolder'>
                                    <button className='deliveryDetailsButton' onClick={() => updateStatusHandler("CANCELED")}>Cancel Order</button>
                                    <button className='deliveryDetailsButton' onClick={() => updateStatusHandler("SHIPPED")}>Mark as Completed</button>
                                </div>
                            }
                            {selectedOrder.order_status === 'SHIPPED' &&  
                                <div className='deliveryDetailsButtonsHolder'>
                                    <button className='deliveryDetailsButton' onClick={() => updateStatusHandler("DELIVERED")}>Set as Delivered</button>
                                </div>
                            }
                        </div>
                    }

                </div>
            }
        </div>
    );
}

export default Deliveries;