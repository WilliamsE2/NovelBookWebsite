import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

import '../styles/Login.css';

const Login = () => {

    const navigate = useNavigate();
    
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const [fieldsMissing, changeFieldsMissing] = useState(false);
    const [incorrectPass, changeIncorrectPass] = useState(false);

    const passCheck = 'e';

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function fieldsDelay() {
        changeFieldsMissing(false);
        await timeout(500);
        changeFieldsMissing(true);
    }

    async function passDelay() {
        changeIncorrectPass(false);
        await timeout(500);
        changeIncorrectPass(true);
    }

    const handleLogin = () => {
        let navTo = true;

        if (email === '' || password === '') {
            if (fieldsMissing) {
                fieldsDelay();
                navTo = false;
            } else {
                changeFieldsMissing(true);
                navTo = false;
            }
            return;
        } else {
            changeFieldsMissing(false);
        }

        if (incorrectPass && password !== passCheck) {
            passDelay();
            navTo = false;
        } else if (password !== passCheck) {
            changeIncorrectPass(true);
            navTo = false;
        } else {
            changeIncorrectPass(false);
        }

        if (navTo) {
            navigate('/layout');
        }
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
