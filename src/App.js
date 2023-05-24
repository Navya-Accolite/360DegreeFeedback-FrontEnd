import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomeContent from './components/Home/HomeContent';
import GiveFeedback from './components/GiveFeedback/GiveFeedback';
import SideNav from './components/Auth/SideNav';
import RequestFeedback from './components/RequestFeedback/RequestFeedback';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import ErrorPage from './components/ErrorPage';

function App() {
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname)
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
        <Routes>
          <Route exact path="/" element={<LoginForm onLoginSuccess={onLoginSuccess} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      }

      {isLoggedIn &&
        <>
          <div className="Head">
            <span>
              <span className='logo'>
                <img src={a} style={{ height: "65px", width: "200px" }}></img>
              </span>
              <span className='name'>360 Degree Feedback</span>
            </span>

            <span className='Logout'>
            {/* <img src={a} style={{ height: "65px", width: "200px" }}></img> */}
              <Button color="primary" onClick={onLogout}>
                Logout
              </Button>
            </span>
          </div>

          <div className="sidebar">
            {location.pathname !== "*" && <SideNav />}
            <Content />
          </div>
        </>
      }
    </>
  );
}

function Content() {
  return (
    <div className='class1'>
      <Routes>
        <Route exact path="/" element={<HomeContent />} />
        <Route exact path="/givefeedback" element={<GiveFeedback />} />
        <Route exact path="/requestfeedback" element={<RequestFeedback />} />
        <Route exact path="/managequestions" element={<ManageQuestions />} />
        <Route exact path="/manageusers" element={<ManageUsers />} />
        <Route exact path="/viewreportees" element={<ViewReportees />} />
        <Route exact path="viewreporteesfeedback" element={<ViewReporteesFeedback />} />
        <Route exact path="/viewbureportees" element={<ViewBUReportees />} />
        <Route exact path="/viewbumanagers" element={<ViewBUManagers />} />
        <Route exact path="/feedbackform" element={<FeedbackForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;