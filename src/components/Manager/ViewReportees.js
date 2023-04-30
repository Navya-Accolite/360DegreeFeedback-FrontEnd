import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
function ViewReportees() {

    const header="Bearer "+window.sessionStorage.getItem('accessToken');
  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (emailId) {
      fetch("http://localhost:4545/api/employeesUnderManager/"+emailId,{
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

  const navigate = useNavigate();
  const [propValue, setPropValue] = useState('');

  const handleClick = (name) => {
    setPropValue(name); // set the value of propValue
    navigate('/viewreporteesfeedback', { state: { propValue: name } }); // navigate to a new page and pass the prop value
  };

  return (
    <>
      <div className='homeclass'>
        <div>
          <center><h5 style={{paddingTop:"50px"}} className='homeh3'></h5></center>
        </div>
        <div>
          <Table className='tableContainer' style={{width:"800px"}}>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Mail
                </th>
                <th>
                  Feedbacks
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user[0]}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                  <td>
                    <button id="btn1" onClick={() => handleClick(user[1])}><EyeOutlined className='eye'/></button> {/* call handleClick with the user's name */}
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

export default ViewReportees;
