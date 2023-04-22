import React, { useState } from 'react';
import LoginForm from './LoginForm';
import App from '../../App';


function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      {isLoggedIn ? (
        <App/>
      ) : (
        <LoginForm onLogin={handleLogin}/>
      )}
    </div>
  );
}

export default LoginPage;
