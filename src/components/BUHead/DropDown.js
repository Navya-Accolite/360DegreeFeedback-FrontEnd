import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function DropDown(props) {

  const header="Bearer "+window.sessionStorage.getItem('accessToken');
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
 
  const options = props.data.map((option) => (

    <option key={option.emailId} value={option.emailId}>
      {option.emailId}
    </option>
  ));

  const handleOptionSelect = (selectedOption) => {
    navigate('/viewreporteesfeedback', { state: { propValue: selectedOption } });
  };

  return (
<div>
    <div className="card1">
      <div className="card-content1">
        <div className="card-title1">View Feedback of</div>
        <div className="select-wrapper1">
          <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <option value="">Select an employee</option>
            {options}
          </select>
          <div className="select-arrow1"></div>
        </div>
        <button className="submit-button1" onClick={() => handleOptionSelect(selectedOption)}>View 360° Feedback</button>
      </div>
    </div>
    </div>


  );
}

export default DropDown;