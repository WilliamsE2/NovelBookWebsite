import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import '../styles/EditAccount.css';

// Components
import LoadingSpinner from '../components/LoadingSpinner.js';

const EditAccount = () => {

    const userId = sessionStorage.getItem('userId');

    const [editData, changeEditData] = useState([]);

    const [openPic, changeOpenPic] = useState(false);
    const [openName, changeOpenName] = useState(false);
    const [openEmail, changeOpenEmail] = useState(false);
    const [openPass, changeOpenPass] = useState(false);

    const [newProfilePic, changeNewProfilePic] = useState(editData.profile_pic_id);
    const [newFirstName, changeNewFirstName] = useState(editData.first_name);
    const [newLastName, changeNewLastName] = useState(editData.last_name);
    const [newEmail, changeNewEmail] = useState(editData.email);
    const [oldPassword, changeOldPassword] = useState('');
    const [newPassword, changeNewPassword] = useState('');
    const [newPasswordRepeat, changeNewPasswordRepeat] = useState('');

    const [invalidName, changeInvalidName] = useState(false);
    const [invalidEmail, changeInvalidEmail] = useState(false);
    const [duplicateEmail, changeDuplicateEmail] = useState(false);
    const [invalidPassword, changeInvalidPassword] = useState(false);
    const [incorrectOldPassword, changeIncorrectOldPassword] = useState(false);
    const [passwordMismatch, changePasswordMismatch] = useState(false);

    const [updateTrigger, changeUpdateTrigger] = useState(false);

    const picLimit = 3;
    const leftArrow = '<';
    const rightArrow = '>';

    useEffect(() => {
        fetch('http://localhost:3001/editaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            const jsonData = JSON.parse(data);
            changeEditData(jsonData);
            changeNewProfilePic(jsonData.profile_pic_id);
            changeNewFirstName(jsonData.first_name);
            changeNewLastName(jsonData.last_name);
            changeNewEmail(jsonData.email);
        }); 
    }, [userId, updateTrigger]);

    // Profile Pic
    const updateProfilePic = () => {
        fetch('http://localhost:3001/editaccount/pic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newProfilePic, userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeUpdateTrigger(!updateTrigger);
        });
    };

    const handleProfilePicUpdate = () => {
        handleClose(changeOpenPic);
        updateProfilePic();
    };

    const handleProfilePicCancel = () => {
        handleClose(changeOpenPic);
        changeNewProfilePic(editData.profile_pic_id);
    };

    // Name
    const updateName = () => {
        fetch('http://localhost:3001/editaccount/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newFirstName, newLastName, userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeUpdateTrigger(!updateTrigger);
        });
    };

    const handleNameUpdate = () => {
        if (newFirstName === editData.first_name && newLastName === editData.last_name) {
            handleClose(changeOpenName);
            changeInvalidName(false);
        } else if (newFirstName?.length > 0 && newLastName?.length > 0 && newFirstName?.length < 200 && newLastName?.length < 200) {
            updateName();
            handleClose(changeOpenName);
            changeInvalidName(false);
        } else {
            changeInvalidName(true);
        }
    };

    const handleNameCancel = () => {
        handleClose(changeOpenName);
        changeInvalidName(false);
        changeNewFirstName(editData.first_name);
        changeNewLastName(editData.last_name);
    }

    // Email
    const updateEmail = () => {
        fetch('http://localhost:3001/editaccount/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newEmail, userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeUpdateTrigger(!updateTrigger);
            handleClose(changeOpenEmail);
        });
    };

    const checkDuplicateEmail = () => {
        const email = newEmail;

        fetch('http://localhost:3001/duplicate', {
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
            if (JSON.parse(data).count < 1) {
                changeDuplicateEmail(false);
                updateEmail();
            } else {
                changeDuplicateEmail(true);
            }
        });
    };

    const handleEmailUpdate = () => {
        if (newEmail === editData.email) {
            handleClose(changeOpenEmail);
            changeInvalidEmail(false);
            changeDuplicateEmail(false);
        } else if (newEmail?.length > 0 && newEmail?.length < 200) {
            changeInvalidEmail(false);
            checkDuplicateEmail();
        } else {
            changeInvalidEmail(true);
        }
    };

    const handleEmailCancel = () => {
        handleClose(changeOpenEmail);
        changeInvalidEmail(false);
        changeNewEmail(editData.email);
    }

    // Password
    const updatePassword = () => {
        fetch('http://localhost:3001/editaccount/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newPassword, userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeUpdateTrigger(!updateTrigger);
            changeOldPassword('');
            changeNewPassword('');
            changeNewPasswordRepeat('');
        });
    };

    const handlePasswordUpdate = () => {
        if (oldPassword?.length < 1 || oldPassword?.length > 200 
            || newPassword?.length < 1 || newPassword?.length > 200 
            || newPasswordRepeat?.length < 1 || newPasswordRepeat?.length > 200) {
            changeInvalidPassword(true);
            changeIncorrectOldPassword(false);
            changePasswordMismatch(false);
        } else if (oldPassword !== editData.password) {
            changeInvalidPassword(false);
            changeIncorrectOldPassword(true);
            changePasswordMismatch(false);
        } else if (newPassword !== newPasswordRepeat) {
            changeInvalidPassword(false);
            changeIncorrectOldPassword(false);
            changePasswordMismatch(true);
        } else {
            updatePassword();
            handleClose(changeOpenPass);
            changeInvalidPassword(false);
            changeIncorrectOldPassword(false);
            changePasswordMismatch(false);
        }
    };

    const handlePasswordCancel = () => {
        handleClose(changeOpenPass);
        changeInvalidPassword(false);
        changeIncorrectOldPassword(false);
        changePasswordMismatch(false);
    }

    // Open and Close
    const handleClose = (changeFunc) => {
        changeFunc(false)
    };

    const handleOpen = (changeFunc) => {
        changeFunc(true);
    };

    // Change Profile Pic
    const swapPhoto = (direction) => {
        if (direction === 1) {
            if (newProfilePic <= 1) {
                changeNewProfilePic(picLimit);
            } else {
                changeNewProfilePic(newProfilePic - 1);
            }
        } else {
            if (newProfilePic >= picLimit) {
                changeNewProfilePic(1);
            } else {
                changeNewProfilePic(newProfilePic + 1);
            }
        }
    }

    return (
        <div className='edit-container'>
            <div className='edit-columns'>
                <div className='edit-column-left'>
                    {
                        editData.length < 1 ? 
                            <LoadingSpinner />
                        : 
                            <img className='edit-profile-pic-image' src={require(`../assets/profile-pics/${newProfilePic}.jpeg`)} alt='Profile'/>
                    }
                    {
                        openPic ?
                            <div className='edit-profile-pic'>
                                <div className='edit-profile-pic-selection'>
                                    <p className='edit-profile-change-text' onClick={() => swapPhoto(1)}>{leftArrow}</p>
                                    <p className='edit-profile-change-text' onClick={() => swapPhoto(2)}>{rightArrow}</p>
                                </div>
                                <div className='edit-profile-pic-selection'>
                                    <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleProfilePicCancel()}><p>Cancel</p></div>
                                    <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleProfilePicUpdate()}>Update</div>
                                </div>
                            </div>
                        :
                            <p className='edit-profile-open-text' onClick={() => handleOpen(changeOpenPic)}>Change Photo</p>
                    }
                </div>
                <div className='edit-column-right'>
                    <div className='edit-title'>
                        <p className='edit-title-text'>Edit Account</p>
                    </div>
                    <div className='edit-content-section'>
                        <div className="edit-content">
                            <p className='edit-content-text'>{editData.first_name} {editData.last_name}</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text" onClick={() => handleOpen(changeOpenName)}>Update Name</p>
                                <Dialog open={openName} onClose={() => handleClose(changeOpenName)}>
                                    <DialogContent>
                                        <TextField 
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="First Name"
                                            type="text"
                                            defaultValue={editData.first_name}
                                            value={newFirstName}
                                            onChange={(event) => {changeNewFirstName(event.target.value)}}
                                            fullWidth
                                            variant="standard"
                                        />
                                        <TextField 
                                            margin="dense"
                                            id="name"
                                            label="Last Name"
                                            type="text"
                                            defaultValue={editData.last_name}
                                            value={newLastName}
                                            onChange={(event) => {changeNewLastName(event.target.value)}}
                                            fullWidth
                                            variant="standard"
                                        />
                                        {
                                            invalidName ? 
                                                <p className='register-incorrect-text'>Invalid name.</p>
                                            : ''
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleNameCancel()}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleNameUpdate()}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className="edit-content">
                            <p className='edit-content-text'>{editData.email}</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text" onClick={() => handleOpen(changeOpenEmail)}>Update Email</p>
                                <Dialog open={openEmail} onClose={() => handleClose(changeOpenEmail)}>
                                    <DialogContent>
                                        <TextField 
                                            autoFocus
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            defaultValue={editData.email}
                                            value={newEmail}
                                            onChange={(event) => {changeNewEmail(event.target.value)}}
                                            style = {{width: 300}}
                                            variant="standard"
                                        />
                                        {
                                            invalidEmail ? 
                                                <p className='edit-incorrect-text'>Invalid email.</p>
                                            : ''
                                        }
                                        {
                                            duplicateEmail ? 
                                                <p className='edit-incorrect-text'>Email already in use.</p>
                                            : ''
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleEmailCancel()}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleEmailUpdate()}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className="edit-content">
                            <p className='edit-content-text'>*******</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text" onClick={() => handleOpen(changeOpenPass)}>Change Password</p>
                                <Dialog open={openPass} onClose={() => handleClose(changeOpenPass)}>
                                    <DialogContent>
                                        <TextField 
                                            margin="dense"
                                            id="password"
                                            label="Old Password"
                                            type="password"
                                            value={oldPassword}
                                            onChange={(event) => {changeOldPassword(event.target.value)}}
                                            fullWidth
                                            variant="standard"
                                        />
                                        {
                                            incorrectOldPassword ? 
                                                <p className='register-incorrect-text'>Password is incorrect.</p>
                                            : ''
                                        }
                                        <TextField 
                                            margin="dense"
                                            id="password"
                                            label="New Password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(event) => {changeNewPassword(event.target.value)}}
                                            fullWidth
                                            variant="standard"
                                        />
                                        <TextField 
                                            margin="dense"
                                            id="password-again"
                                            label="New Password Again"
                                            type="password"
                                            value={newPasswordRepeat}
                                            onChange={(event) => {changeNewPasswordRepeat(event.target.value)}}
                                            fullWidth
                                            variant="standard"
                                        />
                                        {
                                            invalidPassword ? 
                                                <p className='register-incorrect-text'>Invalid passwords.</p>
                                            : ''
                                        }
                                        {
                                            passwordMismatch ? 
                                                <p className='register-incorrect-text'>New password does not match.</p>
                                            : ''
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handlePasswordCancel()}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handlePasswordUpdate()}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className="edit-back">
                            <Link to="/layout/account" className="edit-back-link">
                                <p className="edit-back-button">Back</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;

