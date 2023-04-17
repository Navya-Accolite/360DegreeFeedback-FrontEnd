import React, { useState } from 'react';
import { Menu } from 'antd';
import  { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../Styles/profile-image.png'
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
  
  const emailId = window.localStorage.getItem('emailId');
  //  console.log("mail",emailId);
  const [data,setdata]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:4545/api/getDetails/"+emailId).then((res)=>{
      //  console.log(res.data);
       setdata(res.data)
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
        {/* <div>{data.id}</div> */}
        {/* <div>{data.role}</div> */}
        </div>
<div className='sideBtn'>
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
            label: 'Manage Questions',
            key: '/managequestions',
            icon: <SolutionOutlined />,
          },
          {
            label: 'Manage Users',
            key: '/manageusers',
            icon: <TeamOutlined />,
          },

<<<<<<< HEAD
         
=======
>>>>>>> c6a15c0978f2726f72c184a16a9436d2a0dc9ce1
        ]
      : []),
  ]}
 
/>
</div>

      </div>
    </div>
  );
}

export default SideNav;
