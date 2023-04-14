import React from 'react'
import '../Styles/StylesforGiveFeedback.css';
import { useEffect } from 'react';
import { useState } from 'react';
import GiveFeedbackTable from './GiveFeedbackTable';

function GiveFeedback() {
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4545/api/ReceiverDetails/"+emailId)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
      console.log("fid",data);
  }, []);


  return (
    <>
    <div>
      <h3>Please provide your Valuable Feedback</h3>
    </div>
    <div className="searchBarContainer">

    <div>
    <GiveFeedbackTable data={data} />
    </div>

    </div>

    </>
  )
}

export default GiveFeedback