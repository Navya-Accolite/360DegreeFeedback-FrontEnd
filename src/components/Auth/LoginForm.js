import React, {  useEffect } from 'react'
import image from '../../Styles/feedback1.jpg';
import logo from '../../Styles/accolite-logo.png';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({onLoginSuccess}) => {

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
    const handleLoginApi = (response) => {
      console.log(response)
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
              window.sessionStorage.setItem('emailId', data.email);
              window.sessionStorage.setItem('accessToken', data.accessToken);
              console.log("accessToken",data.accessToken);
              console.log(data.accessToken)
              onLoginSuccess();
            }
            // updateaccessToken(data);
          })
          .catch((error) => {
          });
    };

return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "20px",
          borderRadius: "10px",
          width:"600px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "200px",
            height: "100px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ fontSize: "2rem", textAlign: "center" }}>
          Login here
        </h1>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "1.5rem",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
         <div className="google_btn" onClick={handleLoginApi}>
                     <div id="LoginButton"></div>
                </div>
        </button>
      </div>
    </div>
  );
}
export default LoginForm;