import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from 'react';
import '../Styles/feedbackPage.css';
import { FormGroup, Label, Input, Row, Col, Button} from 'reactstrap';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
function HomeTable(props) {
const headers = ['ID', 'NAME', 'MAIL'];

  const [isOpenCon, setIsOpenCon] = useState(false);
  const [data, setData] = useState([]);
<<<<<<< HEAD
  const [shareData, setshareData] = useState([])
  const [isOpenShare, setIsOpenShare] = useState(false);
  const emailId = window.localStorage.getItem('emailId');
  const [message,updateMessage]=useState('');
=======
>>>>>>> 00e6bfa0c1eb23ae10173a3ccbb5c987fa8ce3e0


  const form = useRef();
  const [mailto, updatemailTo] = useState('');
  const handleView = (feedbackid) => {
    setIsOpenCon(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid).then((res) => {
      setData(res.data)
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
    e.preventDefault();
    
    emailjs.sendForm('service_91z8rbi', 'template_yq7ixod', form.current, 'piZXRCXKpuBTMThCC')
      .then((result) => { 
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

      toast.success('Request sent successfully!');

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
          </div>
        </div>
      </div>
      }


      {isOpenShare && <div className='popupContainer1' onClick={() => setIsOpenShare(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques">

            <form ref={form} onSubmit={(e) => { sendEmail(e); form.current.reset(); }} className='Formelement'>
            <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail" className='label'>
                  Email
                </Label>
                <Input onChange={(e) => updatemailTo(e.target.value)}
                  id="exampleEmail"
                  name="to_email"
                  placeholder="Send Report To"
                  type="email"
                />
              </FormGroup>
            </Col>
          </Row>

          <Button type="submit" value="Send">
            Send Request
          </Button>

            </form>
              
          </div>
        </div>
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
              <td>{user[0]}</td>
              <td>{user[2]}</td>
              <td>
                <button
                  id='btn'
                  onClick={() => handleView(user[1])}
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
                  onClick={() => handleShare(user[3])}
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


    </>
  );
}

export default HomeTable;
