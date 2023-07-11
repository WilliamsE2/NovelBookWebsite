import { Rating } from '@mui/material';

import '../styles/ReviewEdit.css';

const ReviewEdit = ({rating, ratingFunc, content, contentFunc, postFunc}) => {

    return (
        <div className="review">
            <div className="review-left">
                <div>
                    <img className='review-book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                </div>
            </div>
            <div className="review-right">
                <div className="review-right-top">
                    <Rating
                        className='review-star-rating'
                        name="read-only"
                        value={rating}
                        onChange={(event, newRating) => {
                            ratingFunc(newRating);
                        }}
                    />
                </div>
                <div className="review-content">
                    <textarea
                        className='review-content-input'
                        value={content}
                        onChange={(e) => contentFunc(e.target.value)}
                        rows={6}
                    />
                </div>
                <div>
                    <div className='review-content-post-button' onClick={postFunc}>Post</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewEdit;