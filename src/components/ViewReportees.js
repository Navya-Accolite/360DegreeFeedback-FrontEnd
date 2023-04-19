import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';


function ViewReportees() {
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);

  const handleView=(e)=>{
   
  }

  useEffect(() => {
    fetch("http://localhost:4545/api/employeesUnderManager/"+emailId)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
      console.log(data);
  }, []);


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
        View Feedback
      </th>
    </tr>
  </thead>
  <tbody>
          {data.map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>
              <Link to="/path" className='button-link'>View</Link>
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

export default ViewReportees


// import React from 'react';
// import { Link } from 'react-router-dom';

// function MyComponent() {
//   const myProps = {
//     prop1: 'value1',
//     prop2: 'value2',
//   };

//   return (
//     <div>
//       <h1>My Component</h1>
//       <Link to={{ pathname: "/path/to/somewhere", state: myProps }} className="button-link">Go Somewhere</Link>
//     </div>
//   );
// }

// export default MyComponent;
