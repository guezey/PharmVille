import "./PrescSelectionComp.css";
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import PrescriptionFilter from "./PrescriptionFilter";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

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

function PrescriptionSelectionComponent() {


    // check if state addMedicineSelected
    const [showAddMedicine, setShowAddMedicine] = useState(false);

    // state for added medicine array
    const [medicineArr, setMedicineArr] = useState([1, 2, 1, 1, 1, 1]);

    const addMedicineHandler = () => {
        setShowAddMedicine(true);
    };

    // delete clicked item
    const handleDelete = (id) => {
        const updatedItems = medicineArr.filter((_, i) => i !== id - 1);
        setMedicineArr(updatedItems);
    };

    // fetch disease causes arr:
    // TODO (şimdilik pseudo arr)
    const options = [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },];

    // state for selected disease causes arr:
    const [selectedCauses, setSelectedCauses] = useState([]);

    // FETCH MEDICINE:
    // şimdilik pseudo:
    const listOfMedicineArr = [
        { id: 1, name: "parol" },
        { id: 2, name: "marol" },
        { id: 3, name: "nexium" },
        { id: 4, name: "ibuprofen" },
        { id: 5, name: "zaşgkmglkm" },
    ]

    // selected medicine (from dropdown):
    const [selectedMedicine, setSelectedMedicine] = useState("");
    const onDropdownMedicineSelect = (eventKey, event) => {
        setSelectedMedicine(eventKey)
    }

    // for test purposes:
    useEffect(() => {
        console.log(selectedMedicine);
    }, [selectedMedicine]);


    // go to dosage arranger page:
    const [showSelectMed, setShowSelectMed] = useState(false);
    const [showSuitableMedWarning, setShowSuitableMedWarning] = useState(false);
    const [goToDosage, setGoToDosage] = useState(false);

    const goToDosageHandler = () => {
        let isSuitable = false;
        // check if medicine is selected:
        if (selectedMedicine === "")
            setShowSelectMed(true);

        else if (isSuitable === false) {
            // TODO check if medicine is suitable!  
            setShowSuitableMedWarning(true)
        }
        else // if correct
        {
            setShowAddMedicine(false);
            setGoToDosage(true);
        }

    }

    const handleClose = () => setShowSelectMed(false);
    const handleCloseSuitableWarning = () => setShowSuitableMedWarning(false);

    const handleMedicineSelection = () => {
        setShowSuitableMedWarning(false);
        setShowAddMedicine(false);
        setGoToDosage(true);
    }

    // for dosage amount:
    const [dosageAmount, setDosageAmount] = useState(1);

    const handleDosageAmount = (event) => {
        setDosageAmount(event.target.value);
    }

    // for dosage type:
    const [dosageType, setDosageType] = useState('');

    const handleDosageType = (event) => {
        setDosageType(event.target.value);
    }

    // state for dosage description:
    const [medicineDesc, setMedicineDesc] = useState('');

    const handleMedicineDesc = (event) => {
        setMedicineDesc(event.target.value);
    }

    // go back to medicine selection page!
    const goBackMedicineSelection = () => {
        setShowAddMedicine(true);
        setGoToDosage(false);
        setShowSelectMed(false);
        setShowSuitableMedWarning(false);
    }

    // warnings for dosage amount page:
    const [showIsDosageEnteredWarning, setIsDosageEnteredWarning] = useState(false);
    const [showSuitableDosageWarning, setShowSuitableDosageWarning] = useState(false);

    // add medicine to the precription handler:
    const addMedicineToPrescHandler = () => {
        // pseudo var to check if suitable:
        let isDosageSuitable = false;
        // check if fields are full:
        if (dosageAmount === "" || dosageType === "")
            setIsDosageEnteredWarning(true);
        else if (!isDosageSuitable) {
            setShowSuitableDosageWarning(true);
        }
        else {
            // if full:
            setShowAddMedicine(false);
            setGoToDosage(false);
            setMedicineArr([...medicineArr, 31]);
        }
    }

    const addMedicineToPrescAfterWarning = () => {
        setShowAddMedicine(false);
        setGoToDosage(false);
        setMedicineArr([...medicineArr, 31]);
        setShowSuitableDosageWarning(false);
        setIsDosageEnteredWarning(false);
    }

    const handleDosageWarningClose = () => {
        setIsDosageEnteredWarning(false)
    }

    const handleDosageWarning2Close = () => {
        setShowSuitableMedWarning(false);
    }

    // en baba function:
    // submits the medicine array (the prescription),
    // also, the prescription cause

    // warnings for submit state:
    const [showCauseEmptyWarning, setCauseEmptyWarning] = useState(false);

    const navigate = useNavigate();

    const submitPrescriptionHandler = () => {
        // check if presc cause is empty:
        if (selectedCauses.length <= 0)
            setCauseEmptyWarning(true);
        else {
            setCauseEmptyWarning(false);
            setShowAddMedicine(false)
            setShowSelectMed(false)
            setShowSuitableDosageWarning(false)
            setShowSuitableMedWarning(false);
            setGoToDosage(false)
            setIsDosageEnteredWarning(false)
            // submit aşko:
            //TODO!!
            setIsSubmitted(true);
            setTimeout(() => {
                // Reset the success message state
                setIsSubmitted(false);
                // Navigate to the desired page
                
                window.location.reload();
            }, 800); // Wait for 2 seconds (adjust as needed)
        }
    }

    const handleCauseWarningClose = () => {
        setCauseEmptyWarning(false)
    }

    // warnings for submit state:
    const [isSubmitted, setIsSubmitted] = useState(false);


    return (
        <div>
            {isSubmitted &&
                <div className="alertDiv">
                    <Alert variant="success">
                        Submitted
                    </Alert>
                </div>
            }
            <div className="divPrescArranger">
                <div className="selectionHolder">
                    <div className="prescFirstCol">
                        <h1 className="prescTitle">Prescription for 33550505334</h1>
                        <button className="addMedicineBtn" onClick={addMedicineHandler}>Add Medicine</button>
                    </div>

                    <div className="prescSecondCol">
                        {medicineArr.map(medicine => (
                            <div key={medicine.id} className="medicineInPresc">
                                <p className="medicineContentPar">Nexium</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">3 mg</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">Amount: 2</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">Take 2 times a day</p>
                                <button className="deleteMedicineBtn" onClick={() => handleDelete(medicine.id)}>Delete</button>
                            </div>
                        ))}
                    </div>

                    <div className="prescThirdCol">
                        <h1 className="prescTitle">Select Causes for Prescription</h1>
                        <Select
                            defaultValue={selectedCauses}
                            onChange={setSelectedCauses}
                            options={options}
                            isMulti={true}
                        />
                    </div>
                    <button className="submitPrescBtn" onClick={submitPrescriptionHandler}>Submit Prescription</button>
                    <Modal show={showCauseEmptyWarning} onHide={handleCauseWarningClose}>
                        <Modal.Body>Please select prescription cause!</Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleCauseWarningClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {showAddMedicine &&
                    <div className="selectionHolder">
                        <div className="medicineSelectionDiv">
                            <PrescriptionFilter />
                            <div className="medicineSearcherBox">
                                <h1 className="prescTitle">Selected drug: {selectedMedicine}</h1>
                                <Dropdown onSelect={onDropdownMedicineSelect}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Select or Search Medicine
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={CustomMenu} variant="dark">
                                        {listOfMedicineArr.map(item => (
                                            <Dropdown.Item eventKey={item.name} active key={item.id}>{item.name}</Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                            <div>
                                <button className="nextButtonHolder" onClick={goToDosageHandler}>Next</button>
                            </div>

                        </div>
                        <Modal show={showSelectMed} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Medicine!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Please select a medicine first</Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleClose}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showSuitableMedWarning} onHide={handleCloseSuitableWarning}>

                            <Modal.Body>Selected drug is not suitable for this specific age group!</Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleCloseSuitableWarning}>
                                    Close
                                </button>
                                <button onClick={handleMedicineSelection}>
                                    Add Anyway
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                }

                {goToDosage &&
                    <div className="selectionHolder">
                        <h1 className="prescTitle2">Drug Name: {selectedMedicine}</h1>
                        <div className="dosageHolder">
                            <div className="dosageDropdownHolder">
                                <div className="dosageInput">
                                    <input
                                        type="number"
                                        value={dosageAmount}
                                        onChange={handleDosageAmount}
                                        min={1}
                                        step={1}
                                        required
                                    />
                                </div>
                                <div className="dosageInput2">
                                    <select value={dosageType} onChange={handleDosageType}>
                                        <option value="option1">mg</option>
                                        <option value="option2">ml</option>
                                        <option value="option3">tablet</option>
                                    </select>
                                </div>


                            </div>
                            <div className="dosageInput3">
                                <input
                                    type="text"
                                    value={medicineDesc}
                                    onChange={handleMedicineDesc}
                                    placeholder="Enter additional description about the medicine usage"
                                    style={{ height: "60px" }}
                                />
                            </div>
                        </div>
                        <div className="dosageBtnHolder">
                            <button className="dosageBtn1" onClick={goBackMedicineSelection}>Back</button>
                            <button className="dosageBtn2" onClick={addMedicineToPrescHandler}>Add Medicine</button>
                        </div>
                        <Modal show={showIsDosageEnteredWarning} onHide={handleDosageWarningClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Please fill relevant fields!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Please enter dosage amount and type</Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleDosageWarningClose}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showSuitableDosageWarning} onHide={handleDosageWarning2Close}>

                            <Modal.Body>Selected dosage is not suitable for this specific age group!</Modal.Body>
                            <Modal.Footer>
                                <button onClick={handleDosageWarning2Close}>
                                    Close
                                </button>
                                <button onClick={addMedicineToPrescAfterWarning}>
                                    Add Anyway
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                }

            </div>
        </div>
    );

}

export default PrescriptionSelectionComponent;