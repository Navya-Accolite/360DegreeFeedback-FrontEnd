import React from 'react';
import '../../Styles/StylesforGiveFeedback.css';
import { useEffect, useState } from "react";
import axios from "axios";
import '../../Styles/feedbackPage.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function GiveFeedbackTable(props) {

  const headers = ['Name', 'Mail'];
  const [propValue,setPropValue]=useState([])
  const [quesIdArray, setquesIdArray] = useState([])
  const [ratingArray, setRatingArray] = useState([])
  const [feedbackid, setFeedbackId] = useState("");
  const [comment, setComment] = useState("");
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [data, setData] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4545/api/questions/checkValid")
      .then((response) => setData(response.data));
    console.log(data);
  }, []);

  const handleFeedBack = (id) => {
    setPropValue(id); 
    navigate('/feedbackform', { state: { propValue: id } }); 

  }
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
    // console.log("obj",obj);

    JSON.stringify(obj);
    console.log("obj", obj);

    axios.post('http://localhost:4545/api/storeRes/' + feedbackid, obj, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    setIsOpenCon(false);
    toast.success("Feedback Submitted Successfully!")
  }

  return (
    <>
      <table className='tableContainer' style={{ width: "800px" }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((user) => (
            <tr key={user[2]}>
              <td>{user[1]}</td>
              <td>{user[0]}</td>
              <td>
              {/* <Link to={{
  pathname: '/feedbackform',
  state: { feedbackId: user[3] }
}}>Provide Feedback</Link> */}



                <button id='btn' onClick={() => handleFeedBack(user[3])}>Provide Feedback</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

      {isOpenCon && <div className='popupContainer1' onClick={() => setIsOpenCon(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques">
            {data.map((blog) =>
              <div key={blog.attributeId} className='question'>
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
          <div className="cmntBox">
            <label>Feedback</label>
            <textarea placeholder="Provide the Feedback" id="text" onChange={(e) => setComment(e.target.value)}></textarea>
            <span><button id='btn' onClick={() => func()}>Submit Feedback</button>&nbsp;&nbsp;
              <button id='btn' onClick={() => setIsOpenCon(false)}>Cancel</button></span>
          </div>
        </div>
      </div>
      }

    </>
  );
}

export default GiveFeedbackTable;
