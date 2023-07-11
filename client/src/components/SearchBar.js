import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import '../styles/SearchBar.css';

const SearchBar = () => {

    const [bookData, changeBookData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/all-books')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeBookData(JSON.parse(data));
        });
    }, []);

    const handleCollapse = () => {
        setSearchInput('');
    };

    return (
        <div className='search-div'>
            <input className='search-box' placeholder='Search books' onChange={event => setSearchInput(event.target.value)} />
            <div className='search-button'></div>
            <Link to="/layout/book" onClick={handleCollapse} className="search-results-link">
                <div className='search-results-box-outer'>
                    <div className='search-results-box-inner'>
                    {
                        bookData.filter(book => {
                            if (searchInput === '') {
                                return false;
                            } else if (book.book_title.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                                return book;
                            } else if (book.author_name.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                                return book;
                            } else {
                                return false;
                            }
                        }).map((book, index) => (
                            <Link to={`/layout/book/${book.book_id}`} key={index} className="search-result">
                                <p className='search-result-text search-result-title'>{book.book_title}</p>
                                <p className='search-result-text search-result-author'>by {book.author_name}</p>
                            </Link>
                        ))
                    }
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SearchBar;
