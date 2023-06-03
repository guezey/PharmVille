import React, { useState, useEffect } from 'react';
import "./Filter.css";
import upArr from '../../images/up-arrow-icon.png';
import downArr from '../../images/down-arrow-icon.png';

function Filter() {
  const [selectedProductType, setSelectedProductType] = useState('medicine');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showProductTypeOptions, setShowProductTypeOptions] = useState(true);
  const [showClassesOptions, setShowClassesOptions] = useState(false);
  const [showUndesiredSideEffects, setShowUndesiredSideEffect] = useState(false);
  const [showPrescType, setShowPrescType] = useState(false);
  const [showAgeGroup, setShowAgeGroup] = useState(false);
  const [showIntake, setShowIntake] = useState(false);
  //const [showMedicineType, setShowMedicineType] = useState(false);
  const [showAroma, setShowAroma] = useState(false);
  const [showSCareCat, setShowSCareCat] = useState(false);
  const [showSkinType, setShowSkinType] = useState(false);

  // state for fetching drug classes:
  const [filterOptions, setFilterOptions] = useState([]);

  // fetch drug classes:
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

  

  // state for fetching undesired side effects:
  const [undesiredSideEffects, setUndesiredSideEffects] = useState([]);

  const handleProductTypeClick = () => {
    setShowProductTypeOptions(!showProductTypeOptions)
  }

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value)
    console.log(selectedProductType)
  };

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
/*
  // medicine type:
  const handleMedicineTypeClick = () => {
    setShowMedicineType(!showMedicineType)
  }
  */

  // aroma
  const handleAromaClick = () => {
    setShowAroma(!showAroma)
  }

  const handleAromaChange = () => {
    console.log("aroma değişti");
  }

  // skin care type
  const handleScareClick = () => {
    setShowSCareCat(!showSCareCat)
  }

  const handleScareChange = () => {
    console.log("skin care category değişti");
  }

  // skin type
  const handleSkinTypeClick = () => {
    setShowSkinType(!showSkinType)
  }

  const handleSkinTypeChange = () => {
    console.log("skin type category değişti");
  }

  return (
    <div className='filterHolder'>
      <div className='genComp'>
        <a onClick={handleProductTypeClick}>
          <div className='filterComponent'>
            <label className='filterLabel'>Product Type</label>
            {showProductTypeOptions && <img src={upArr} className='arrowSize'></img>}
            {!showProductTypeOptions && <img src={downArr} className='arrowSize'></img>}
          </div>
        </a>
        <hr></hr>
        {showProductTypeOptions &&
          <div className="radio-buttons">
            <div className='buttonElements'>
              <input type="radio" value="medicine" onChange={handleProductTypeChange} id="type1" name="type" checked={selectedProductType === "medicine"} />
              <label className='buttonLabel'>Medicine</label>
            </div>
            <div className='buttonElements'>
              <input type="radio" value="ppowder" onChange={handleProductTypeChange} id="type2" name="type" checked={selectedProductType === "ppowder"} />
              <label className='buttonLabel'>Protein Powder</label></div>
            <div className='buttonElements'>
              <input type="radio" value="scare" onChange={handleProductTypeChange} id="type3" name="type" checked={selectedProductType === "scare"} />
              <label className='buttonLabel'>Skin Care Products</label></div>
          </div>
        }
      </div>
      {selectedProductType === "medicine" &&
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
              {filterOptions.medicine_class.map((item, index) =>
                <div className='buttonElements' key={index}>
                  <input type="checkbox" value={item} onChange={handleDrugClassChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>
              )}
            </div>
          )}
        </div>
      }

      {selectedProductType === "medicine" &&
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
              {filterOptions.side_effects.map((item, index) =>
                <div className='buttonElements'>
                  <input type="checkbox" value={item.effect_name} onChange={handleUndSideEffChange} name="class" />
                  <label className='buttonLabel'>{item.effect_name}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "medicine" &&
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
              {filterOptions.presc_types.map((item, index) =>
                <div className='buttonElements'>
                  <input type="checkbox" value={item} onChange={handlePrescTypeChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "medicine" &&
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
              {filterOptions.age_groups.map((item, index) =>
                <div className='buttonElements'>
                  <input type="checkbox" value={item.gorup_name} onChange={handleAgeGroupChange} name="class" />
                  <label className='buttonLabel'>{item.group_name}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "medicine" &&
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
              {filterOptions.intake_types.map((item, index) =>
                <div className='buttonElements'>
                  <input type="checkbox" value={item} onChange={handleIntakeChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "ppowder" &&
        <div className='genComp'>
          <a onClick={handleAromaClick}>
            <div className='filterComponent'>
              <label className='filterLabel'>Aroma</label>
              {showAroma && <img src={upArr} className='arrowSize'></img>}
              {!showAroma && <img src={downArr} className='arrowSize'></img>}
            </div>
          </a>
          <hr></hr>
          {showAroma && (
            <div className='radio-buttons'>
              <div className='buttonElements'>
                <input type="checkbox" value="chocolate" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Chocolate</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="cookie" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Cookie</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="mocha" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Mocha</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="banana" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Banana</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="strawberry" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Strawberry</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="vanilla" onChange={handleAromaChange} name="class" />
                <label className='buttonLabel'>Vanilla</label>
              </div>
            </div>
          )}
        </div>
      }

      {selectedProductType === "scare" &&
        <div className='genComp'>
          <a onClick={handleScareClick}>
            <div className='filterComponent'>
              <label className='filterLabel'>Category</label>
              {showSCareCat && <img src={upArr} className='arrowSize'></img>}
              {!showSCareCat && <img src={downArr} className='arrowSize'></img>}
            </div>
          </a>
          <hr></hr>
          {showSCareCat && (
            <div className='radio-buttons'>
              <div className='buttonElements'>
                <input type="checkbox" value="lipbalm" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>Lip Balm</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="serum" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>Serum</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="bbcccream" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>BB-CC Cream</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="lotion" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>Lotion</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="eyecream" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>Eye Cream</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="tonic" onChange={handleScareChange} name="class" />
                <label className='buttonLabel'>Tonic</label>
              </div>
            </div>
          )}
        </div>
      }

      {selectedProductType === "scare" &&
        <div className='genComp'>
          <a onClick={handleSkinTypeClick}>
            <div className='filterComponent'>
              <label className='filterLabel'>Skin Type</label>
              {showSkinType && <img src={upArr} className='arrowSize'></img>}
              {!showSkinType && <img src={downArr} className='arrowSize'></img>}
            </div>
          </a>
          <hr></hr>
          {showSkinType && (
            <div className='radio-buttons'>
              <div className='buttonElements'>
                <input type="checkbox" value="lipbalm" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>Lip Balm</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="serum" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>Serum</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="bbcccream" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>BB-CC Cream</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="lotion" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>Lotion</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="eyecream" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>Eye Cream</label>
              </div>
              <div className='buttonElements'>
                <input type="checkbox" value="tonic" onChange={handleSkinTypeChange} name="class" />
                <label className='buttonLabel'>Tonic</label>
              </div>
            </div>
          )}
        </div>
      }

    </div>
  );
}

export default Filter;