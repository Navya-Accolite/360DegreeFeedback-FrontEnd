import React from 'react'
import '../../Styles/feedbackPage.css';
import { useEffect } from 'react';
import { useState } from 'react';
import GiveFeedbackTable from './GiveFeedbackTable';

function GiveFeedback() {
  const header="Bearer "+window.sessionStorage.getItem('accessToken');
  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4545/api/ReceiverDetails/"+emailId,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <>

    <div className='homeclass'>
    <div>
      <h3 className='givefeedbackh3'></h3>
    </div>
    <div className="searchBarContainer">

    <div className='givefeedbacktable'>
      {console.log("data",data.length)}
      {data.length ? <GiveFeedbackTable data={data} /> : <div className='norequest'>No Requested Feedbacks</div> }

    </div>

    </div>
    </div>

    </>
  )
}

export default GiveFeedback