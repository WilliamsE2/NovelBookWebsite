import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/BookshelfCard.css';

const BookshelfCard = ({title, author, communityRating, userRating, addedDate}) => {

    return (
        <div className='bookshelf-card'>
            <div className='bookshelf-card-margin'>
                <img className='bookshelf-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                <div className='bookshelf-card-info-details'>
                    <p className='bookshelf-card-title-text'>{title}</p>
                    <p className='bookshelf-card-author-text'>{author}</p>
                </div>
                <div className='bookshelf-card-rating'>
                    <p>Community Rating: {communityRating}</p>
                    <p className='bookshelf-card-rating-text'>Your Rating</p>
                    <Rating
                        name="list-book-rating"
                        value={userRating}
                        defaultValue={0}
                        readOnly
                    />
                </div>
                <div className='bookshelf-card-extras'>
                    <div className='bookshelf-card-delete-button'>
                        <img className='bookshelf-card-delete-image' src={require('../assets/delete-icon.png')} alt='Delete'/>
                    </div>
                    <div>
                        <p>Added: {addedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookshelfCard;