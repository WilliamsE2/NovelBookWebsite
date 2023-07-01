import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import '../styles/EditAccount.css';

const EditAccount = () => {

    const userId = sessionStorage.getItem('userId');

    const [editData, changeEditData] = useState([]);

    const [selectStyle, changeSelectStyle] = useState('');

    const photoOptions = [
        {
            'id': 'p1',
            'path': require('../assets/profile-photo.png'),
            'title': 'test-photo',
            'alt': 'Test'
        },
        {
            'id': 'p2',
            'path': require('../assets/profile-photo.png'),
            'title': 'test-photo',
            'alt': 'Test'
        }
    ]

    const [openPhoto, changeOpenPhoto] = useState(false);
    const [openName, changeOpenName] = useState(false);
    const [openEmail, changeOpenEmail] = useState(false);
    const [openPass, changeOpenPass] = useState(false);

    const [newFirstName, changeNewFirstName] = useState(editData.first_name);
    const [newLastName, changeNewLastName] = useState(editData.last_name);
    const [newEmail, changeNewEmail] = useState(editData.email);
    const [newPassword, changeNewPassword] = useState('');
    const [newPasswordRepeat, changeNewPasswordRepeat] = useState('');

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
            changeEditData(JSON.parse(data));
        }); 
    }, [userId]);

    const handlePhotoSelect = (imageId) => {
        changeSelectStyle(imageId);
    }

    const handleOpen = (changeFunc) => {
        changeFunc(true);
    };

    const handleClose = (changeFunc) => {
        changeFunc(false)
    };

    return (
        <div className='edit-container'>
            <div className='edit-columns'>
                <div className='edit-column-left'>
                    <img className='edit-profile-image' src={require('../assets/profile-photo.png')} alt='Profile'/>
                    <p className='edit-profile-button-text' onClick={() => handleOpen(changeOpenPhoto)}>Change Photo</p>
                    <Dialog open={openPhoto} onClose={() => handleClose(changeOpenPhoto)}>
                        <DialogContent>
                            <div className='edit-dialog-profile-photo-content'>
                                {
                                    photoOptions.map((image) => (
                                        <img 
                                            className={image.id}
                                            onClick={() => handlePhotoSelect()}
                                            src={image.path} 
                                            alt={image.alt} 
                                        /> 
                                    ))
                                }
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <div className='edit-dialog-button' onClick={() => handleClose(changeOpenPhoto)}><p>Cancel</p></div>
                            <div className='edit-dialog-button' onClick={() => handleClose(changeOpenPhoto)}>Update</div>
                        </DialogActions>
                    </Dialog>
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
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleClose(changeOpenName)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleClose(changeOpenName)}>Update</div>
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
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleClose(changeOpenEmail)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleClose(changeOpenEmail)}>Update</div>
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
                                            fullWidth
                                            variant="standard"
                                        />
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
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button edit-dialog-cancel-button' onClick={() => handleClose(changeOpenPass)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button edit-dialog-update-button' onClick={() => handleClose(changeOpenPass)}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-back">
                <Link to="/layout/account" className="edit-back-link">
                    <p className="edit-back-button">Back</p>
                </Link>
            </div>
        </div>
    );
};

export default EditAccount;

