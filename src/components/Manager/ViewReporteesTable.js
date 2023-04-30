import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';

function ViewReporteesFeedback(props) {
  const location = useLocation();
  const propValue = location.state.propValue;
  const name = propValue.split(".");
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [selfInput,setSelfInput]=useState('');
  const [isOpenShare, setIsOpenShare] = useState(false);

  const ratings = {
    1: 'Poor',
    2: 'Unsatisfactory',
    3: 'Satisfactory',
    4: 'Very Satisfactory',
    5: 'Outstanding'
  };

  const headings = [
    'Project Name',
    'Received by',
    'Start',
    'End',
    'Self Input',
    'Feedback'
  ];

  useEffect(() => {
    fetch('http://localhost:4545/api/getResults/' + propValue)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [propValue]);

  useEffect(() => {
    fetch('http://localhost:4545/api/allQuestions')
      .then(response => response.json())
      .then(data => setQuestion(data))
      .catch(error => console.log(error));
  }, []);

  const handleClick = (feedback) => {
    setSelfInput(feedback);
    setIsOpenShare(true);
  };
  

  return (
    <>

{isOpenShare && <div className='popupContainer1' onClick={() => setIsOpenShare(false)}>
        <div className='popup-boxd1' onClick={(e) => { e.stopPropagation() }}>
          <div className="ques1">

            {selfInput}
          </div>
        </div>
      </div>
      }

      <div className='homeclass'>
        <center>

        </center>
        <div className='scrolltablediv'>
          <h5 style={{ paddingTop: '40px' }}>
            {name[0]}'s 360 Degree Feedback
          </h5>
          <Table
            style={{ width: '1000px' }}
            className='styled-table'
          >

            <thead>

              <tr>
                <td colSpan={headings.length} style={{ backgroundColor: "#302b63" }}></td>
                <td colSpan={question.length} style={{ backgroundColor: "#302b63", fontWeight: "bold", border: "1.4px solid white", color: "white" }}>
                  Performance Parameters
                </td>
              </tr>

              <tr>
                {headings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}

                {question.map(attribute => (
                  <th key={attribute.attributeId}>{attribute.attribute}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.projectName}</td>
                  <td>{feedback.feedbackProvider}</td>
                  <td>{feedback.startDate}</td>
                  <td>{feedback.endDate}</td>
                  {/* <td>{feedback.selfInput}</td> */}
                  <td>
                  <button onClick={()=>handleClick(feedback.selfInput)}
                  id='btn1'>
                  View
                </button>
                  </td>
                  {/* <td>{feedback.feedbackComment}</td> */}
                  <td>
                  <button onClick={()=>handleClick(feedback.feedbackComment)}
                  id='btn1'>
                  View
                </button>
                  </td>

                  {question.map(attribute => (
                    <td key={attribute.attributeId}>
                      {console.log(attribute.attribute)}
                      {ratings[feedback[attribute.attribute]] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

    </>
  );
}

export default ViewReporteesFeedback;
