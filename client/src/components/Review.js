import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/Review.css';

const Review = ({name, rating, content, date, readOnly, editable, handler, showUser, bookTitle}) => {

    return (
        <div className="review">
            <div className="review-left">
                {
                    showUser ? 
                        <div>
                            <img className='review-user-image' src={require('../assets/profile-photo.png')} alt='Profile'/>
                            <p className="review-username-text">{name}</p>
                        </div>
                    :
                        <div>
                            <Link to="/layout/book" className="review-book-link">
                                <img className='review-book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                            </Link>
                            <Link to="/layout/book" className="review-book-link">
                                <p className='review-book-title'>{bookTitle}</p>
                            </Link>
                        </div>
                }
            </div>
            <div className="review-right">
                <div className="review-right-top">
                    {
                        readOnly ?
                            <Rating
                                className='review-star-rating'
                                name="simple-controlled"
                                value={rating}
                                defaultValue={0}
                                onChange={(event, newRating) => {
                                    console.log(newRating);
                                    handler(newRating);
                                }}
                                readOnly
                            />
                        :
                            <Rating
                                className='review-star-rating'
                                name="read-only"
                                value={rating}
                                defaultValue={0}
                            />
                    }
                    <p className="review-date-text">{date}</p>
                </div>
                <div className="review-content">
                    {
                        readOnly ?
                            <p className="review-content-description">{content}</p>
                        :
                            <input className="review-content-input" contentEditable="true" />
                    }
                </div>
                <div>
                    {
                        editable ?
                            <>
                                <div onClick={() => handler(3)}>Post</div>
                            </>
                        : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Review;