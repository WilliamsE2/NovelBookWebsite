import { Link } from "react-router-dom";

import '../styles/EditAccount.css';

const EditAccount = () => {
    return (
        <div className='edit-container'>
            <div className='edit-columns'>
                <div className='edit-column-left'>
                    <img className='edit-profile-image' src={require('../assets/profile-photo.png')} alt='Profile'/>
                    <p className='edit-profile-button-text'>Change Photo</p>
                </div>
                <div className='edit-column-right'>
                    <div className='edit-title'>
                        <p className='edit-title-text'>Edit Account</p>
                    </div>
                    <div className='edit-content-section'>
                        <div className="edit-content">
                            <p className='edit-content-text'>Evan Williams</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text">Update</p>
                            </div>
                        </div>
                        <div className="edit-content">
                            <p className='edit-content-text'>erwilliams331@gmail.com</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text">Update</p>
                            </div>
                        </div>
                        <div className="edit-content">
                            <p className='edit-content-text'>*******</p>
                            <div className="edit-content-button">
                                <p className="edit-content-button-text">Change Password</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-logic">
                <div className="edit-logic-button edit-close-button">
                    <p className="edit-logic-text">Close</p>
                </div>
                <div className="edit-logic-button edit-save-button">
                    <p className="edit-logic-text">Save</p>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;

