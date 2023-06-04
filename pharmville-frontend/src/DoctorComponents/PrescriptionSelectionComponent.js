import "./PrescSelectionComp.css";
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import PrescriptionFilter from "./PrescriptionFilter";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
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

function PrescriptionSelectionComponent(props) {
    // check if state addMedicineSelected
    const [showAddMedicine, setShowAddMedicine] = useState(false);

    // state for added medicine array
    const [medicineArr, setMedicineArr] = useState([]);

    const addMedicineHandler = () => {
        setShowAddMedicine(true);
    };

    // delete clicked item
    const handleDelete = (id) => {
        const updatedItems = medicineArr.filter((_, i) => i !== id);
        setMedicineArr(updatedItems);
    };

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDisease = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/prescribe");
                const newData = res.data;

                let uniqueOptions = [];
                console.log(options.length);
                if (options.length == 0) {
                    for (let i = 0; i < newData.length; i++) {
                        let bool = true;
                        for (let j = 0; j < options.length; j++) {
                            if (newData[i].name == options[j].value) {
                                bool = false;
                                break
                            }
                        }
                        if (bool) {
                            uniqueOptions.push({ value: newData[i].name, label: newData[i].name });
                        }
                    }
                }

                setOptions((prevOptions) => [...uniqueOptions]);
            } catch (error) {
                // Handle error
                console.error(error);
            }
            setLoading(false);
        };

        fetchDisease();
    }, []);

    // filter arranger:
    // state for which drug class will be selected:
    const [selectedDrugClass, setSelectedDrugClass] = useState([]);

    // state for selected undesired effects:
    const [selectedUndesiredEffects, setSelectedUndesiredEffects] = useState([]);

    // state for selected prescription type:
    const [selectedPrescriptionType, setSelectedPrescriptionType] = useState([]);

    // state for age group:
    const [selectedAge, setSelectedAge] = useState([]);

    // state for intake method:
    const [selectedIntake, setSelectedIntake] = useState([]);

    const handleDrugClassSelection = (data) => {
        // Update the information in the parent component
        setSelectedDrugClass(data);
    };

    const handleUndesiredEffects = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedUndesiredEffects(data);
        else
            setSelectedUndesiredEffects(null);
    };

    const handlePrescriptionType = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedPrescriptionType(data);
        else
            setSelectedPrescriptionType(null);
    };

    const handleAgeSelection = (data) => {
        // Update the information in the parent component
        if (data.length > 0)
            setSelectedAge(data);
        else
            setSelectedAge(null);
    };

    const handleIntakeSelection = (data) => {
        if (data.length > 0)
            setSelectedIntake(data);
        else
            setSelectedIntake(null);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // fetch medicine data:
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/medicine', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                medicine_classes: selectedDrugClass,
                side_effects: selectedUndesiredEffects,
                presc_types: selectedPrescriptionType,
                age_groups: selectedAge,
                intake_types: selectedIntake,
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
    }, [selectedDrugClass, selectedPrescriptionType, selectedUndesiredEffects, selectedAge, selectedIntake]);

    // state for fetching dosage types:
    const [filterOptions, setFilterOptions] = useState(null);
    // fetch drug classes:
    useEffect(() => {
        console.log("fetching filter options")
        fetch('http://localhost:5000/medicine/filter_options')

            .then(response => response.json())
            .then(data => {
                setFilterOptions(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    console.log(options);
    // state for selected disease causes arr:
    const [selectedCauses, setSelectedCauses] = useState([]);

    // FETCH MEDICINE:
    const [listOfMedicineArr, setListOfMedicineArr] = useState([]);

    // selected medicine (from dropdown):
    const [selectedMedicine, setSelectedMedicine] = useState("");
    const onDropdownMedicineSelect = (eventKey, event) => {
        setSelectedMedicine(eventKey)
    }

    // for test purposes:
    const [isSuitable, setIsSuitable] = useState(false);
    // fetch if medicine is suitable:
    useEffect(() => {
        console.log(selectedMedicine);
        const allowedMedicines = props.medicineDosageArr.map((medicine) => medicine.name);
        setIsSuitable(allowedMedicines.includes(selectedMedicine));
    }, [selectedMedicine]);


    // go to dosage arranger page:
    const [showSelectMed, setShowSelectMed] = useState(false);
    const [showSuitableMedWarning, setShowSuitableMedWarning] = useState(false);
    const [goToDosage, setGoToDosage] = useState(false);

    const goToDosageHandler = () => {
        // check if medicine is selected:
        if (selectedMedicine === "")
            setShowSelectMed(true);

        else if (isSuitable === false) {
            // TODO check if medicine is suitable!  
            //medicineNames.find((medicine) => medicine === name)
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
    const [dosageAmount, setDosageAmount] = useState("");

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

    // state for drug quantity:
    const [medicineQty, setMedicineQty] = useState("");

    const handleMedicineQty = (event) => {
        setMedicineQty(event.target.value);
    }


    // state for presc type:
    const [prescType, setPrescType] = useState('');
    const handlePrescTypeSelection = (event) => {
        setPrescType(event.target.value);
    }

    // go back to medicine selection page!
    const goBackMedicineSelection = () => {
        setShowAddMedicine(true);
        setGoToDosage(false);
        setShowSelectMed(false);
        setShowSuitableMedWarning(false);
    }

    // for test purposes:
    const [isDosageSuitable, setIsDosageSuitable] = useState(false);
    // fetch if dosage is suitable:
    useEffect(() => {
        const medicine = props.medicineDosageArr.find((medicine) => medicine.name === selectedMedicine);
        let dosage;
        let unit;
        if (medicine) {
            dosage = medicine.advised_dosage;
            unit = medicine.unit;
        }
        console.log(dosageAmount, dosageType, dosage, unit);
        console.log(dosageAmount == dosage);
        setIsDosageSuitable(dosageAmount == dosage);
    }, [dosageAmount, dosageType]);

    // warnings for dosage amount page:
    const [showIsDosageEnteredWarning, setIsDosageEnteredWarning] = useState(false);
    const [showSuitableDosageWarning, setShowSuitableDosageWarning] = useState(false);

    // add medicine to the precription handler:
    const addMedicineToPrescHandler = () => {
        // pseudo var to check if suitable:
        // check if fields are full:
        if (dosageAmount === "" || dosageType === "")
            setIsDosageEnteredWarning(true);
        else if (!isDosageSuitable) {
            console.log("dosage is not suitable");

            setShowSuitableDosageWarning(true);
        }
        else {
            // if full:
            setShowAddMedicine(false);
            setGoToDosage(false);
            setMedicineArr([...medicineArr, { name: selectedMedicine, dosage_amount: dosageAmount, dosage_type: dosageType, medicine_desc: medicineDesc, count: medicineQty }]);
        }
    }

    const addMedicineToPrescAfterWarning = () => {
        setShowAddMedicine(false);
        setGoToDosage(false);
        setMedicineArr([...medicineArr, { name: selectedMedicine, dosage_amount: dosageAmount, dosage_type: dosageType, medicine_desc: medicineDesc, count: medicineQty }]);
        setShowSuitableDosageWarning(false);
        setIsDosageEnteredWarning(false);
    }

    const handleDosageWarningClose = () => {
        setIsDosageEnteredWarning(false)
    }

    const handleDosageWarning2Close = () => {
        setShowSuitableDosageWarning(false);
    }

    // en baba function:
    // submits the medicine array (the prescription),
    // also, the prescription cause

    // warnings for submit state:
    const [showCauseEmptyWarning, setCauseEmptyWarning] = useState(false);

    const [submitWarning, setSubmitWarning] = useState(false);
    const [submitMsg, setsubmitMsg] = useState("");

    const [isSubmitPressed, setIsSubmitPressed] = useState(false);

    const handleSubmitClose = () => {
        setSubmitWarning(false);
    }

    useEffect(() => {
        if (isSubmitPressed) {
            const submitPrescriptionHandler = () => {
                console.log("submitting prescription");
                console.log(selectedCauses);
                // check if presc cause is empty:
                if (selectedCauses.length <= 0)
                    setCauseEmptyWarning(true);
                else if (medicineArr.length <= 0) {
                    setSubmitWarning(true);
                    setsubmitMsg("Please add at least one medicine to the prescription");
                }
                else if (prescType === "" || prescType === "None") {
                    setSubmitWarning(true);
                    setsubmitMsg("Please select a prescription type");
                }
                else {
                    setCauseEmptyWarning(false);
                    setShowAddMedicine(false)
                    setShowSelectMed(false)
                    setShowSuitableDosageWarning(false)
                    setShowSuitableMedWarning(false);
                    setGoToDosage(false)
                    setIsDosageEnteredWarning(false)
                    // submit aşko:
                    const requestBody = {
                        type: prescType,
                        medicines: medicineArr,
                        diseases: selectedCauses,
                      };
                      
                      console.log('Request Body:', JSON.stringify(requestBody));
                    console.log("submitting prescription");
                    fetch('http://localhost:5000/prescribe/' + props.TCK, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            type: prescType,
                            medicines: medicineArr,
                            diseases: selectedCauses,
                        }
                        )

                    })
                        .then(response => response.json())
                        .then(data => {
                            setIsSubmitted(true);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    
                    setTimeout(() => {
                        // Reset the success message state
                        setIsSubmitted(false);
                        // Navigate to the desired page

                        //window.location.reload();
                        //
                    }, 800); // Wait for 2 seconds (adjust as needed)
                }
            }
            submitPrescriptionHandler();
        }
    }, [isSubmitPressed]);

    const submitPrescription = () => {
        setIsSubmitPressed(true);
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
                        <h1 className="prescTitle">Prescription for {props.TCK}</h1>
                        <button className="addMedicineBtn" onClick={addMedicineHandler}>Add Medicine</button>
                    </div>

                    <div className="prescSecondCol">
                        {medicineArr.map((medicine, index) => (
                            <div key={index} className="medicineInPresc">
                                <p className="medicineContentPar">{medicine.name}</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">{medicine.dosage_amount + " " + medicine.dosage_type}</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">{medicine.count}</p>
                                <div className="verticalLine"></div>
                                <p className="medicineContentPar">{medicine.medicine_desc}</p>
                                <button className="deleteMedicineBtn" onClick={() => handleDelete(index)}>Delete</button>
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
                        <h1 className="prescTitle">Select Prescription Type</h1>
                        <select className="prescCauseSelect" onChange={handlePrescTypeSelection}>
                            {filterOptions && filterOptions.presc_types.map((presc_type, index) => (
                                <option value={presc_type} key={index}>{presc_type}</option>
                            ))}
                        </select>
                    </div>


                    <button className="submitPrescBtn" onClick={submitPrescription}>Submit Prescription</button>
                    <Modal show={showCauseEmptyWarning} onHide={handleCauseWarningClose}>
                        <Modal.Body>Please select prescription cause!</Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleCauseWarningClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={submitWarning} onHide={handleSubmitClose}>
                        <Modal.Body>{submitMsg}</Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleSubmitClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {showAddMedicine &&
                    <div className="selectionHolder">
                        <div className="medicineSelectionDiv">
                            <PrescriptionFilter onDrugSelection={handleDrugClassSelection}
                                onEffectSelection={handleUndesiredEffects} onPrescSelection={handlePrescriptionType}
                                onAgeSelection={handleAgeSelection} onIntakeSelection={handleIntakeSelection} />
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
                        <label>Per Take:</label>
                            <div className="dosageDropdownHolder">
                                <div className="dosageInput">
                                    <label>Dosage Amount:</label>
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
                                    <label>Dosage Unit:</label>
                                    <select value={dosageType} onChange={handleDosageType}>
                                        <option value="">unit</option>
                                        {filterOptions.units.map((unit, index) => (
                                            <option value={unit}>{unit}</option>
                                        ))}
                                    </select>
                                </div>


                            </div>
                            <div className="dosageInput">
                                <label>Box Count:</label>
                                <input
                                    type="number"
                                    value={medicineQty}
                                    onChange={handleMedicineQty}
                                    min={1}
                                    step={1}
                                    required
                                />
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