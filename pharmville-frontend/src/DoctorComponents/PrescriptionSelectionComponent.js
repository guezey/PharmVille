import "./PrescSelectionComp.css";
import React, { useState } from 'react';

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


    return (
        <div className="divPrescArranger">

            <div className="selectionHolder">
                <div className="prescFirstCol">
                    <h1 className="prescTitle">Prescription</h1>
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
                </div>
            </div>

            {showAddMedicine &&
                <div className="selectionHolder">


                </div>
            }

        </div>
    );

}

export default PrescriptionSelectionComponent;