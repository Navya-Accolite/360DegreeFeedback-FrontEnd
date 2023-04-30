import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeContent from './components/Home/HomeContent';
import GiveFeedback from './components/GiveFeedback/GiveFeedback';
import SideNav from './components/Auth/SideNav';
import RequestFeedback from './components/RequestFeedback/RequestFeedback';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutPage from './components/Auth/LogOutPage';
import ManageQuestions from './components/Admin/ManageQuestions';
import ManageUsers from './components/Admin/ManageUsers';
import ViewReportees from './components/Manager/ViewReportees';
import ViewBUReportees from './components/BUHead/ViewBUReportees';
import ViewBUManagers from './components/BUHead/ViewBUReporteesManager';
import './index.css';
import a from '../src/Styles/accoliteimage-removebg.png'
import ViewReporteesFeedback from './components/Manager/ViewReporteesTable';
import LoginForm from './components/Auth/LoginForm';
import FeedbackForm from './components/GiveFeedback/FeedbackForm';
function App() {
  const navigate=useNavigate();
  useEffect(() => {
    if (window.sessionStorage.getItem('emailId')) {
      setIsLoggedIn(true);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onLoginSuccess = () => {
    if (window.sessionStorage.getItem('emailId')) {
      setIsLoggedIn(true);
    }
  }
  const onLogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      sessionStorage.clear();
      setIsLoggedIn(false);
      navigate('/');
    }
  }
  return (
    <>
      {!isLoggedIn &&
        <LoginForm onLoginSuccess={onLoginSuccess} />}
      {isLoggedIn &&
        <>
          <div className="Head">
             <span>
                <span className='logo'>
                  <img src={a} style={{height:"65px",width:"200px"}}></img>
                </span>
                  <span className='name'>360 Degree Feedback</span>
              </span>
            
            <span className='Logout'><Button color="primary" onClick={onLogout}>
              Logout
            </Button></span>
          </div>
          <div className="sidebar">
            <SideNav />
            <Content />
          </div>
        </>}
    </>
  );
}
function Content() {
  return (
    <div className='class1'>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/givefeedback" element={<GiveFeedback />} />
        <Route path="/requestfeedback" element={<RequestFeedback />} />
        <Route path="/managequestions" element={<ManageQuestions />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/viewreportees" element={<ViewReportees />} />
        <Route path="viewreporteesfeedback" element={<ViewReporteesFeedback />} />
        <Route path="/viewbureportees" element={<ViewBUReportees />} />
        <Route path="/viewbumanagers" element={<ViewBUManagers />} />
        <Route path="/feedbackform" element={<FeedbackForm />} />
      </Routes>
    </div>
  );
}
export default App;