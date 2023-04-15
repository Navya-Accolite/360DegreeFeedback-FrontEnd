import './App.css';
import { Button } from 'reactstrap';
import { Route, Routes } from 'react-router-dom';
import HomeContent from './components/HomeContent';
import GiveFeedback from './components/GiveFeedback';
import SideNav from './components/SideNav';
import RequestFeedback from './components/RequestFeedback';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutPage from './components/LogOutPage';
import ManageQuestions from './components/ManageQuestions';

function App() {

  const handleRefresh = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      window.location.reload();
    }
  };
 

  return (
    <>
      <div className="Head">
     <span className='name'><button>360 degree Feedback</button></span>
     <div>

  
</div>
     <span className='Logout'><Button color="primary" onClick={handleRefresh}>
      Logout
    </Button></span>
      </div>
      <div className="sidebar">
        <SideNav />
        <Content />
      </div>
     
    </>
  );
}

function Content(){
  return <div>
<Routes>
      <Route path="/" Component={HomeContent}></Route>
      <Route path="/givefeedback" Component={GiveFeedback}></Route>
      <Route path="/requestfeedback" Component={RequestFeedback}></Route>
      <Route path="/logout" Component={LogOutPage}></Route>
      <Route path="managequestions" Component={ManageQuestions}></Route>
</Routes>
  </div>
}
export default App;


// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// class App extends Component {
  
//   render() {
    
    
//     return (
//       <div
//         className="loginLayout"
//       >
//         <div  style={{paddingLeft:35}}>
//           <div style={{color: "red",padding:"20px"}}><center>Please Login First!</center></div>
            
          
//           <label>User Name</label>
          
//         </div>
//         <div style={{ marginTop: 20 , paddingLeft:40}}>
//           <label>Password</label>
          
//         </div>
//         <div className="loinBtn">
//         <div className="loinBtn">
          
//           <Link path='/h'> Click
//           </Link>
//         </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;