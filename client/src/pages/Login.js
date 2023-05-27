import React, {useState} from 'react';
import { Link } from "react-router-dom";

import '../styles/Login.css';

const Login = () => {
    
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [incorrectPass, changeIncorrectPass] = useState(false);

    const passCheck = 'password';

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function loginDelay() {
        changeIncorrectPass(false);
        await timeout(500);
        changeIncorrectPass(true);
    }

    const handleLogin = () => {
        if (incorrectPass && password !== passCheck) {
            loginDelay();
        } else if (password !== passCheck) {
            changeIncorrectPass(true);
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
