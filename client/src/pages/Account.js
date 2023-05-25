import { Link } from "react-router-dom";

import '../styles/Account.css';

// Components
import Review from '../components/Review.js';

import reviewData from '../review-data.json';

const Account = () => {
    return (
        <div className='account-container'>
            <div className='account-columns'>
                <div className='account-column-left'>
                    <img className='account-profile-image' src={require('../assets/profile-photo.png')} alt='Profile'/>
                    <Link to="/editaccount" className="account-edit-link">
                        <div className='account-edit-button'>    
                                <p className='account-edit-button-text'>Edit Profile</p>
                        </div>
                    </Link>
                </div>
                <div className='account-column-right'>
                    <div className='account-name'>
                        <p className='account-name-text'>Evan Williams</p>
                    </div>
                    <div className='account-info'>
                        <p className='account-info-text'>Joined March 3rd 2023</p>
                        <p className='account-info-text'>4 books read</p>
                        <p className='account-info-text'>2 reviews written</p>
                    </div>
                </div>
            </div>
            <div className='account-activity'>
                <p className='account-activity-text'>Activity</p>
                <div className='account-review-list'>
                    {
                        reviewData.map((review) => (
                            <div className='account-review-list-element'>
                                <Review 
                                    name={review.name} 
                                    rating={review.rating} 
                                    content={review.content} 
                                    date={review.update_date} 
                                    readOnly={true} 
                                    showUser={false}
                                    bookTitle={'Harry Potter and the Deathly Hallows'}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;
