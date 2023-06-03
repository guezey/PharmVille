import React, { useState } from 'react';
import './Deliveries.css';
function Deliveries() {

    // state for showing new delivery form
    const [showNewDeliveryForm, setShowNewDeliveryForm] = useState(false);

    // state for showing buttons:
    const [showButtons, setShowButtons] = useState(true);

    // fetch non-completed deliveries:
    const [nonCompDeliveries, setnonCompDeliveries] = useState([
        {
            date: '12/12/2021', id: '1', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
        {
            date: '12/12/2021', id: '2', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
        {
            date: '12/12/2021', id: '3', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
    ]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/deliveries');
    //             if (!response.ok) {
    //                 throw new Error('Something went wrong!');
    //             }

    //             const data = await response.json();
    //             setnonCompDeliveries(data);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // state for currently selected order:
    const [selectedOrder, setSelectedOrder] = useState({
        date: '12/12/2021', id: '1', items: [
            { name: 'Parol', quantity: '2' },
            { name: 'Arveles', quantity: '3' },
            { name: 'Nexium', quantity: '1' },]
    });

    // viewButtonHandler:
    const viewButtonHandler = (bool, id) => {
        setShowNewDeliveryForm(true);
        setShowButtons(bool);

        // join nonCompDeliveries and compDeliveries:
        let totalDeliveries = [...nonCompDeliveries, ...compDeliveries];
        setSelectedOrder(totalDeliveries.find((delivery) => delivery.id === id));
    }




    // fetch completed deliveries:
    const [compDeliveries, setCompDeliveries] = useState([
        {
            date: '12/12/2021', id: '1', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
        {
            date: '12/12/2021', id: '2', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
        {
            date: '12/12/2021', id: '3', items: [
                { name: 'Parol', quantity: '2' },
                { name: 'Arveles', quantity: '3' },
                { name: 'Nexium', quantity: '1' },]
        },
    ]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/deliveries');
    //             if (!response.ok) {
    //                 throw new Error('Something went wrong!');
    //             }

    //             const data = await response.json();
    //             setCompDeliveries(data);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    return (
        <div className='generalHolder'>
            <div>
                <h1 className='deliveriesTitle'>Non-Completed Orders</h1>
                <div className='deliveriesHolder'>
                    <div className='deliveriesRow'>
                        <p className='pFirstOne'>Date</p>
                        <p className='pFirstOne'>Order ID</p>
                        <p className='pSecondOne'>Actions</p>
                    </div>
                    {nonCompDeliveries.map((delivery) =>
                        <div className='deliveriesRow'>
                            <p className='pFirstOne'>{delivery.date}</p>
                            <p className='pFirstOne'>{delivery.id}</p>
                            <p className='pSecondOne'>
                                <button className='deliveriesButton' onClick={() => viewButtonHandler(true, delivery.id)}>View</button>
                            </p>
                        </div>
                    )}
                </div>
                <h1 className='deliveriesTitle'>Completed Orders</h1>
                <div className='deliveriesHolder2'>
                    <div className='deliveriesRow'>
                        <p className='pFirstOne'>Date</p>
                        <p className='pFirstOne'>Order ID</p>
                        <p className='pSecondOne'>Actions</p>
                    </div>
                    {compDeliveries.map((delivery) =>
                        <div className='deliveriesRow'>
                            <p className='pFirstOne'>{delivery.date}</p>
                            <p className='pFirstOne'>{delivery.id}</p>
                            <p className='pSecondOne'>
                                <button className='deliveriesButton' onClick={() => viewButtonHandler(false, delivery.id)}>View</button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {showNewDeliveryForm &&
                <div className='deliveryDetailsHolder'>
                    <h1 className='deliveryDetailsTitle'>Order ID: {selectedOrder.id}</h1>
                    {selectedOrder.items.map((item) =>
                        <div className='deliveryDetailInfoHolder'>
                            <p className='deliveryDetailInfo'>{item.name} x{item.quantity}</p>
                        </div>
                    )}
                    <h1 className='deliveryDetailsTitle2'>Address:</h1>
                    <p className='deliveryDetailInfo'>Sofia, 1000, bul. Vitosha 100</p>
                    {showButtons &&
                        <div className='deliveryDetailsButtonsHolder'>
                            <button className='deliveryDetailsButton'>Cancel Order</button>
                            <button className='deliveryDetailsButton'>Mark as Completed</button>
                        </div>}
                </div>
            }
        </div>
    );
}

export default Deliveries;