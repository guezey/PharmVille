import "./SystemReports.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';


const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

function SystemReports() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [getAllTimeData, setGetAllTimeData] = useState(false);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleGetAllTimeDataChange = (e) => {
        setGetAllTimeData((prevValue) => !prevValue);
        if (getAllTimeData) {
            setStartDate(null);
            setEndDate(null);
        }
    };

    // state for showing reports
    const [showReports, setShowReports] = useState(true);

    // state for medicineArr:
    const [listOfMedicineArr, setListOfMedicineArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    // fetch medicine data:
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/medicine', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        })
            .then(response => response.json())
            .then(data => {
                setListOfMedicineArr(data);
                setIsLoading(false);
                setError(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                setError(true);
            })
    }, []);

    const createSysRepHandler = () => {
        console.log("tık")
        console.log(startDate)
        console.log(endDate)
        console.log(getAllTimeData)
        // check if dates are valid:
        if (startDate !== null && endDate !== null && startDate > endDate) {
            setErrMsg("Start date must be before end date!");
        } else if (getAllTimeData) {
            // diğer türlü fetch system report:
            fetch('http://localhost:5000/report', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log(error);
                })

        }
        else {
            // diğer türlü fetch system report:
            fetch('http://localhost:5000/report', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        // show reports:
        setShowReports(true);
    }

    const handleClose = () => setError(false);

    // data state:
    const [data, setData] = useState([
        { date: '2023-05-01', productName: 'Product A', amountSold: 10, totalEarned: 100 },
        { date: '2023-05-02', productName: 'Product B', amountSold: 8, totalEarned: 80 },
        { date: '2023-05-03', productName: 'Product C', amountSold: 15, totalEarned: 150 },
    ]);

    // for pie chart:
    const [data2, setData2] = [
        { product: 'Product A', sales: 100 },
        { product: 'Product B', sales: 80 },
        { product: 'Product C', sales: 150 },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Modal show={error} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>{errMsg}</Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
                <div className="reportSelectorHolder">
                    <h1 className="systemReportsTitle">New System Report</h1>
                    <div className="dateArranger">
                        <div>
                            <label>Start Date:</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select start date"
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select end date"
                            />
                        </div>
                    </div>
                    <div className="dateArranger">
                        <label>
                            <input
                                type="checkbox"
                                checked={getAllTimeData}
                                onChange={handleGetAllTimeDataChange}
                            />
                            Get all time data
                        </label>
                    </div>
                    <button className="buttonSysRep" onClick={createSysRepHandler}>Create System Report</button>
                </div>
            </div>
            {showReports &&
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Amount Sold</th>
                                <th>Total Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.top3_most_sold && data.top3_most_sold.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.name}</td>
                                        <td>{row.order_count}</td>
                                        <td>{row.price}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="analysisHolder">
                        <h1 className="systemReportsTitle">Order Status (For Selected Dates)</h1>
                        <p className="reportDetailInfo">Total Earned: {data ? data.revenue : "No data found"}</p>
                        <p className="reportDetailInfo">Total Orders: {data ? data.order_count : "No data found"}</p>
                        <p className="reportDetailInfo">Highest Revenue Date: {data.max_revenue_date ? data.max_revenue_date.order_date : "No data found"}</p>
                        <p className="reportDetailInfo">Total Number of Canceled Orders: {data ? data.canceled_orders_count : "No data found"}</p>
                    </div>
                </div>}
            {showReports &&
                <div className="chartHolder">
                   
                </div>}
        </div>
    );
}

export default SystemReports;