import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { FormGroup, Label, Input, Row, Col, Button} from 'reactstrap';
import '../Styles/StylesforRequest.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RequestFeedback() {

  const form = useRef();
  const [username, updateUserName] = useState('');
  const[projectName, updateProjectName]= useState('');
  const [todate,updateToDate]=useState('');
  const [fromdate,updateFromDate]=useState('');
  const [message,updateMessage]=useState('');
  const emailId = window.localStorage.getItem('emailId');

  const today = new Date().toISOString().split('T')[0];
  console.log("today",today);

  const data =
  {
    "remail": emailId,
    "gemail": username,
    "startDate":fromdate,
    "endDate":todate,
    "selfInput":message,
    "projectName": projectName
  }


  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_91z8rbi', 'template_yq7ixod', form.current, 'piZXRCXKpuBTMThCC')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    axios.post('http://localhost:4545/api/feedback-requests', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      toast.success('Request sent successfully!');

  };
  return (


    <div className='requestfeedbackhome'>

      <div>
        <form ref={form} onSubmit={(e) => { sendEmail(e); form.current.reset(); }} className='Formelement'>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail" className='label'>
                  Email
                </Label>
                <Input onChange={(e) => updateUserName(e.target.value)}
                  id="exampleEmail"
                  name="to_email"
                  placeholder="Request To Be Sent To"
                  type="email"
                />
              </FormGroup>
            </Col>
         
            <Col md={6}>
            <FormGroup>
              <Label for="projectName" className='label'>
                  Project Name
              </Label>
              <Input onChange={(e) => updateProjectName(e.target.value)}
                    id="projectName"
                    name="projectName"
                    placeholder='Project Name'
                    type="text"
              />
            </FormGroup>

            </Col>
          </Row>


          <Row md={2}>
            <Col>
              <FormGroup>
                <Label for="exampleDate">
                  From Date
                </Label>
                <Input onChange={(e)=>updateFromDate(e.target.value)}
                  id="exampleDate1"
                  name="message"
                  max={today}
                  placeholder="date placeholder"
                  type="date"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleDate">
                  To Date
                </Label>
                <Input onChange={(e)=>updateToDate(e.target.value)}
                  id="exampleDate"
                  name="message"
                  placeholder="date placeholder"
                  max={today}
                  type="date"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row md={2}>
            <FormGroup>
              <Label for="exampleZip" className='label'>
                Message
              </Label>
              <Input onChange={(e)=>updateMessage(e.target.value)}
                id="exampleZip"
                name="message"
                placeholder='Self Input'
                type="textarea"
              />
            </FormGroup>
          </Row>

          <button type="submit" value="Send" className='requestbutton'>
             Request Feedback
          </button>
        </form>
        <ToastContainer />




      </div>


    </div>
  )
}

export default RequestFeedback