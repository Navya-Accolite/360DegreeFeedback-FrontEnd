import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from 'react';
import '../Styles/feedbackPage.css';
import { FormGroup, Label, Form, Input, Row, Col, Button} from 'reactstrap';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
function HomeTable(props) {
const headers = [ 'NAME', 'MAIL'];

  const [isOpenCon, setIsOpenCon] = useState(false);
  const [data, setData] = useState([]);
  const [shareData, setshareData] = useState([]);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const emailId = window.localStorage.getItem('emailId');
  const [message,updateMessage]=useState('');
  const [comment,setComment]=useState('');

  const form = useRef();
  const [emailTo, setEmailTo] = useState('');

  const updateEmailTo = (value) => {
    setEmailTo(value);
  };

 

  const handleView = (feedbackid) => {
    setIsOpenCon(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid).then((res) => {
      setData(res.data)
    })

    axios.get('http://localhost:4545/api/findComment/'+feedbackid).then((res)=>{
      console.log("comment"+comment);
      setComment(res.data)
      console.log("comment"+comment);
    })
  }

  const handleShare = (feedbackid) => {
    setIsOpenShare(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid).then((res) => {
      setshareData(res.data)
      updateMessage(res.data)
    })
  }

 

  const sendEmail = (e) => {


    const templateParams = {
      to_email: emailTo,
      message: shareData+comment,
    };
    
      emailjs.send('service_91z8rbi', 'template_uc7dh9l', templateParams, 'piZXRCXKpuBTMThCC')
        .then((result) => { 
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

        setIsOpenShare(false)
        toast.success("Report sent Successfully!")
    
  };

  return (
    <>
      {isOpenCon && <div className='popupContainer1' onClick={() => setIsOpenCon(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques">

            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.map((question) => (
                  <tr key={question[0]}>
                    <td>{question[1]}</td>
                    <td>{question[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='comment'>Comment: {comment}</div>
          </div>
        </div>
      </div>
      }


      {isOpenShare && <div className='popupContainer1' onClick={() => setIsOpenShare(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques">
              
              <form ref={form}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail" className='label'>
              Email
            </Label>
            <Input onChange={(e) => updateEmailTo(e.target.value)}
              id="exampleEmail"
              name="to_email"
              placeholder="Send Report To"
              type="email"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button onClick={()=>sendEmail()}>
        Send Report
      </Button>
      </form>
          </div>
        </div>
        <ToastContainer />
      </div>
      }

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Feedback</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((user) => (
            <tr key={user[2]}>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>
                <button
                  id='btn'
                  onClick={() => handleView(user[4])}
                  disabled={user[3] === 0}
                  title={user[3] === 0 ? 'Feedback not available' : ''}
                  style={{ backgroundColor: user[3] === 0 ? 'grey' : '' }}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  id='btn'
                  onClick={() => handleShare(user[4])}
                  disabled={user[3] === 0}
                  title={user[3] === 0 ? 'Feedback not available' : ''}
                  style={{ backgroundColor: user[3] === 0 ? 'grey' : '' }}
                >
                  Share
                  {console.log("user",user)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>


    </>
  );
}

export default HomeTable;
