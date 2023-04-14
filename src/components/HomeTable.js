import React from 'react';
import '../Styles/StylesforGiveFeedback.css';
import  { useEffect, useState } from "react";
import StarRating from './StarRating';
import axios from "axios";
import '../Styles/feedbackPage.css';
function HomeTable(props) {
  const headers = ['ID', 'NAME', 'MAIL'];

  const [isOpenCon, setIsOpenCon] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        // axios.get("http://localhost:4545/api/questions/checkValid")
        //     .then((response) => setData(response.data));
        // console.log(data)
    }, []);

    const handleFeedBack = () => {
        setIsOpenCon(true)
    }

  return (
    <>
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((user) => (
          <tr key={user[2]}>
            <td>{user[1]}</td>
            <td>{user[0]}</td>
            <td>{user[2]}</td>
            <td>
            <button
          id='btn'
          onClick={handleFeedBack}
          disabled={user[3] === 0}
          title={user[3] === 0 ? 'Feedback not available' : ''}
          style={{ backgroundColor: user[3] === 0 ? 'grey' : '' }}
        >
          View Feedback
        </button>          
         </td>
          </tr>
        ))}
      </tbody>
    </table>


</>
  );
}

export default HomeTable;
