import React, {useState} from 'react';

import '../styles/SearchBar.css';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");

    const countries = [
        { name: "Belgium", continent: "Europe" },
        { name: "India", continent: "Asia" },
        { name: "Bolivia", continent: "South America" },
        { name: "Ghana", continent: "Africa" },
        { name: "Japan", continent: "Asia" },
        { name: "Canada", continent: "North America" },
        { name: "New Zealand", continent: "Australasia" },
        { name: "Italy", continent: "Europe" },
        { name: "South Africa", continent: "Africa" },
        { name: "China", continent: "Asia" },
        { name: "Paraguay", continent: "South America" },
        { name: "Usa", continent: "North America" },
        { name: "France", continent: "Europe" },
        { name: "Botswana", continent: "Africa" },
        { name: "Spain", continent: "Europe" },
        { name: "Senegal", continent: "Africa" },
        { name: "Brazil", continent: "South America" },
        { name: "Denmark", continent: "Europe" },
        { name: "Mexico", continent: "South America" },
        { name: "Australia", continent: "Australasia" },
        { name: "Tanzania", continent: "Africa" },
        { name: "Bangladesh", continent: "Asia" },
        { name: "Portugal", continent: "Europe" },
        { name: "Pakistan", continent: "Asia" }
    ];

    return (
        <div>
            <input className='search-box' placeholder='Enter Search' onChange={event => setSearchInput(event.target.value)} />
            <div className='search-results-div'>
                {
                    countries.filter(post => {
                        if (searchInput === '') {
                            return false;
                        } else if (post.name.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                            return post;
                        } else {
                            return false;
                        }
                    }).map((post, index) => (
                        <div className='search-result' key={index}>    
                            <p>{post.name}</p>
                            <p>{post.continent}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SearchBar;
