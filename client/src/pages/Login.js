import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import '../styles/Login.css';

const Login = () => {

    const navigate = useNavigate();
    
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const [fieldsMissing, changeFieldsMissing] = useState(false);
    const [incorrectPass, changeIncorrectPass] = useState(false);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    };

    async function fieldsDelay() {
        changeFieldsMissing(false);
        await timeout(500);
        changeFieldsMissing(true);
    };

    async function passDelay() {
        changeIncorrectPass(false);
        await timeout(500);
        changeIncorrectPass(true);
    };

    const validatePassword = () => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            let pass = '';
            if (data.length > 2) {
                pass = JSON.parse(data)[0].password;   
            }

            if (pass.length > 0 && password === pass) {
                navigate('/layout');
            } else {
                passDelay();
            }
        });
    };

    const handleLogin = () => {
        if (email === '' || password === '') {
            fieldsDelay();
            changeIncorrectPass(false);
            return;
        } else {
            changeFieldsMissing(false);
        }

        //validatePassword();
        navigate('/layout');
    };
    
    return (
        <div className='login-container'>
            <div className='login-section login-box'>
                <div className='login-section'>
                    <h1 className="login-title-text">novel.</h1>
                    <div className='login-email'>
                        <p className='login-label'>Email</p>
                        <input className='login-input' value={email} onChange={(e) => changeEmail(e.target.value)} type='email' name='email' />
                    </div>
                    <div className='login-password'>
                        <p className='login-label'>Password</p>
                        <input className='login-input' value={password} onChange={(e) => changePassword(e.target.value)} type='password' name='password' />
                        {
                            fieldsMissing ? 
                                <p className='login-incorrect-text'>Fields are missing.</p>
                            : ''
                        }
                        {
                            incorrectPass ? 
                                <p className='login-incorrect-text'>Password or email is incorrect.</p>
                            : ''
                        }
                    </div>
                    <div className='login-button' onClick={() => handleLogin()}>
                        <p className="login-button-text">Login</p>
                    </div>
                </div>
                <div className='login-register'>
                    <p className='login-register-text'>Don't have an account?</p>
                    <Link to="/register" className="login-register-link">
                        <p className='login-register-button'>Register</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
