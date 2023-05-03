import React, { useState } from 'react';
import "./Filter.css";
import upArr from '../../images/up-arrow-icon.png';
import downArr from '../../images/down-arrow-icon.png';

function Filter() {
  const [selectedProductType, setSelectedProductType] = useState('medicine');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showProductTypeOptions, setShowProductTypeOptions] = useState(true);
  const [showClassesOptions, setShowClassesOptions] = useState(false);
  const [showUndesiredSideEffects, setShowUndesiredSideEffect] = useState(false);

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

  const handleUndSideEffChange= () => {
    console.log("und side eff değişti");
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
              <input type="radio" value="medicine" onChange={handleProductTypeChange} id="type1" name="type" />
              <label className='buttonLabel'>Medicine</label>
            </div>
            <div className='buttonElements'>
              <input type="radio" value="ppowder" onChange={handleProductTypeChange} id="type2" name="type" />
              <label className='buttonLabel'>Protein Powder</label></div>
            <div className='buttonElements'>
              <input type="radio" value="scare" onChange={handleProductTypeChange} id="type3" name="type" />
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
      }

    </div>
  );
}

export default Filter;