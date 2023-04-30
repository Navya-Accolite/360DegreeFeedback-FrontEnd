import React, { useState } from 'react'
import axios from 'axios';
import {Label,Col,Input} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../../Styles/Manageuser.css'


function ManageUsers() {
  
  const [email,updateemail]=useState("");
  const [role,updaterole]=useState("");

    function updateuser(){  
      

      const url="http://localhost:4545/api/update/"+email;
        console.log(role);
       const postdata={
          "role":role
       }
       axios.put(url, postdata, { headers: { 'Content-Type': 'application/json' }})
       .then(response => {
        toast.success("Updated Suucessfully!")
       })
       .catch(error => {
          console.error(error);
          toast.error("Can't Remove Admin")
       });
       document.getElementById('exampleEmail').value="";
      
    }

  return (
    <>
    <div className='manageuserhome'>
    <div>
      <h4>.</h4>
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
        placeholder="Enter email id"
        type="email"
        onChange={(e)=>updateemail(e.target.value)}
       
      />
    </Col>
  </div>

  <div>
  <Label for="exampleSelect" sm={2}>Select Role</Label>
  <Col sm={10}>
    <Input id="exampleSelect" name="select" type="select" onChange={(e) => updaterole(e.target.value)}>
      <option value=""></option>
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
      <option value="MANAGER">MANAGER</option>
      <option value="BU HEAD">BU HEAD</option>
    </Input>
  </Col>
</div>



  <button id='btn4' onClick={()=>updateuser()}>Update</button>

   </div>
   <ToastContainer/>
    </div>
    </div>
    
    </>

  )
}

export default ManageUsers



