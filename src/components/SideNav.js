import React, { useState } from 'react';
import { Menu } from 'antd';
import  { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../Styles/profile-photo1.png'
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
  //  console.log("mail",emailId);
  const [data,setdata]=useState([]);
  const [role,setrole]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4545/api/getDetails/"+emailId).then((res)=>{
      //  console.log(res.data);
       setdata(res.data)
    })
  })

  useEffect(()=>{
    axios.get("http://localhost:4545/api/isManager/"+emailId).then((res)=>{
      
       console.log("role",res.data);

       if(res.data){
        console.log("MANAGER");
        setrole("MANAGER")
     } else {
        console.log("USER");
        setrole("USER")
     }
     

    })
  })


  const [current, setCurrent] = useState('/');
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <img
            src={image}
            alt="Profile"
            className="sidebar-profile-img"
          />
        </div>
        <div className='profiledetails' style={{textAlign: 'center'}}>
        <div>{data.name}</div>
        <div>{data.emailId}</div>
        </div>

<Menu
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
      icon: <UserOutlined />,
    },
    ...(data.role === 'ADMIN'
      ? [
          {
            label: 'Manage Attributes',
            key: '/managequestions',
            icon: <SolutionOutlined />,
          },
          {
            label: 'Manage Users',
            key: '/manageusers',
            icon: <TeamOutlined />,
          },

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

      ...(data.role==='BU HEAD'
      ? [
          {
            label: 'View BU Reportees',
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
