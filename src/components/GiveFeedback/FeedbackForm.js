import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Input, Label, FormGroup, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';


const FeedbackForm = (props) => {
  const header = "Bearer " + window.sessionStorage.getItem('accessToken');

  const location = useLocation();
  const navigate = useNavigate();

  const propValue = location.state.feedbackid;

  console.log("props", propValue);

  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [quesIdArray, setquesIdArray] = useState([])
  const [ratingArray, setRatingArray] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4545/api/questions/checkValid", {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    })
      .then((response) => setData(response.data));
    console.log(data);
  }, []);



  const update = (value, id1) => {
    quesIdArray.push(id1);
    ratingArray.push(value);
  }



  const func = () => {
    var map = new Map();
    for (var i = 0; i < quesIdArray.length; i++) {
      map.set(quesIdArray[i], ratingArray[i]);
    }
    console.log((map));
    const obj = {
      comment: comment,
    }
    quesIdArray.map((v, i) => {
      obj[`${v}`] = ratingArray[i];
    })

    JSON.stringify(obj);
    console.log("obj", obj);

    axios.post('http://localhost:4545/api/storeRes/' + propValue, obj, {
      headers: {
        "Content-type": "application/json",
        Authorization: header,
      }
    })
      .then(response => {
        console.log(response.data);
        toast.success("Feedback Submitted Successfully!");
        navigate('/givefeedback'); // Only navigate after success
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='homeclass'>
      <div>
        {/* <h3 className='homeh3'>Your Feedbacks!</h3> */}
      </div>

      <div className='popup-boxd2'>
        <div className="ques2">
          {data.map((blog) =>
            <div key={blog.attributeId} className='question2'>
              <div>{blog.attribute}</div>
              <select onChange={(e) => update(e.target.value, blog.attributeId)}>
                <option value="" disabled selected hidden>Rating</option>
                <option value={1}>1-Poor</option>
                <option value={2}>2-Unsatisfactory</option>
                <option value={3}>3-Satisfactory</option>
                <option value={4}>4-Very Satisfactory</option>
                <option value={5}>5-Outstanding</option>
              </select>

            </div>)
          }
        </div>

        <div className="cmntBox2">
          <label>Feedback</label>
          <textarea placeholder="Provide the Feedback" id="text" onChange={(e) => setComment(e.target.value)} classname="feedbacktextarea"></textarea>
        </div>
        &nbsp;
        <div><button id='button1' onClick={() => func()}>Submit Feedback</button>&nbsp;&nbsp;
          {/* <button id='btn' onClick={() => setIsOpenCon(false)}>Cancel</button> */}
        </div>
      </div>
    </div>


  )
}

export default FeedbackForm
