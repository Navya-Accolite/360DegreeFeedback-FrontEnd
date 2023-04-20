import React from 'react'
import '../Styles/Managequestions.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ManageQuestionsTable from './ManageQuestionsTable';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageQuestions() {
  const emailId = window.localStorage.getItem('emailId');
  const [data, setData] = useState([]);
  const [question,setQuestion] = useState("");
  const [isOpenCon, setIsOpenCon] = useState(false);
    

const postdata =
  {
 "attribute":question,
  "status":"1"
}


const postQuestion=(e)=>{

  axios.post('http://localhost:4545/api/questions', postdata)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

      setIsOpenCon(false);
      toast.success('Question Added Successfully!');

}

  useEffect(() => {
    fetch("http://localhost:4545/api/allQuestions")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
      
  }, []);

  const handleFeedBack = () => {
    setIsOpenCon(true)
}

  return (
    <>
    <div className='managequestionhome'>
    <div>
      <h4 className='managequestionsh4' style={{color:"#c5e0e5"}}>.</h4>
    </div>
    <div className="searchBarContainer">

    <div>
    <ManageQuestionsTable data={data} />
    </div>

    <button id="btn2" onClick={handleFeedBack}>Add Attribute</button>

    </div>

    {isOpenCon && <div className='popupContainer' >
            <div className='popup-boxd'>
                <div className="ques">
                    
                </div>
                <div className="cmntBox">
                    <label>Enter the question</label>
                    <textarea id="text" onChange={(e)=>setQuestion(e.target.value)}></textarea>
                    <span>
                    <button id='btn1' onClick={()=>postQuestion()}>Submit</button>
                    <button id='btn1' onClick={()=>setIsOpenCon(false)}>Cancel</button>
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