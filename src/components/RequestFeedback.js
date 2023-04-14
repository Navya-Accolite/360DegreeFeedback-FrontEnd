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
  const [todate,updateToDate]=useState('');
  const [fromdate,updateFromDate]=useState('');
  const [message,updateMessage]=useState('');
  const emailId = window.localStorage.getItem('emailId');

  

  // useEffect(() => {
  //   axios.get("http://localhost:4545/api/pendingResponses/" + emailId).then((res) => {
  //     console.log(res.data);
  //     //  setdata(res.data)
  //   })

  //   axios.get("http://localhost:4545/api/completedResponses/" + emailId).then((res) => {
  //     console.log(res.data);
  //     //  setdata(res.data)
  //   })

  // })


  const data =
  {
    "remail": emailId,
    "gemail": username,
    "startDate":fromdate,
    "endDate":todate,
    "selfInput":message
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


    <div>
      <h3>Request Feedback </h3>

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
                  placeholder="Request To"
                  type="email"
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
                  id="exampleDate"
                  name="date"
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
                  name="date"
                  placeholder="date placeholder"
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
                placeholder='Pitch yourself'
                type="textarea"
              />
            </FormGroup>
          </Row>

          <Button type="submit" value="Send">
            Send Request
          </Button>
        </form>
        <ToastContainer />




      </div>

      {/* <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="to_email" />
      <label>Message</label> 
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form> */}

    </div>
  )
}

export default RequestFeedback