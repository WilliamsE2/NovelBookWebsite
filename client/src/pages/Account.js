import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import '../styles/Account.css';

// Components
import Review from '../components/Review.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const Account = () => {

    const userId = sessionStorage.getItem('userId');

    const [accountData, changeAccountData] = useState([]);
    const [reviewData, changeReviewData] = useState([]);

    const [joinDate, changeJoinDate] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/account', {
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
            changeAccountData(JSON.parse(data));
            changeJoinDate(new Date(JSON.parse(data).creation_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }));
        }); 
    }, [userId]);

    useEffect(() => {
        fetch('http://localhost:3001/account/reviews', {
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
            changeReviewData(JSON.parse(data));
        }); 
    }, [userId]);

    return (
        <div className='account-container'>
            {
                accountData.length < 1 ? 
                    <LoadingSpinner />
                : 
                    <div className='account-columns'>
                        <div className='account-column-left'>
                            <img className='account-profile-image' src={require(`../assets/profile-pics/${accountData.profile_pic_id}.jpeg`)} alt='Profile'/>
                            <Link to="editaccount" className="account-edit-link">
                                <div className='account-edit-button'>    
                                        <p className='account-edit-button-text'>Edit Profile</p>
                                </div>
                            </Link>
                        </div>
                        <div className='account-column-right'>
                            <div className='account-name'>
                                <p className='account-name-text'>{accountData.first_name} {accountData.last_name}</p>
                            </div>
                            <div className='account-info'>
                                {
                                    joinDate.length < 1 ? 
                                            '' 
                                        : 
                                            <p className='account-info-text'>Joined {joinDate}</p>
                                }
                                <p className='account-info-text'>{accountData.books_read} books read</p>
                                <p className='account-info-text'>{accountData.number_of_reviews} reviews written</p>
                            </div>
                        </div>
                    </div>       
            }
            <div className='account-activity'>
                <p className='account-activity-text'>Activity</p>
                <div className='account-review-list'>
                    {
                        reviewData.map((review) => (
                            <div className='account-review-list-element'>
                                <Review 
                                    bookCoverId={review.cover_pic_id} 
                                    bookId={review.book_id}
                                    bookTitle={review.book_title} 
                                    rating={review.rating} 
                                    content={review.review_description} 
                                    date={review.update_date} 
                                    showUser={false}
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
