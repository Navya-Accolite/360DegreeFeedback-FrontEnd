import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import axios from 'axios';

function ViewReporteesFeedback(props) {

  const location = useLocation();
  const propValue = location.state.propValue;
  const [data,setData]=useState([]);
  const [data2,setData1]=useState([]);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [comment,setComment]=useState('');

  const data1 = [["Attitude",3],["Performance",3],["fghj",2]];

  const headings = ["Project Name", "Received by", "Start date", "End Date", "Self Input","Comment","Behaviour","Attitude","Technical","Performance","Commitment","Quality of work","Confidence","Empathy","Leadership","Responsibility"];

  const ratings={
    1:"Poor",
    2:"Unsatisfactory",
    3:"Satisfactory",
    4:"Very Satisfactory",
    5:"Outstanding"
  }

  useEffect(() => {
     {
      fetch("http://localhost:4545/api/getResult/"+propValue)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));
        console.log("data",data);
    }
  }, []);



  return (
    <>


      
    <div className='viewreporteetablehome'>
      <div className='homeclass1'>
        
      <div className='scrolltablediv'>
        <Table style={{width:"700px", marginLeft:"100px",marginTop:"100px"}} className='styled-table'>
          <thead>
            <tr>
              
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
            </tr>
          </thead>
          <tbody>
          {data.map((row, index) => (
          <tr key={index}>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>{row[4]}</td>
            <td>{row[5]}</td>
            <td>{row[6]}</td>
            <td>{ratings[row[7]]}</td>
            <td>{ratings[row[8]]}</td>
            <td>{ratings[row[9]]}</td>
            <td>{ratings[row[10]]}</td>
            <td>{ratings[row[11]]}</td>
            <td>{ratings[row[12]]}</td>
            <td>{ratings[row[13]]}</td>
            <td>{ratings[row[14]]}</td>
            <td>{ratings[row[15]]}</td>
            <td>{ratings[row[16]]}</td>
            <td>{ratings[row[17]]}</td>
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