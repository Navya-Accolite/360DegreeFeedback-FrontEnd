import React from 'react'
import '../Styles/StylesforGiveFeedback.css';
import { useEffect } from 'react';
import { useState } from 'react';

function ViewReporteestable() {
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4545/api/ReceiverDetails/"+emailId)
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.log(error));
//   }, []);


  return (
    <>

   table

    </>
  )
}

export default ViewReporteesTable