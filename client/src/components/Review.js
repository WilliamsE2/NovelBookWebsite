import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/Review.css';

const Review = () => {

    return (
        <div className="review">
            <div className="review-left">
                <img className='review-user-image' src={require('../assets/profile-photo.png')} alt='Profile'/>
                <p className="review-username-text">evanw331</p>
            </div>
            <div className="review-right">
                <div className="review-right-top">
                    <Rating
                        className='review-star-rating'
                        name="read-only"
                        value={4}
                        defaultValue={0}
                        readOnly
                    />
                    <p className="review-date-text">February 10, 2023</p>
                </div>
                <div className="review-content">
                    <p className="review-content-description">This book does a great job of laying down the framework of how habits are formed, and shares insightful strategies for building good habits and breaking bad ones. Even though I was already familiar with research behind habit formation, reading through this book helped me approach habits I’m trying to adopt or break in my own life from different angles. But the book suffers from the same problems that seem to plague all self-help books. In the chapter about tracking habits, the author shares an anecdote about Benjamin Franklin’s habit of carrying a journal everywhere to track thirteen virtues. If you care to know more about that story, Franklin tried to make a habit of his thirteen virtues by turning it into a thirteen week course where he would work on a different virtue every week and track his progress. The author conveniently leaves out the fact that Franklin quickly found this method impractical and abandoned the project before getting through all thirteen virtues. There’s a lot of irony in including this anecdote in a chapter that talks about the importance of not “breaking the chain”. So while the author isn’t entirely wrong, I found it off-putting that he would retell this story in a manner that fit his narrative. This is a vice that is found all too commonly in self-help and pop science books that make you question the author’s intellectual rigour.</p>
                </div>
            </div>
        </div>
    );
};

export default Review;