import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import '../styles/Register.css';

const Register = () => {

    const navigate = useNavigate();

    const [email, changeEmail] = useState('');
    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [password, changePassword] = useState('');
    const [passwordAgain, changePasswordAgain] = useState('');

    const [fieldsMissing, changeFieldsMissing] = useState(false);
    const [incorrectPass, changeIncorrectPass] = useState(false);
    const [duplicateEmail, changeDuplicateEmail] = useState(false);

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

    async function duplicateDelay() {
        console.log('delay');
        await timeout(1000);
    }

    function checkDuplicateEmail() {
        let dup = false;

        fetch('http://localhost:3001/duplicate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            if (data?.length > 2) {
                changeDuplicateEmail(true);
                dup = true;
            } else {
                changeDuplicateEmail(false);
            }
        });

        duplicateDelay();
        return dup;
    }

    const handleRegister = () => {
        let navTo = true;

        if (email === '' || firstName === '' || lastName === '' || (password === '' || passwordAgain === '')) {
            if (fieldsMissing) {
                fieldsDelay();
                navTo = false;
            } else {
                changeFieldsMissing(true);
                navTo = false;
            }
        } else {
            changeFieldsMissing(false);
        }
        
        if (incorrectPass && password !== passwordAgain) {
            passDelay();
            navTo = false;
        } else if (password !== passwordAgain) {
            changeIncorrectPass(true);
            navTo = false
        } else {
            changeIncorrectPass(false);
        }

        let dup = false;
        if (navTo) {
            dup = checkDuplicateEmail();
        } else if (duplicateEmail) {
            changeDuplicateEmail(false);
        }

        if (navTo && !dup) {
            navigate('/layout');
        }
    };

    return (
        <div className='register-container'>
            <div className='register-section register-box'>
                <div className='register-section'>
                    <h1 className="register-text">Register your account</h1>
                    <div className='register-email'>
                        <p className='register-label'>Email</p>
                        <input className='register-input' value={email} onChange={(e) => changeEmail(e.target.value)} type='email' name='email' />
                    </div>
                    <div className='register-div'>
                        <p className='register-label'>First Name</p>
                        <input className='register-input' value={firstName} onChange={(e) => changeFirstName(e.target.value)} name='name' />
                    </div>
                    <div className='register-div'>
                        <p className='register-label'>Last Name</p>
                        <input className='register-input' value={lastName} onChange={(e) => changeLastName(e.target.value)} name='name' />
                    </div>
                    <div className='register-div register-password'>
                        <p className='register-label'>Password</p>
                        <input className='register-input' value={password} onChange={(e) => changePassword(e.target.value)} type='password' name='password' />
                    </div>
                    <div className='register-div'>
                        <p className='register-label'>Confirm Password</p>
                        <input className='register-input' value={passwordAgain} onChange={(e) => changePasswordAgain(e.target.value)} type='password' name='password' />
                        {
                            fieldsMissing ? 
                                <p className='register-incorrect-text'>Fields are missing.</p>
                            : ''
                        }
                        {
                            incorrectPass ? 
                                <p className='register-incorrect-text'>Passwords don't match.</p>
                            : ''
                        }
                        {
                            duplicateEmail ? 
                                <p className='register-incorrect-text'>Email is taken. Choose another.</p>
                            : ''
                        }
                    </div>
                    <div className='register-button' onClick={() => handleRegister()}>
                        <p className="register-button-text">Register</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
