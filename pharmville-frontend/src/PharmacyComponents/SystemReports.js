import "./SystemReports.css"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from 'react-chartjs-2';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';


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

    // data state:
    const [data, setData] = useState([
        { date: '2023-05-01', productName: 'Product A', amountSold: 10, totalEarned: 100 },
        { date: '2023-05-02', productName: 'Product B', amountSold: 8, totalEarned: 80 },
        { date: '2023-05-03', productName: 'Product C', amountSold: 15, totalEarned: 150 },
    ]);

    // for pie chart:
    const data2 = [
        { product: 'Product A', sales: 100 },
        { product: 'Product B', sales: 80 },
        { product: 'Product C', sales: 150 },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <div>
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

                </div>
            </div>
            {showReports &&
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product Name</th>
                                <th>Amount Sold</th>
                                <th>Total Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.date}</td>
                                    <td>{row.productName}</td>
                                    <td>{row.amountSold}</td>
                                    <td>{row.totalEarned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="analysisHolder">
                        <h1 className="systemReportsTitle">Order Status (For Selected Dates)</h1>
                        <p className="reportDetailInfo">Total Earned: 2217,7 TL</p>
                        <p className="reportDetailInfo">Total Orders: 12</p>
                        <p className="reportDetailInfo">Highest Revenue Date: 12-03-23</p>
                        <p className="reportDetailInfo">Total Number of Canceled Orders: 1</p>
                    </div>
                </div>}
            {showReports &&
                <div className="chartHolder">
                    <VictoryChart>
                        <VictoryAxis
                            dependentAxis
                            domainPadding={10}
                        />
                        <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} />
                        <VictoryBar
                            data={data2}
                            x="product"
                            y="sales"
                            style={{ data: { fill: '#91AF9D' } }}
                            barWidth={12} // Adjust the bar width as desired
                            alignment="start"
                        />
                    </VictoryChart>
                </div>}
        </div>
    );
}

export default SystemReports;