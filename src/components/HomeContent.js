import React, { useEffect, useState } from 'react'
import '../index.css';
import HomeTable from './HomeTable';
import axios from 'axios';
import { ImportOutlined } from '@ant-design/icons';

function HomeContent() {
  
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4545/api/feedbackProviders/"+emailId)
        .then((response) => setData(response.data));
}, []);

  return (
    <div className='homeclass' style={{width:"1000px",height:"100%",backgroundColor:"#cfe0e5", display:"flex",justifyContent:"center"}}>
    <div>
      <h3 className='homeh3'>Your Feedbacks!</h3>
      <div style={{width:"100%"}}>
      {data.length?<HomeTable data={data} />:<p>You have no Feedbacks available. Please request to view here.</p>}
      </div>
    </div>
    </div>
    
    

  )
}

export default HomeContent



