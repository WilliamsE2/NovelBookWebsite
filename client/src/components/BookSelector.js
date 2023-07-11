import { Link } from "react-router-dom";

import '../styles/BookSelector.css';

const BookSelector = ({ bookCoverId, bookId, title, author, coverImage}) => {

    return (
        <div className='book-selector'>
            <Link to={`/layout/book/${bookId}`} className="book-selector-link">
                <img className='book-selector-cover' src={require(`../assets/book-covers/${bookCoverId}.jpeg`)} alt='Book Cover'/>
            </Link>
            <Link to={`/layout/book/${bookId}`} className="book-selector-link">
                <p className='book-selector-title'>{title}</p>
            </Link>
            <p className='book-selector-author'>{author}</p>
        </div>
    );
}

export default BookSelector;
