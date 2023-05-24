import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
function ViewBUReportees() {

  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);
  const header="Bearer "+window.sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (emailId) {
      fetch("http://localhost:4545/api/hod/"+emailId,{
        headers: {
          "Content-type": "application/json",
           Authorization: header,
        }
      })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }


  }, []);


  return (
    <>
      <div className='homeclass'>
        <div>
        <DropDown data={data} />
        </div>
      </div>
    </>
  )
}

export default ViewBUReportees;
