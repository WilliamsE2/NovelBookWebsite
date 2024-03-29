import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

import '../styles/BookshelfCard.css';

const BookshelfCard = ({ bookCoverId, bookId, title, author, rating, isCommunity, addedDate, removeBookFunc }) => {

    return (
        <div className='bookshelf-card'>
            <div className='bookshelf-card-margin'>
                <Link to={`/layout/book/${bookId}`}>
                    <img className='bookshelf-cover-image' src={require(`../assets/book-covers/${bookCoverId}.jpeg`)} alt='Book Cover'/>
                </Link>
                <div className='bookshelf-card-info-details'>
                    <Link to={`/layout/book/${bookId}`} className="bookshelf-card-title-link">
                        <p className='bookshelf-card-title-text'>{title}</p>
                    </Link>
                    <p className='bookshelf-card-author-text'>{author}</p>
                </div>
                <div>
                    {
                        isCommunity ? 
                            <>
                            <div className='bookshelf-card-rating bookshelf-community-rating'>
                                <p className='bookshelf-card-rating-text'>Community Avg. Rating</p>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    defaultValue={0}
                                    precision={0.01}
                                    readOnly
                                />
                            </div>
                            </>
                        :
                            <>
                            <div className='bookshelf-card-rating'>
                                <p className='bookshelf-card-rating-text'>Your Rating</p>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    defaultValue={0}
                                    readOnly
                                />
                            </div>
                            <div className='bookshelf-card-extras'>
                                <div className='bookshelf-card-delete-button' onClick={() => removeBookFunc(bookId)}>
                                    <img className='bookshelf-card-delete-image' src={require('../assets/delete-icon.png')} alt='Delete'/>
                                </div>
                                <div className="bookshelf-card-add-date">
                                    <p className="bookshelf-card-add-date-text"></p>
                                </div>
                            </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default BookshelfCard;
