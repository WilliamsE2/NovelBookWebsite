import React, {useState} from 'react';

import '../styles/SearchBar.css';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    const countries = [
        { title: "Basic Economics", author: "Thomas Sowell" },
        { title: "You Can't Be Serious", author: "Kap Penn" },
        { title: "Divergent", author: "Veronica Roth" },
        { title: "1776", author: "David McCullough" },
        { title: "Atomic Habits", author: "James Clear" },
        { title: "Shoe Dog", author: "Phil Knight" },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
        { title: "Dune", author: "Frank Herbert" },
        { title: "American Psycho", author: "Bret Easton Ellis" },
        { title: "Casino Royale", author: "Ian Fleming" },
        { title: "Game of Thrones", author: "George R.R. Martin" },
        { title: "The Hobbit", author: "J.R.R. Tolkien" }
    ];

    return (
        <div className='search-div'>
            <input className='search-box' placeholder='Enter Search' onChange={event => setSearchInput(event.target.value)} />
            <div className='search-button'></div>
            <div className='search-results-div'>
                {
                    countries.filter(post => {
                        if (searchInput === '') {
                            return false;
                        } else if (post.title.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                            return post;
                        } else {
                            return false;
                        }
                    }).map((post, index) => (
                        <div className='search-result' key={index}>    
                            <p className='search-result-text'>{post.title}</p>
                            <p className='search-result-text'>{post.author}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchBar;
