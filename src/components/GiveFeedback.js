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
  }, []);


  return (
    <>
    <div>
      <h3>Provide your Feedback</h3>
    </div>
    <div className="searchBarContainer">

    <div>
      {data.length ? <GiveFeedbackTable data={data} /> : <div>No Requested Feedbacks</div> }

    </div>

    </div>

    </>
  )
}

export default GiveFeedback