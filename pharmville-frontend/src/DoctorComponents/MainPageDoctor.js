import "./MainPageDoctor.css";
import searchIcon from '../images/search-icon.png';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrescriptionSelectionComponent from "./PrescriptionSelectionComponent";


function MainPageDoctor() {

    // to search for TCK
    const [searchText, setSearchText] = useState('');
    // var to check if the given input is true

    const [isTCKCorrect, setIsTCKCorrect] = useState(false);

    // state to show warning msg
    const [showWarning, setShowWarning] = useState(false);

    // error handler for TCK search
    const [error, setError] = useState(false);

    // state to show patient info
    const [patientInfo, setPatientInfo] = useState([]);

    const fetchPatientData = () => {
        fetch('http://localhost:5000/prescribe/' + searchText)
            .then(response => response.json())
            .then(data => {
                setIsTCKCorrect(true);
                setPatientInfo(data);
                console.log(data)
            })
            .catch(error => {
                //setIsTCKCorrect(false);
            });
        console.log("BURAYA GELİYON MU")
        console.log(patientInfo)
    };

    // state to show patient info
    const [showPatientInfo, setShowPatientInfo] = useState(false);

    // state to show next page
    const [showNextPage, setShowNextPage] = useState(false);

    const searchTCKHandler = () => {
        // Process search operation with searchText
        console.log(searchText);
        // check if TCK is correct
        // check if searcText is 11 digits:
        setIsTCKCorrect(searchText.length === 11);
        console.log(searchText.length === 11);
    };
    useEffect(() => {
        // Add an effect to monitor changes in isTCKCorrect
        if (isTCKCorrect) {
            console.log("isTCKCorrect is true");
            fetchPatientData();
            setShowPatientInfo(true);
            // Fetch patient data or perform any other actions
        }
        else {
            setShowWarning(true);
        }
    }, [isTCKCorrect]);

    const goToNextHandler = () => {
        // go to next page:
        setShowNextPage(true);
    };

    const handleClose = () => setShowWarning(false);

    return (
        <div>
            {!showNextPage &&
                <div className="prescMainHolder">
                    <div className="generalHolderPresc">
                        <div>
                            <p className="searchTitle">Select Patient</p>
                            <div className="search-bar">
                                <input
                                    type="number"
                                    placeholder="Enter Patient TCK"
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                    className="tckInput"
                                    min={1}
                                />
                            </div>
                            <div className="selectTCKButtonHolder">
                                <button className="selectTCKButton" onClick={searchTCKHandler}>Search</button>
                            </div>
                        </div>
                        <Modal show={showWarning} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Incorrect TCK Entry</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>For security, please enter the full TCK number of the patient and check the validity of the TCK</Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleClose}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>
                        {showPatientInfo &&
                            <div>
                                <div className="patientInfoHolder">
                                    <p className="searchTitle">Information of {searchText}</p>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Name:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">{patientInfo.name}  {patientInfo.surname}</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Age:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">{patientInfo.age}</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Weight:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">{patientInfo.weight} kg</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Height:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">{patientInfo.height} cm</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Gender:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">{patientInfo.gender}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="selectTCKButtonHolder2">
                                    <button className="selectTCKButton" onClick={goToNextHandler}>Next </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {showNextPage &&
                <div>
                    <PrescriptionSelectionComponent />
                </div>
            }
        </div>
    );
}

export default MainPageDoctor;