import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function DropDown(props) {

    const [selectedOption, setSelectedOption] = useState("");
    const navigate=useNavigate();
    const options = props.data.map((option) => (
      <option key={option[1]} value={option[1]}>
        {option[1]}
      </option>
    ));
  
    const handleOptionSelect = (selectedOption) => {
        navigate('/viewreporteesfeedback', { state: { propValue: selectedOption } });
    };
  
    return (
        
        <div className="card1">
        <div className="card-content1">
          <div className="card-title1">View Feedback of</div>
          <div className="select-wrapper1">
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">Select an option</option>
              {options}
            </select>
            <div className="select-arrow1"></div>
          </div>
          <button className="submit-button1" onClick={() => handleOptionSelect(selectedOption)}>Submit</button>
</div>
</div>


    );
  }
  
  export default DropDown;