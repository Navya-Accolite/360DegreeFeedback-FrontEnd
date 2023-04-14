import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeContent from './components/HomeContent';
import GiveFeedback from './components/GiveFeedback';
import SideNav from './components/SideNav';
import RequestFeedback from './components/RequestFeedback';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <div className="Head">
     <span className='name'><button>360 degree Feedback</button></span>
     <span className='Logout'><button>Logout</button></span>
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
      <Route path="/h" Component={HomeContent}></Route>
      <Route path="/givefeedback" Component={GiveFeedback}></Route>
      <Route path="/requestfeedback" Component={RequestFeedback}></Route>
    </Routes>
    
  </div>
}



export default App;
