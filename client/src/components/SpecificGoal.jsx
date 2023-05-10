import React from "react";
import { useState } from 'react';
import "../assets/css/components/SpecificGoal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpecificGoal = () => {
	const [weight, setWeight] = useState(0);
      
        const handleIncrement = () => {
          setWeight(weight + 1);
        };
      
        const handleDecrement = () => {
          if (weight > 0) {
            setWeight(weight - 1);
          }
        };
      
        const handleInputChange = (event) => {
          const value = event.target.value;
          if (value >= 0) {
            setWeight(value);
          }
        };



  return (
    <div className='weightContainer'>
        
        <label className='setGoal'>Set Your Weight Goal (kg):</label>

        <div className='weightGoal'>
        
        
            <div className="input-stepper">
                <input
                className='input-weight'
                type="number"
                id="weight-input"
                value={weight}
                onChange={handleInputChange}
                />

                <div className="stepper">
                    
                    <FontAwesomeIcon icon="fa-solid fa-angle-up" onClick={handleIncrement} className='pointer' />

                    <FontAwesomeIcon icon="fa-solid fa-angle-down" onClick={handleDecrement} className='pointer' />
                
                </div>

            </div>
            
            <button className='done'>Done</button>
        
        </div>

    </div>

  );
};

export default SpecificGoal;
