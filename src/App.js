import './App.css';
import { Button } from 'reactstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomeContent from './components/HomeContent';
import GiveFeedback from './components/GiveFeedback';
import SideNav from './components/SideNav';
import RequestFeedback from './components/RequestFeedback';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogOutPage from './components/LogOutPage';
import ManageQuestions from './components/ManageQuestions';
import ManageUsers from './components/ManageUsers';
import DisableEmployee from './components/DisableEmployee';
import ViewReportees from './components/ViewReportees';
import ViewBUReportees from './components/ViewBUReportees';
import ViewBUManagers from './components/ViewBUReporteesManager';
import './index.css';
import ViewReporteesFeedback from './components/ViewReporteesTable';

function App() {

  const handleRefresh = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      window.location.reload();
      localStorage.clear();
    }
  };
 

  return (
    <>
      <div className="Head">
     <span className='name'>360 DEGREE FEEDBACK</span>
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

function Content() {
  return (
    <div className='class1'>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/givefeedback" element={<GiveFeedback />} />
        <Route path="/requestfeedback" element={<RequestFeedback />} />
        <Route path="/managequestions" element={<ManageQuestions />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/disableemployee" element={<DisableEmployee />} />
        <Route path="/viewreportees" element={<ViewReportees />} />
        <Route path="viewreporteesfeedback" element={<ViewReporteesFeedback />} />
        <Route path="/viewbureportees" element={<ViewBUReportees/>}/>
        <Route path="/viewbumanagers" element={<ViewBUManagers/>}/>
      </Routes>
    </div>
  );
}



export default App;
