import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import axios from 'axios';

function ViewReporteesFeedback(props) {
  const location = useLocation();
  const propValue = location.state.propValue;
  const [data,setData]=useState([]);
  const [data2,setData2]=useState([]);
  const [isOpenCon, setIsOpenCon] = useState(false);
  const [comment,setComment]=useState('');

  const [feedbackIds, setFeedbackIds] = useState([]);
  const [feedbackDetails, setFeedbackDetails] = useState([]);

  const data1 = [["Attitude",3],["Performance",3],["fghj",2]];

  const headings = ["Attitude", "Behaviour", "Performance", "abc", "fghj"];

  const ratings={
    1:"Poor",
    2:"Unsatisfactory",
    3:"Satisfactory",
    4:"Very Satisfactory",
    5:"Outstanding"
  }

  useEffect(() => {
     {
      fetch("http://localhost:4545/api?rEmail="+propValue+"&status=1")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));

        console.log("data",data);

        // axios.get('http://localhost:4545/api/getRating/' + data.feedbackid).then((res) => {
        //       setData1(res.data)
        //     })
        
        //     axios.get('http://localhost:4545/api/findComment/'+feedbackid).then((res)=>{
        //       console.log("comment"+comment);
        //       setComment(res.data)
        //       console.log("comment"+comment);
        //     })
    }
  }, []);

  // const handleView = (feedbackid) => {
  //   setIsOpenCon(true)
  //   axios.get('http://localhost:4545/api/getRating/' + feedbackid).then((res) => {
  //     setData1(res.data)
  //   })

  //   axios.get('http://localhost:4545/api/findComment/'+feedbackid).then((res)=>{
  //     console.log("comment"+comment);
  //     setComment(res.data)
  //     console.log("comment"+comment);
  //   })
  // }

  const newData = headings.map((heading) => {
    const foundData = data1.find((item) => item[0] === heading);
    return foundData ? foundData[1] : 0;
  });


  return (
    <>


      
    <div className='viewreporteetablehome'>
      <div className='homeclass1'>
        
      <div className='scrolltablediv'>
        <Table style={{width:"700px", marginLeft:"100px",marginTop:"100px"}} className='styled-table'>
          <thead>
            <tr>
              <th>
                Project Name
              </th>
              <th>
               Feeddback by
              </th>
              <th>
               StartDate
              </th>
              <th>
               EndDate
              </th>
              <th>
               SelfInput
              </th>
              
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user}>
                <td>{user.projectName}</td>
                <td>{user.gemail}</td>
                <td>{user.startDate}</td>
                <td>{user.endDate}</td>
                <td>{user.selfInput}</td>
                <td>      
                </td>
                {newData.map((value, index) => (
                    <td key={index}>{value}</td>
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