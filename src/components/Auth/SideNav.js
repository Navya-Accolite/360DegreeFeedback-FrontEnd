import React, { useState } from 'react';
import { Menu } from 'antd';
import  { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../../Styles/profile-photo1.png'
import {VscFeedback} from 'react-icons/vsc'
import {
  HomeOutlined,
  UserOutlined,
  ForwardOutlined,
  AliwangwangOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';

function SideNav() {
  const navigate = useNavigate();
  
  const emailId = window.sessionStorage.getItem('emailId');
  const header="Bearer "+window.sessionStorage.getItem('accessToken');
  const [data,setdata]=useState([]);
  const [role,setrole]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4545/api/getDetails/"+emailId,{
      headers: {
        "Content-type": "application/json",
         Authorization: header,
      }
    }).then((res)=>{
      //  console.log(res.data);
       setdata(res.data)
    })
  })

  useEffect(()=>{
    axios.get("http://localhost:4545/api/checkRole/"+emailId,
    { headers: {
      "Content-type": "application/json",
       Authorization: header,
    }}).then((res)=>{

       if(res.data=="manager"){
        setrole("MANAGER")
     } else if(res.data=="employee") {
        console.log("USER");
        setrole("USER")
     }
     else if(res.data=="ADMIN") {
      setrole("ADMIN")
   }
   else
   {
    setrole("BU HEAD")
   }
    })
  },[])


  const [current, setCurrent] = useState('/');
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* <div className="sidebar-header">
          <img
            src={image}
            alt="Profile"
            className="sidebar-profile-img"
          />
        </div> */}
        <div className='profiledetails' >
        <div>{data.name}</div>
        {/* <div>{data.emailId}</div> */}
        <div>{role}</div>
        </div>

<Menu className='menu'
  onClick={({ key }) => {
    navigate(key);
  }}
  defaultSelectedKeys={[window.location.path]}

  items={[
    { label: 'Home', key: '/', icon: <HomeOutlined /> },
    {
      label: 'Request Feedback',
      key: '/requestfeedback',
      icon: <ForwardOutlined />,
    },
    {
      label: 'Give Feedback',
      key: '/givefeedback',
      icon: <VscFeedback />,
    },
    ...(role === 'ADMIN'
      ? [
          {
            label: 'Manage Attributes',
            key: '/managequestions',
            icon: <SolutionOutlined />,
          },
          // {
          //   label: 'Manage Users',
          //   key: '/manageusers',
          //   icon: <TeamOutlined />,
          // },

        ]
      : []),

    ...(role==='MANAGER'
      ? [
          {
            label: 'View Reportees',
            key: '/viewreportees',
            icon: <SolutionOutlined />,
          },

        ]
      : []),

      ...(role==='BU HEAD'
      ? [
          {
            label: 'View BU Report',
            key: '/viewbureportees',
            icon: <SolutionOutlined />,
          },

        ]
      : []),


  ]}
 
/>


      </div>
    </div>
  );
}

export default SideNav;
