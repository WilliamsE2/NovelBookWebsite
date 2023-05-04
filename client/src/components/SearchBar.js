import React, {useState} from 'react';
import { Link } from "react-router-dom";

import '../styles/SearchBar.css';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    const handleCollapse = () => {
        setSearchInput('');
    };

    const countries = [
        { title: "Basic Economics", author: "Thomas Sowell" },
        { title: "You Can't Be Serious", author: "Kal Penn" },
        { title: "Divergent", author: "Veronica Roth" },
        { title: "1776", author: "David McCullough" },
        { title: "Atomic Habits", author: "James Clear" },
        { title: "Shoe Dog", author: "Phil Knight" },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
        { title: "Dune", author: "Frank Herbert" },
        { title: "American Psycho", author: "Bret Easton Ellis" },
        { title: "Casino Royale", author: "Ian Fleming" },
        { title: "Game of Thrones", author: "George R.R. Martin" },
        { title: "The Hobbit", author: "J.R.R. Tolkien" },
        { title: "This is an increidbly long title just trying to do a big long test ahhaahhah", author: "Author" }
    ];

    return (
        <div className='search-div'>
            <input className='search-box' placeholder='Search books' onChange={event => setSearchInput(event.target.value)} />
            <div className='search-button'></div>
            <Link to="/book" onClick={handleCollapse} className="search-results-link">
                <div className='search-results-box-outer'>
                    <div className='search-results-box-inner'>
                    {
                        countries.filter(post => {
                            if (searchInput === '') {
                                return false;
                            } else if (post.title.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                                return post;
                            } else if (post.author.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                                return post;
                            } else {
                                return false;
                            }
                        }).map((post, index) => (
                            <div className='search-result' key={index}>    
                                <p className='search-result-text search-result-title'>{post.title}</p>
                                <p className='search-result-text search-result-author'>by {post.author}</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SearchBar;
