import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from 'react';
import '../../Styles/feedbackPage.css';
import { FormGroup, Label, Form, Input, Row, Col, Button } from 'reactstrap';
import emailjs from '@emailjs/browser';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'reactstrap';
import { EyeFilled, ShareAltOutlined, BellOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import PieExample from './PieChart';
function HomeTable(props) {

  const header = "Bearer " + window.sessionStorage.getItem('accessToken');
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [data, setData] = useState([]);
  const [shareData, setshareData] = useState([]);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const emailId = window.localStorage.getItem('emailId');
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const form = useRef();
  const [emailTo, setEmailTo] = useState('');

  const updateEmailTo = (value) => {
    setEmailTo(value);
  };

  const ratings = {
    1: "Poor",
    2: "Unsatisfactory",
    3: "Satisfactory",
    4: "Very Satisfactory",
    5: "Outstanding"
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        //  id='butt1'
        className='paginatebutton'
        key={number}
        // className={currentPage === number ? {backgroundColor:"red"} : null}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    );
  });

  const handleReminder=(e) => {
    toast.success("Reminder sent Successfully!");

  }
  const handleView = (feedbackid) => {
    setIsOpenCon(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    }).then((res) => {
      setData(res.data)
    })
    axios.get('http://localhost:4545/api/findComment/' + feedbackid, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    }).then((res) => {
      setComment(res.data)
    })
  }
  const handleShare = (feedbackid) => {
    setIsOpenShare(true)
    axios.get('http://localhost:4545/api/getRating/' + feedbackid, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    }).then((res) => {
      let combinedData = res.data.reduce((acc, rating) => {
        return `${acc}${rating[0]}: ${ratings[rating[1]]}\n`;
      }, '');
      axios.get('http://localhost:4545/api/findComment/' + feedbackid, {
        headers: {
          "Content-type": "application/json",
          Authorization: header,
        }
      }).then((res) => {
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
        <ToastContainer/>
      </div>
     
      }
      {isOpenShare && <div className='popupContainer1' onClick={() => setIsOpenShare(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques1">
            <form ref={form}>
              <Row>
                <Col md={10}>
                  <FormGroup style={{ paddingLeft: "20px" }}>
                    <Label for="exampleEmail" className='label' style={{ width: "400px" }}>
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
              <Button onClick={() => sendEmail()} style={{ marginLeft: "20px" }}>
                Send Report
              </Button>
            </form>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
      }

      <div className='tableContainer'>
        <PieExample />
        <Table style={{ width: '900px' }} className='center'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mail</th>
              <th>Project Name</th>
              <th>Feedback</th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user[5]}>
                <td>{user[1]}</td>
                <td>{user[2]}</td>
                <td>{user[3]}</td>
                <td>
                  <button
                    id='btn1'
                    onClick={() => handleView(user[5])}
                    disabled={user[4] === 0}
                    title={user[4] === 0 ? 'Feedback not available' : ''}
                    style={{ backgroundColor: user[4] === 0 ? 'grey' : '' }}
                  >
                    <EyeFilled className='eye' />
                  </button>
                </td>
                <td>
                  {user[4] == 0 ?
                    <button
                      id='btn1'
                      onClick={() => handleReminder()}
                    // disabled={user[4] === 0}
                    >
                      <BellOutlined className='eye' />
                      <ToastContainer />
                    </button> :
                    <button
                      id='btn1'
                      onClick={() => handleShare(user[5])}
                      disabled={user[4] === 0}
                      title={user[4] === 0 ? 'Feedback not available' : ''}
                      style={{ backgroundColor: user[4] === 0 ? 'grey' : '' }}
                    >
                      <ShareAltOutlined className='eye' />
                    </button>}


                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ul id='page-numbers'>Page: {renderPageNumbers}</ul>
      </div>
    </>
  );
}

export default HomeTable;
