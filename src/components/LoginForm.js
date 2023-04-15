    import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
const LoginForm = ({ onLogin }) => {


    useEffect(()=>{
        /* global google */
   setTimeout(()=>{
    google.accounts.id.initialize({
      client_id:"972510147800-seoife30hvnpstc4bkk7e83timtprvdm.apps.googleusercontent.com",
      callback:handleLoginApi
  })
  google.accounts.id.renderButton(
      document.getElementById("LoginButton"),
      {
          theme:"outline",
          size:"large",
          type:"standard"
      }
  )
   },500)
    },[])
    // function handleLoginApi(response){
    //     onLogin();
    //     console.log(JSON.stringify({token:response.credential}))
    //     window.localStorage.setItem('LoggedIn',"YES");
    //     fetch("http://localhost:4545/auth/login",{
    //         method:"POST",
    //         body:JSON.stringify({token:response.credential})
    //     })
    //    .then((response) => {
    //         console.log(response.data.user.emailId);
    //         const emailId = response.email;
    //         const token=response.accessToken;
    //         console.log(emailId);
    //         window.localStorage.setItem('email', emailId);
    //         window.localStorage.setItem('token', token);
    //     });

    //     onLogin();
    // }
    const handleLoginApi = (response) => {
        fetch(`http://localhost:4545/auth/login`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {
            
            if (data.length !== 0) {
              localStorage.setItem("email", data.email);
              localStorage.setItem("accessToken", data.accessToken);
              console.log(data.accessToken)
              onLogin();
            }
            // updateaccessToken(data);
          })
          .catch((error) => {
            
          });
    };
    return (
        <div className='loginWrapper'>
                <h2>Welcome</h2>
                <div className="google_btn" onClick={handleLoginApi}>
                    <div id="LoginButton"></div>
                </div>
            </div>
    )
}
export default LoginForm;
