import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

function ViewReporteesFeedback(props) {
  const location = useLocation();
  const propValue = location.state.propValue;
  const [data,setData]=useState([]);

  useEffect(() => {
     {
      fetch("http://localhost:4545/api?rEmail="+propValue+"&status=1")
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error));

        console.log(data);
    }
  }, []);

  return (
   
    <div>{propValue}
     {console.log(propValue,location)}
     </div>
  );
}

export default ViewReporteesFeedback;