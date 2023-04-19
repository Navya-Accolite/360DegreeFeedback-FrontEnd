import React, { useState } from 'react'
import { Label,Col,Input } from 'reactstrap'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

function DisableEmployee() {

    const [mail,setMail]=useState('');
     function disableemp(){

        axios.put("http://localhost:4545/api/disableEmployee/"+mail).then((res)=>{
            console.log(res.data)
            toast.success("Disabled Employee");
            document.getElementById('exampleEmail').value="";
        })
    }
 
  return (
    <>
    <div>
      <h3>Disable an Employee</h3>
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
        onChange={(e)=>setMail(e.target.value)}
       
      />
    </Col>
  </div>
  <ToastContainer/>

  <button id='btn4' onClick={()=>disableemp()}>Disable</button>

   </div>
   
    </div>
  

    </>
  )
}

export default DisableEmployee