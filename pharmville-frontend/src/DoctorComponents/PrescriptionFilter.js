import React, { useState } from 'react';
import "./PrescriptionFilter.css";
import upArr from '../images/up-arrow-icon.png';
import downArr from '../images/down-arrow-icon.png';

function PrescriptionFilter() {
    const [showClassesOptions, setShowClassesOptions] = useState(true);
    const [showUndesiredSideEffects, setShowUndesiredSideEffect] = useState(true);
    const [showPrescType, setShowPrescType] = useState(true);
    const [showAgeGroup, setShowAgeGroup] = useState(false);
    const [showIntake, setShowIntake] = useState(false);
    const [showMedicineType, setShowMedicineType] = useState(false);

    const handleDrugClassClick = () => {
        setShowClassesOptions(!showClassesOptions)
    }

    const handleDrugClassChange = () => {
        console.log("değiştim")
    };

    const handleUndSideEffClick = () => {
        setShowUndesiredSideEffect(!showUndesiredSideEffects)
    }

    const handleUndSideEffChange = () => {
        console.log("und side eff değişti");
    }

    // prescription type:
    const handlePrescTypeClick = () => {
        setShowPrescType(!showPrescType)
    }

    const handlePrescTypeChange = () => {
        console.log("presc type değişti");
    }

    // age group:
    const handleAgeGroupClick = () => {
        setShowAgeGroup(!showAgeGroup)
    }

    const handleAgeGroupChange = () => {
        console.log("age group değişti");
    }

    // intake method:
    const handleIntakeClick = () => {
        setShowIntake(!showIntake)
    }

    const handleIntakeChange = () => {
        console.log("intake değişti");
    }

    // medicine type:
    const handleMedicineTypeClick = () => {
        setShowMedicineType(!showMedicineType)
    }

    const handleMedicineTypeChange = () => {
        console.log("medicine type değişti");
    }

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
            <div className='genComp'>
                <a onClick={handleMedicineTypeClick}>
                    <div className='filterComponent'>
                        <label className='filterLabel'>Medicine Type</label>
                        {showMedicineType && <img src={upArr} className='arrowSize'></img>}
                        {!showMedicineType && <img src={downArr} className='arrowSize'></img>}
                    </div>
                </a>
                <hr></hr>
                {showMedicineType && (
                    <div className='radio-buttons'>
                        <div className='buttonElements'>
                            <input type="checkbox" value="tablet" onChange={handleMedicineTypeChange} name="class" />
                            <label className='buttonLabel'>Tablet</label>
                        </div>
                        <div className='buttonElements'>
                            <input type="checkbox" value="syrup" onChange={handleIntakeChange} name="class" />
                            <label className='buttonLabel'>Syrup</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PrescriptionFilter;