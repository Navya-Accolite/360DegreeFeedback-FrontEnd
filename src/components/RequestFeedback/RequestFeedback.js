import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { FormGroup, Label, Input, Row, Col, Button} from 'reactstrap';
import '../../Styles/StylesforRequest.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextArea from 'antd/es/input/TextArea';

function RequestFeedback() {

  const form = useRef();
  const [username, updateUserName] = useState('');
  const[projectName, updateProjectName]= useState('');
  const [todate,updateToDate]=useState('');
  const [fromdate,updateFromDate]=useState('');
  // const [message,updateMessage]=useState('');
  const emailId = window.sessionStorage.getItem('emailId');

  var limit = 20;


  const today = new Date().toISOString().split('T')[0];

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessage(value);
    }
  };


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


    <div className='homeclass'>
      <div className='newfeedbackhead'>
        New Feedback Request 
      </div>

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
                <Label for="exampleDate" className='label'>
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
                <Label for="exampleDate" className='label'>
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

          {/* <Row md={1}>
            <FormGroup>
              <Label for="exampleZip" className='label'>
                Self Input
              </Label>
              <Input onChange={(e)=>wordLimit(e.target.value)}
                id="my-text"
                name="message"
                placeholder='Self Input'
                type="textarea"
              />
              <p id='result'>0/{limit}</p>
            </FormGroup>
          </Row> */}

<Row md={1}>
      <FormGroup>
        <Label for="exampleZip" className="label">
          Self Input
        </Label>
        <Input
          id="exampleZip"
          name="message"
          placeholder="Self Input"
          type="textarea"
          value={message}
          style={{height:"90px"}}
          onChange={handleChange}
        />
        <span>
          {message.length} / 1000
        </span>
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