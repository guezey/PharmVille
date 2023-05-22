import "./MainPageDoctor.css";
import searchIcon from '../images/search-icon.png';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrescriptionSelectionComponent from "./PrescriptionSelectionComponent";


function MainPageDoctor() {

    // to search for TCK
    const [searchText, setSearchText] = useState('');
    // var to check if the given input is true
    let isTCKCorrect = true;

    // state to show warning msg
    const [showWarning, setShowWarning] = useState(false);

    // state to show patient info
    const [showPatientInfo, setShowPatientInfo] = useState(false);

    // state to show next page
    const [showNextPage, setShowNextPage] = useState(false);

    const searchTCKHandler = () => {
        // Process search operation with searchText
        console.log(searchText);

        // check if TCK is correct

        // if TCK is not correct:
        if (!isTCKCorrect) {
            setShowWarning(true);
        }
        else // if correct:
        {
            console.log("TCK is: ")
            console.log(searchText);
            setShowPatientInfo(true);
        }
    };

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
                                    type="text"
                                    placeholder="Enter Patient TCK"
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                    className="tckInput"
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
                                    <p className="searchTitle">Information of 33350035325</p>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Name:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Ceren Akyar</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Age:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">21 (Adult)</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Weight:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">49 kg</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Height:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">155 cm</p>
                                        </div>
                                    </div>
                                    <div className="displayTCKInfoHolder">
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Gender:</p>
                                        </div>
                                        <div className="displayTCKInfoPar">
                                            <p className="displayTCKInfoPar2">Female</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="selectTCKButtonHolder2">
                                    <button className="selectTCKButton" onClick={goToNextHandler}>Next >></button>
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