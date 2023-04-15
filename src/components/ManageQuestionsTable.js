import React from 'react';
import '../Styles/StylesforGiveFeedback.css';
import  { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import '../Styles/StylesforGiveFeedback.css';
import { Input } from 'reactstrap';

function ManageQuestionsTable(props) {
  const headers = ['QuesionID', 'NAME'];
  const postdata=useState('')
    

 
// const data = {
//   attributeId: 123,
//   status: 'active'
// };

  function handleOnChange(attributeId, status) {
    const url = 'http://localhost:4545/api/status/'+attributeId;
    console.log("id",attributeId)
    console.log("status",status)
    if(status===0)
     status=1
    else
    status=0

    
    axios.put(url, status, { headers: { 'Content-Type': 'application/json' }})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  

    

  }
    



  const statusOptions = [
    { value: 1, label: 'Inactive' },
    { value: 0, label: 'Active' }
  ];

  return (
    <>
      <table className='admintable'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((question) => (
            <tr key={question.attributeId}>
              <td>{question.attributeId}</td>
              <td>{question.attribute}</td>
              <td>
                <Select
                  options={statusOptions}
                  defaultValue={statusOptions[question.status]}
                  onChange={(option) =>
                    handleOnChange(question.attributeId, option.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManageQuestionsTable;
