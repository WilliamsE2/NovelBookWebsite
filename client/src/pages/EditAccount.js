import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import '../styles/EditAccount.css';

const EditAccount = () => {

    const [selectStyle, changeSelectStyle] = useState('');

    const [openPhoto, changeOpenPhoto] = useState(false);
    const [openName, changeOpenName] = useState(false);
    const [openEmail, changeOpenEmail] = useState(false);
    const [openPass, changeOpenPass] = useState(false);

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
                            <p className='edit-content-text'>Evan Williams</p>
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
                                            fullWidth
                                            variant="standard"
                                        />
                                        <TextField 
                                            margin="dense"
                                            id="name"
                                            label="Last Name"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenName)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenName)}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div className="edit-content">
                            <p className='edit-content-text'>erwilliams331@gmail.com</p>
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
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenEmail)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenEmail)}>Update</div>
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
                                            autoFocus
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            variant="standard"
                                        />
                                        <TextField 
                                            margin="dense"
                                            id="password-again"
                                            label="Password Again"
                                            type="password"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenPass)}><p>Cancel</p></div>
                                        <div className='edit-dialog-button' onClick={() => handleClose(changeOpenPass)}>Update</div>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-logic">
                <Link to="/layout/account" className="edit-logic-link">
                    <div className="edit-logic-button edit-cancel-button">
                        <p className="edit-logic-text">Cancel</p>
                    </div>
                </Link>
                <Link to="/layout/account" className="edit-logic-link">
                    <div className="edit-logic-button edit-save-button">
                        <p className="edit-logic-text">Save</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default EditAccount;

