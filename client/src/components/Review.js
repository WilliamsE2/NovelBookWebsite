import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/Review.css';

const Review = ({name, bookId, bookTitle, rating, content, date, showUser}) => {

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
                            <Link to={`/layout/book/${bookId}`} className="review-book-link">
                                <img className='review-book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                            </Link>
                            <Link to={`/layout/book/${bookId}`} className="review-book-link">
                                <p className='review-book-title'>{bookTitle}</p>
                            </Link>
                        </div>
                }
            </div>
            <div className="review-right">
                <div className="review-right-top">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        defaultValue={0}
                        readOnly
                    />
                    <p className="review-date-text">{date}</p>
                </div>
                <div className="review-content">
                    <p className="review-content-description">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;