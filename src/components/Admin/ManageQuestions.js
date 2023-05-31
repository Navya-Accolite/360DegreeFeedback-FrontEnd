import React from 'react';
import '../../Styles/Managequestions.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ManageQuestionsTable from './ManageQuestionsTable';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageQuestions() {
  const emailId = window.sessionStorage.getItem('emailId');
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");
  const [isOpenCon, setIsOpenCon] = useState(false);

  const header="Bearer "+window.sessionStorage.getItem('accessToken');
  const postdata =
  {
    "attribute": question,
    "status": "1"
  }


  const postQuestion = (e) => {

    axios.post('http://localhost:4545/api/questions', postdata,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    setIsOpenCon(false);
    window.location.reload();
    toast.success('Question Added Successfully!');

  }

  useEffect(() => {
    fetch("http://localhost:4545/api/allQuestions",{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));

  }, []);

  const handleFeedBack = () => {
    setIsOpenCon(true)
  }

  return (
    <>
      <div className='homeclass'>
        <div>
          <h4 className='managequestionsh4' style={{ color: "#c5e0e5" }}>.</h4>
        </div>
        <div className="searchBarContainer">

          <div>
            <ManageQuestionsTable data={data} />
          </div>

          <button id="btn" onClick={handleFeedBack} style={{ marginLeft: "80px" }}>Add Attribute</button>

        </div>

        {isOpenCon && <div className='popupContainer1'>
          <div className='popup-boxd1' style={{ height: "200px" }}>
            <div className="ques1">

            </div>
            <div className="cmntBox">
              <label>Enter an Attribute</label>
              <input id="text" onChange={(e) => setQuestion(e.target.value)} style={{ width: "200px" }}></input>
              <span>&nbsp; &nbsp;
                <button id='btn' onClick={() => postQuestion()}>Submit</button> &nbsp; &nbsp;
                <button id='btn' onClick={() => setIsOpenCon(false)}>Cancel</button>
              </span>
              <ToastContainer />
            </div>
          </div>
        </div>
        }
      </div>

    </>
  )
}

export default ManageQuestions