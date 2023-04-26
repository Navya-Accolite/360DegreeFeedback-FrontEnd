import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';

function ViewReporteesFeedback(props) {
  const location = useLocation();
  const propValue = location.state.propValue;
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);

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
    'SDate',
    'EDate',
    'Self Input',
    'Comment'
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

  return (
    <>
      <div className='homeclass'>
        <div className='homeclass1'>
          <center>
            <h5 style={{ paddingTop: '40px' }}>
              Here's {propValue}'s overall feedback
            </h5>
          </center>
          <div className='scrolltablediv'>
            <Table
              style={{ width: '700px', marginLeft: '100px', marginTop: '50px' }}
              className='styled-table'
            >
              <thead>
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
                    <td>{feedback.selfInput}</td>
                    <td>{feedback.feedbackComment}</td>
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
      </div>
    </>
  );
}

export default ViewReporteesFeedback;
