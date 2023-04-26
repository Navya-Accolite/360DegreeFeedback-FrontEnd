import React, { useEffect, useState } from 'react'
import '../../index.css';
import HomeTable from './HomeTable';
import axios from 'axios';

function HomeContent() {
  
  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4545/api/feedbackProviders/"+emailId)
        .then((response) => setData(response.data));
}, []);

// cfe0e5
  return (
    <div className='homeclass'>
    <div>
      <h3 className='homeh3'>YOUR FEEDBACKS!</h3>
      <div style={{width:"100%"}}>
      {data.length?<HomeTable data={data} />:<p>You have no Feedbacks available. Please request to view here.</p>}
      </div>
    </div>
    </div>
  )
}

export default HomeContent



