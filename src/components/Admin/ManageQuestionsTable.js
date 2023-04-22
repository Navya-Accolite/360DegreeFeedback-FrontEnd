import React from 'react';
import  { useEffect, useState } from "react";
import Select from 'react-select';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Input } from 'reactstrap';

function ManageQuestionsTable(props) {
  const headers = ['ATTRIBUTE'];
    
  function handleOnChange(attributeId, status) {
    const url = 'http://localhost:4545/api/status/'+attributeId;
    if(status===0)
     status=1
    else
    status=0

    toast.success("Updated Successfully!")
    
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
      <table className='styled-table2'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((question) => (
            <tr key={question.attributeId}>
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

          <ToastContainer/>
        </tbody>
      </table>
    </>
  );
}

export default ManageQuestionsTable;
