import React from 'react';
import '../App.css';
import { Route, useNavigate } from 'react-router-dom';


function ErrorPage() {

    const navigate = useNavigate();
    const handleRedirect = () => {
        window.history.forward();
        navigate('/',true);
    }

    return (
        <div className='error-page'>
            <div className='content'>
                <h1>404</h1>
                <h4>Page not found !</h4>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <div class="btn">
                    <button onClick={handleRedirect}>return home</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;