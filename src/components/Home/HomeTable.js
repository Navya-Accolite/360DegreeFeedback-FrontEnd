import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from 'react';
import '../../Styles/feedbackPage.css';
import { FormGroup, Label, Form, Input, Row, Col, Button} from 'reactstrap';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';
import {Table} from 'reactstrap';
import { EyeFilled , ShareAltOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { AntCloudOutlined } from '@ant-design/icons';
function HomeTable(props) {

  const header="Bearer "+window.sessionStorage.getItem('accessToken');
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

  const ratings={
    1:"Poor",
    2:"Unsatisfactory",
    3:"Satisfactory",
    4:"Very Satisfactory",
    5:"Outstanding"
  }
 

  const handleView = (feedbackid) => {
    setIsOpenCon(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    }).then((res) => {
      setData(res.data)
    })

    axios.get('http://localhost:4545/api/findComment/'+feedbackid,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    }).then((res)=>{
      setComment(res.data)
    })
  }

  const handleShare = (feedbackid) => {
    setIsOpenShare(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    }).then((res) => {
      let combinedData = res.data.reduce((acc, rating) => {
        return `${acc}${rating[0]}: ${ratings[rating[1]]}\n`;
      }, '');

      axios.get('http://localhost:4545/api/findComment/'+feedbackid,{
        headers: {
          "Content-type": "application/json",
           Authorization: header,
        }
      }).then((res)=>{
        setComment(res.data)
      
    })
    combinedData += `Comment: ${comment}`;
    setshareData(combinedData)
    // updateMessage(combinedData)
    })
  }


  const sendEmail = (e) => {
    const templateParams = {
      to_email: emailTo,
      message: shareData,
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
          <div className="ques1">

            <table className='popuptable'>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.map((question) => (
                  <tr key={question[0]}>
                    <td>{question[0]}</td>
                    <td>{ratings[question[1]]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='comments'>Feedback:  {comment}</div>
          </div>
        </div>
      </div>
      }


      {isOpenShare && <div className='popupContainer1' onClick={() => setIsOpenShare(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques1">
              
              <form ref={form}>
      <Row>
        <Col md={10}>
          <FormGroup style={{paddingLeft:"20px"}}>
            <Label for="exampleEmail" className='label' style={{width:"400px"}}>
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

      <Button onClick={()=>sendEmail()} style={{marginLeft:"20px"}}>
        Send Report
      </Button>
      </form>
          </div>
        </div>
        <ToastContainer />
      </div>
      }


 <div className='tableContainer'> 

  <Table style={{width:"900px"}} className='center'>
  <thead>
    <tr>
      <th>
        Name
      </th>
      <th>
        Mail
      </th>
      <th>
        View Feedback
      </th>
      <th>
        Share
      </th>
    </tr>
  </thead>
  <tbody>
          {props.data.map((user) => (
            <tr key={user[2]}>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>
                <button
                  id='btn1'
                  onClick={() => handleView(user[4])}
                  disabled={user[3] === 0}
                  title={user[3] === 0 ? 'Feedback not available' : ''}
                  style={{ backgroundColor: user[3] === 0 ? 'grey' : '' }}
                >
                  < EyeFilled className='eye'/> 
                </button>
              </td>
              <td>
                <button
                  id='btn1'
                  onClick={() => handleShare(user[4])}
                  disabled={user[3] === 0}
                  title={user[3] === 0 ? 'Feedback not available' : ''}
                  style={{ backgroundColor: user[3] === 0 ? 'grey' : '' }}
                >
                  <ShareAltOutlined className='eye'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
</Table>

</div>
      <ToastContainer/>


    </>
  );
}

export default HomeTable;
