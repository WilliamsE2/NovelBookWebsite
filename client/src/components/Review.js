import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/Review.css';

const Review = ({name, profilePicId, bookCoverId, bookId, bookTitle, rating, content, date, showUser, deletable, deleteFunc}) => {

    return (
        <div className="review">
            <div className="review-left">
                {
                    showUser ? 
                        <div>
                            <img className='review-user-image' src={require(`../assets/profile-pics/${profilePicId}.jpeg`)} alt='Profile'/>
                            <p className="review-username-text">{name}</p>
                        </div>
                    :
                        <div>
                            <Link to={`/layout/book/${bookId}`} className="review-book-link">
                                <img className='review-book-cover-image' src={require(`../assets/book-covers/${bookCoverId}.jpeg`)} alt='Book Cover'/>
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
                    <p className="review-date-text">{new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>
                <div className="review-content">
                    <p className="review-content-description">{content}</p>
                </div>
                {
                    deletable ? 
                        <div>
                            <div className='review-content-delete-button' onClick={deleteFunc}>Delete</div>
                        </div>
                    : ''
                }
            </div>
        </div>
    );
};

export default Review;