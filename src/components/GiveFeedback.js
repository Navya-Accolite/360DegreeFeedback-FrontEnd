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

    <div className='givefeedbackhome'>
    <div>
      <h3 className='givefeedbackh3'></h3>
    </div>
    <div className="searchBarContainer">

    <div className='givefeedbacktable'>
      {data.length ? <GiveFeedbackTable data={data} /> : <div className='norequest'>No Requested Feedbacks</div> }

    </div>

    </div>
    </div>

    </>
  )
}

export default GiveFeedback