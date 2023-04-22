import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import axios from 'axios';

function ViewBUManagers(props) {

  const location = useLocation();
  const propvalue = location.state.propValue;
  const [data,setData]=useState([]);
  const [prop,setprop]=useState('');

  console.log("manager",propvalue);


  useEffect(() => {
     {
      fetch("http://localhost:4545/api/employeesUnderManager/"+propvalue)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (name) => {
     navigate('/viewreporteesfeedback', { state: { propValue: name } }); // navigate to a new page and pass the prop value
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
                    <button onClick={() => handleClick(user[1])}>ViewReportees Feedback</button> {/* call handleClick with the user's name */}
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

export default ViewBUManagers;