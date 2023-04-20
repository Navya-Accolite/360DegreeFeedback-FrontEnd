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

  const [feedbackIds, setFeedbackIds] = useState([]);
  const [feedbackDetails, setFeedbackDetails] = useState([]);

  const data1 = [["Attitude",3],["Performance",3],["fghj",2]];

  const headings = ["Project Name", "Received by", "Start date", "End Date", "Self Input","Comment","Q1","Q2","Q3","Q4","Q5","Q1","Q2","Q3","Q4","Q5"];

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
            <td>{row[7]}</td>
            <td>{row[8]}</td>
            <td>{row[9]}</td>
            <td>{row[10]}</td>
            <td>{row[11]}</td>
            <td>{row[12]}</td>
            <td>{row[13]}</td>
            <td>{row[14]}</td>
            <td>{row[15]}</td>
            <td>{row[16]}</td>
            <td>{row[17]}</td>
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


// import { useEffect, useState } from "react";

// function ViewReporteesFeedback() {
//   const [feedbackData, setFeedbackData] = useState([]);
//   const [combinedData, setCombinedData] = useState([]);
//   const [attributes, setAttributes] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4545/api?rEmail=navya.r@accolitedigital.com&status=1")
//       .then(response => response.json())
//       .then(data => setFeedbackData(data))
//       .catch(error => console.error(error));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:4545/api/allQuestions")
//       .then(response => response.json())
//       .then(data => setAttributes(data));
//       console.log("attributes",attributes);
//   }, []);


//   useEffect(() => {
//     if (feedbackData.length > 0) {
//       const combined = feedbackData.map(async feedback => {
//         try {
//           const ratingResponse = await fetch(`http://localhost:4545/api/getRating/${feedback.feedbackId}`);
//           const ratingData = await ratingResponse.json();

//           const ratingData1 = ratingData.reduce((acc, [key, value]) => {
//             acc[key] = value;
//             return acc;
//           }, {});

//           console.log("rating",ratingData1);
          
//           return {
//             gemail: feedback.gemail,
//             startDate: feedback.startDate,
//             endDate: feedback.endDate,
//             attitude: ratingData1.Attitude,
//             behaviour: ratingData.behaviour,
            
//           };
//         } catch (error) {
//           console.error(error);
//         }
//       });

//       Promise.all(combined)
//         .then(data => setCombinedData(data))
//         .catch(error => console.error(error));
//     }
//   }, [feedbackData]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Email</th>
//           <th>Start Date</th>
//           <th>End Date</th>
//           {attributes.map((header) => (
//             <th key={header.attributeId}>{header.attribute}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {combinedData.map((data, index) => (
//           <tr key={index}>
//             <td>{data.gemail}</td>
//             <td>{data.startDate}</td>
//             <td>{data.endDate}</td>
//             <td>{data.attitude}</td>
//             <td>{data.behaviour}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default ViewReporteesFeedback;
