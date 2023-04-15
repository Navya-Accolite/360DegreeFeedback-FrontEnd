import React, { useEffect, useState } from 'react'
import '../index.css';
import HomeTable from './HomeTable';
import axios from 'axios';
import { ImportOutlined } from '@ant-design/icons';

function HomeContent() {
  
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4545/api/pendingResponses/"+emailId)
        .then((response) => setData(response.data));
    console.log(data)
}, []);

  return (
    <>
    <div>
      <h3>Your Feedbacks!</h3>
    </div>

    <div>
    <HomeTable data={data} />
    </div>
    
    </>

  )
}

export default HomeContent



