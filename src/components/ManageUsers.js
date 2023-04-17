import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Form,FormGroup,Label,Row,Col,Input} from 'reactstrap';
import {Button} from 'reactstrap';


function ManageUsers() {
  
  const [email,updateemail]=useState("");
  const [role,updaterole]=useState("");

    function updateuser(){  

      const url="http://localhost:4545/api/update/"+email;
      //  console.log(role);
       const postdata={
          "role":role
       }
       axios.put(url, postdata, { headers: { 'Content-Type': 'application/json' }})
       .then(response => {
        //  console.log(response.data);
       })
       .catch(error => {
        //  console.error(error);
       });
    }

  return (
    <>
    <div>
      <h3>Manage your Users!</h3>
    </div>


    <div className='manageusers'>
   <div>
   <div>
    <Label
      for="exampleEmail"
      sm={2}
    >
      Email
    </Label>
    <Col sm={10}>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="with a placeholder"
        type="email"
        onChange={(e)=>updateemail(e.target.value)}
       
      />
    </Col>
  </div>

  <div>
    <Label
      for="exampleSelect"
      sm={2}
    >
      Select
    </Label>
    <Col sm={10}>
      <Input
        id="exampleSelect"
        name="select"
        type="select"
        onChange={(e)=>updaterole(e.target.value)}
      >
        <option>
          ADMIN
        </option>
        <option>
          USER
        </option>
      </Input>
    </Col>
  </div>
  <button id='btn4' onClick={()=>updateuser()}>Update</button>

   </div>
    </div>
    
    </>

  )
}

export default ManageUsers



