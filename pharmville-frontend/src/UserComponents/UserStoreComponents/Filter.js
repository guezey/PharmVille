import React, { useState, useEffect } from 'react';
import "./Filter.css";
import upArr from '../../images/up-arrow-icon.png';
import downArr from '../../images/down-arrow-icon.png';

function Filter(props) {
  const [selectedProductType, setSelectedProductType] = useState('medicine');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showProductTypeOptions, setShowProductTypeOptions] = useState(true);
  const [showClassesOptions, setShowClassesOptions] = useState(false);
  const [showUndesiredSideEffects, setShowUndesiredSideEffect] = useState(false);
  const [showPrescType, setShowPrescType] = useState(false);
  const [showAgeGroup, setShowAgeGroup] = useState(false);
  const [showIntake, setShowIntake] = useState(false);
  const [showAroma, setShowAroma] = useState(false);
  const [showSCareCat, setShowSCareCat] = useState(false);
  const [showSkinType, setShowSkinType] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

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

  // state for fetching skincare filter options:
  const [skincareFilterOptions, setSkincareFilterOptions] = useState([]);

  // fetch skincare filter options:
  useEffect(() => {
    fetch('http://localhost:5000/skincare/filter_options')

      .then(response => response.json())
      .then(data => {
        setSkincareFilterOptions(data);
      })

      .catch(error => {
        console.log(error);
      })
  }, []);

  // state for fetching protein powder filter options:
  const [proteinPowderFilterOptions, setProteinPowderFilterOptions] = useState([]);

  // fetch protein powder filter options:
  useEffect(() => {
    fetch('http://localhost:5000/protein-powder/filter_options')

      .then(response => response.json())
      .then(data => {
        setProteinPowderFilterOptions(data);
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
  };

  useEffect(() => {
    props.onData(selectedProductType); // Call the callback function with the updated array
  }, [selectedProductType, props.onData]);

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

  // aroma
  const handleAromaClick = () => {
    setShowAroma(!showAroma)
  }

  // state for aroma:
  const [aroma, setAroma] = useState([]);

  const handleAromaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAroma([...aroma, value]); // Add the value to the array
    } else {
      setAroma(aroma.filter(option => option !== value)); // Remove the value from the array
    }
  }
  useEffect(() => {
    props.onAromaSelection(aroma); // Call the callback function with the updated array
  }, [aroma, props.onAromaSelection]);

  // skin care type
  const handleScareClick = () => {
    setShowSCareCat(!showSCareCat)
  }

  // state for skin care type:
  const [skinCareType, setSkinCareType] = useState([]);
  const handleScareChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSkinCareType([...skinCareType, value]); // Add the value to the array
    } else {
      setSkinCareType(skinCareType.filter(option => option !== value)); // Remove the value from the array
    }
  }
  useEffect(() => {
    props.onSkinCareSelection(skinCareType); // Call the callback function with the updated array
  }, [skinCareType, props.onSkinCareSelection]);

  // skin type
  const handleSkinTypeClick = () => {
    setShowSkinType(!showSkinType)
  }
  // state for skin type:
  const [skinType, setSkinType] = useState([]);

  const handleSkinTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSkinType([...skinType, value]); // Add the value to the array
    } else {
      setSkinType(skinType.filter(option => option !== value)); // Remove the value from the array
    }
  }
  useEffect(() => {
    props.onSkinTypeSelection(skinType); // Call the callback function with the updated array
  }, [skinType, props.onSkinTypeSelection]);

  const [newMinPrice, setNewMinPrice] = useState(1);
  const [newMaxPrice, setNewMaxPrice] = useState(5000);

  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleMinPriceChange = (event) => {
    let value = event.target.value;
    console.log("min price")
    console.log(value)
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event) => {
    let value = event.target.value;
    setMaxPrice(value);
    console.log("bu benim max price")
    console.log(event.target.value)
  };

  const handleSearchPrice = () => {
    setMaxPrice(parseInt(maxPrice));
    setMinPrice(parseInt(minPrice));
    if (maxPrice === null || maxPrice === '') {
      setNewMaxPrice(5000);
      setMaxPrice(5000);
    } else if (maxPrice < 0) {
      setNewMaxPrice(1);
      setMaxPrice(1);
    } else if (maxPrice < minPrice) {
      setNewMaxPrice(minPrice);
      setMaxPrice(minPrice);
    } else {
      setNewMaxPrice(maxPrice);
    }

    if (minPrice === null || minPrice === '') {
      setNewMinPrice(0);
      setMinPrice(0);
    } else if (minPrice > maxPrice) {
      setNewMinPrice(maxPrice);
      setMinPrice(maxPrice);
    } else if (minPrice < 0) {
      setNewMinPrice(1);
      setMinPrice(1);
    } else {
      setNewMinPrice(minPrice);
    }
  };
  useEffect(() => {
    props.onMaxChange(newMaxPrice); // Call the callback function with the updated array
  }, [newMaxPrice, props.onMaxChange]);
  useEffect(() => {
    props.onMinChange(newMinPrice); // Call the callback function with the updated value
  }, [newMinPrice, props.onMinChange]);

  const handlePriceClick = () => {
    setShowPrice(!showPrice);
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
              <input type="radio" value="protein-powder" onChange={handleProductTypeChange} id="type2" name="type" checked={selectedProductType === "protein-powder"} />
              <label className='buttonLabel'>Protein Powder</label></div>
            <div className='buttonElements'>
              <input type="radio" value="skincare" onChange={handleProductTypeChange} id="type3" name="type" checked={selectedProductType === "skincare"} />
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
                <div className='buttonElements' key={index}>
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
                  <input type="checkbox" value={item.group_name} onChange={handleAgeGroupChange} name="class" />
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

      {selectedProductType === "protein-powder" &&
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
              {proteinPowderFilterOptions.aromas.map((item, index) =>
                <div className='buttonElements' key={index}>
                  <input type="checkbox" value={item} onChange={handleAromaChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "skincare" &&
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
              {skincareFilterOptions.skincare_types.map((item, index) =>
                <div className='buttonElements' key={index}>
                  <input type="checkbox" value={item} onChange={handleScareChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>)}
            </div>
          )}
        </div>
      }

      {selectedProductType === "skincare" &&
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
              {skincareFilterOptions.skin_types.map((item, index) =>
                <div className='buttonElements' key={item}>
                  <input type="checkbox" value={item} onChange={handleSkinTypeChange} name="class" />
                  <label className='buttonLabel'>{item}</label>
                </div>
              )}
            </div>
          )}
        </div>
      }
      <div className='genComp'>
        <a onClick={handlePriceClick}>
          <div className='filterComponent'>
            <label className='filterLabel'>Price</label>
            {showPrice && <img src={upArr} className='arrowSize'></img>}
            {!showPrice && <img src={downArr} className='arrowSize'></img>}
          </div>
        </a>
        <hr></hr>
        {showPrice && (
          <div className='radio-buttons'>
            <div className="price-filter-container">
              <label className="price-filter-label">
                Min Price:
              </label>
              <label className="price-filter-label">
                Max Price:

              </label>
            </div>
            <div className="price-filter-container">
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                min={0}
                className="price-filter-input"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                min={0}
                className="price-filter-input"
              />
            </div>
            <div>
              <button className="price-filter-button" onClick={handleSearchPrice}>Search Price</button>
            </div>
          </div>
        )}
      </div>



    </div>
  );
}

export default Filter;