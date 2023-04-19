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
import ManageUsers from './components/ManageUsers';
import DisableEmployee from './components/DisableEmployee';
import image from './Styles/accolite-logo.png';
import ViewReportees from './components/ViewReportees';
import './index.css';

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

function Content(){
  return <div className='class1'>
<Routes>
      <Route path="/" Component={HomeContent}></Route>
      <Route path="/givefeedback" Component={GiveFeedback}></Route>
      <Route path="/requestfeedback" Component={RequestFeedback}></Route>
      <Route path="/logout" Component={LogOutPage}></Route>
      <Route path="managequestions" Component={ManageQuestions}></Route>
      <Route path="manageusers" Component={ManageUsers}></Route>
      <Route path="disableemployee" Component={DisableEmployee}></Route>
      <Route path="/viewreportees" Component={ViewReportees}></Route>

</Routes>
  </div>
}
export default App;
