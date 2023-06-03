import React, { useState, useEffect } from 'react';
import "./PrescriptionFilter.css";
import upArr from '../images/up-arrow-icon.png';
import downArr from '../images/down-arrow-icon.png';

function PrescriptionFilter(props) {
    const [showClassesOptions, setShowClassesOptions] = useState(true);
    const [showUndesiredSideEffects, setShowUndesiredSideEffect] = useState(true);
    const [showPrescType, setShowPrescType] = useState(true);
    const [showAgeGroup, setShowAgeGroup] = useState(false);
    const [showIntake, setShowIntake] = useState(false);
    const [showMedicineType, setShowMedicineType] = useState(false);

    // state for fetching drug filter options:
    const [filterOptions, setFilterOptions] = useState([]);

    // fetch drug filter options:
    useEffect(() => {
        fetch('http://localhost:5000/medicine/filter_options')

            .then(response => response.json())
            .then(data => {
                setFilterOptions(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleDrugClassClick = () => {
        setShowClassesOptions(!showClassesOptions)
    }
    const [drugClass, setDrugClass] = useState([]);

    const handleDrugClassChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setDrugClass([...drugClass, value]); // Add the value to the array
        } else {
            setDrugClass(drugClass.filter(option => option !== value)); // Remove the value from the array
        }
        console.log(drugClass)
    };

    useEffect(() => {
        props.onDrugSelection(drugClass); // Call the callback function with the updated array
    }, [drugClass, props.onDrugSelection]);

    const handleUndSideEffClick = () => {
        setShowUndesiredSideEffect(!showUndesiredSideEffects)
    }

    const [undesiredEff, setUndesiredEff] = useState([]);
    const handleUndSideEffChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setUndesiredEff([...undesiredEff, value]); // Add the value to the array
        } else {
            setUndesiredEff(undesiredEff.filter(option => option !== value)); // Remove the value from the array
        }
    }

    useEffect(() => {
        props.onEffectSelection(undesiredEff); // Call the callback function with the updated array
    }, [undesiredEff, props.onEffectSelection]);

    // prescription type:
    const handlePrescTypeClick = () => {
        setShowPrescType(!showPrescType)
    }

    const [prescType, setPrescType] = useState([]);
    const handlePrescTypeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setPrescType([...prescType, value]); // Add the value to the array
        } else {
            setPrescType(prescType.filter(option => option !== value)); // Remove the value from the array
        }
    }
    useEffect(() => {
        props.onPrescSelection(prescType); // Call the callback function with the updated array
    }, [prescType, props.onPrescSelection]);


    // age group:
    const handleAgeGroupClick = () => {
        setShowAgeGroup(!showAgeGroup)
    }
    // state for age group:
    const [ageGroups, setAgeGroups] = useState([]);

    const handleAgeGroupChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setAgeGroups([...ageGroups, value]); // Add the value to the array
        } else {
            setAgeGroups(ageGroups.filter(option => option !== value)); // Remove the value from the array
        }
    }
    useEffect(() => {
        props.onAgeSelection(ageGroups); // Call the callback function with the updated array
    }, [ageGroups, props.onAgeSelection]);

    // intake method:
    // state for intake method:
    const [intakeMethod, setIntakeMethod] = useState([]);

    const handleIntakeClick = () => {
        setShowIntake(!showIntake)
    }

    const handleIntakeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setIntakeMethod([...intakeMethod, value]); // Add the value to the array
        } else {
            setIntakeMethod(intakeMethod.filter(option => option !== value)); // Remove the value from the array
        }
    }
    useEffect(() => {
        props.onIntakeSelection(intakeMethod); // Call the callback function with the updated array
    }, [intakeMethod, props.onIntakeSelection]);

    return (
        <div className='filterPrescHolder'>
            <div className='genComp'>
                <a onClick={handleDrugClassClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Drug Class</label>
                        {showClassesOptions && <img src={upArr} className='arrowSize'></img>}
                        {!showClassesOptions && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showClassesOptions && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="feverReducer" onChange={handleDrugClassChange} name="class" />
                            <label className='buttonLabel'>Fever Reducer</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="painkiller" onChange={handleDrugClassChange} name="class" />
                            <label className='buttonLabel'>Painkiller</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="therapeutic" onChange={handleDrugClassChange} name="class" />
                            <label className='buttonLabel'>Therapeutic</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="hormonal" onChange={handleDrugClassChange} name="class" />
                            <label className='buttonLabel'>Hormonal</label>
                        </div>
                    </div>

                )}
            </div>
            <div className='genComp'>
                <a onClick={handleUndSideEffClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Undesired Side Effects</label>
                        {showUndesiredSideEffects && <img src={upArr} className='arrowSize'></img>}
                        {!showUndesiredSideEffects && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showUndesiredSideEffects && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="fever" onChange={handleUndSideEffChange} name="class" />
                            <label className='buttonLabel'>Fever</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="fatigue" onChange={handleUndSideEffChange} name="class" />
                            <label className='buttonLabel'>Fatigue</label>
                        </div>
                    </div>
                )}
            </div>
            <div className='genComp'>
                <a onClick={handlePrescTypeClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Prescription Type</label>
                        {showPrescType && <img src={upArr} className='arrowSize'></img>}
                        {!showPrescType && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showPrescType && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="red" onChange={handlePrescTypeChange} name="class" />
                            <label className='buttonLabel'>Fever</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="normal" onChange={handlePrescTypeChange} name="class" />
                            <label className='buttonLabel'>Fatigue</label>
                        </div>
                    </div>
                )}
            </div>
            <div className='genComp'>
                <a onClick={handleAgeGroupClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Age Group</label>
                        {showAgeGroup && <img src={upArr} className='arrowSize'></img>}
                        {!showAgeGroup && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showAgeGroup && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="neonates" onChange={handleAgeGroupChange} name="class" />
                            <label className='buttonLabel'>Neonates</label>
                        </div>
                    </div>
                )}
            </div>
            <div className='genComp'>
                <a onClick={handleIntakeClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Intake Method</label>
                        {showIntake && <img src={upArr} className='arrowSize'></img>}
                        {!showIntake && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showIntake && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="oral" onChange={handleIntakeChange} name="class" />
                            <label className='buttonLabel'>Oral</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="injection" onChange={handleIntakeChange} name="class" />
                            <label className='buttonLabel'>Injection</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PrescriptionFilter;