import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
function ViewBUReportees() {

  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (emailId) {
      fetch("http://localhost:4545/api/employeesUnderManager/"+emailId)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }
  }, []);

 

  const navigate = useNavigate();
  const [propValue, setPropValue] = useState('');

  const handleClick = (name) => {
    setPropValue(name); // set the value of propValue
    navigate('/viewreporteesfeedback', { state: { propValue: name } }); // navigate to a new page and pass the prop value
  };


  const handleReportees = (name) => {
    setPropValue(name); 
    navigate('/viewbumanagers', { state: { propValue: name } }); 
  };


  return (
    <>
      <div className='manageuserhome'>
        <div>
          <h4>.</h4>
        </div>
        <div className='homeclass'>
          <Table style={{width:"700px", marginLeft:"100px",marginTop:"100px"}} className='styled-table'>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Mail
                </th>
                <th>
                  
                </th>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user[0]}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                  <td>
                    <button onClick={() => handleClick(user[1])}>View Feedback</button> 
                  </td>
                  <td>
                    <button onClick={() => handleReportees(user[1])}>View Reportees</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default ViewBUReportees;
