import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import '../styles/Discover.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const Discover = () => {

    const [genres, changeGenres] = useState([]);
    const [bookData, changeBookData] = useState([]);
    const [bookSlice, changeBookSlice] = useState([]);

    const pageItemCount = 10;
    const [pageCount, changePageCount] = useState(0);
    const [currentPage, changeCurrentPage] = useState(1);

    const [activeFilters, changeActiveFilters] = useState([]);

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
            const jsonData = JSON.parse(data);
            changeBookData(jsonData);

            changePageCount(Math.ceil(jsonData.length / pageItemCount));
            changeCurrentPage(1);
            changeBookSlice(jsonData.slice(0, pageItemCount));
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/genres')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeGenres(JSON.parse(data));
        });
    }, []);

    const removeFilter = (filter) => {
        const removeFilter = activeFilters.filter((item) => 
            item.genre_id !== filter.genre_id
        );
        changeActiveFilters(removeFilter);
    };

    const addFilter = (filter) => {
        const addFilter = activeFilters.concat(filter);
        changeActiveFilters(addFilter);
    };

    const handleFilter = (filter) => {
        let removed = false;

        for (let i = 0; i < activeFilters.length; i++) {
            if (activeFilters[i].genre_id === filter.genre_id) {
                removeFilter(filter);
                removed = true;
            }
        }

        if (!removed) {
            addFilter(filter);
        }
    };

    const handlePageChange = (i) => {
        changeCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        changeBookSlice(bookData.slice(startItem - 1, (pageItemCount * i)));
    };

    return (
        <div className='discover-container'>
            <div className='discover-column-left'>
                <div className='discover-filter'>
                    <p className='discover-filter-text'>Fiction</p>
                </div>
                <div className='discover-filter-options'>
                    {
                        genres.filter(genre => {
                            if(genre.is_fiction) {
                                return genre;
                            } else {
                                return false;
                            }
                        }).map((genre) => (
                            <p className='discover-filter-options-text' onClick={() => handleFilter(genre)}>{genre.genre_title}</p>
                        ))
                    }
                </div>
                <div className='discover-filter'>
                    <p className='discover-filter-text'>Nonfiction</p>
                </div>
                <div className='discover-filter-options'>
                    {
                        genres.filter(genre => {
                            if(!genre.is_fiction) {
                                return genre;
                            } else {
                                return false;
                            }
                        }).map((genre) => (
                            <p className='discover-filter-options-text' onClick={() => handleFilter(genre)}>{genre.genre_title}</p>
                        ))
                    }
                </div>
                <div className='discover-filter-blocks-space'>
                    {
                        activeFilters.map((filter) => (
                            <div className='discover-filter-block'>
                                <img className='discover-filter-block-image' onClick={() => removeFilter(filter)} src={require('../assets/plus-icon.png')} alt='Delete'/>
                                <p className='discover-filter-block-text'>{filter.genre_title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='discover-column-right'>
                <p className='discover-title'>Discover</p>
                <Pagination 
                    className='discover-results-pagination' 
                    dir='ltr'
                    page={currentPage} 
                    count={pageCount} 
                    onChange={(event, value) => handlePageChange(value)} 
                    variant='outlined' 
                    shape='rounded' 
                    showFirstButton 
                    showLastButton 
                />
                {
                    bookSlice.length < 1 ? 
                            <LoadingSpinner /> 
                        : 
                            <>
                            <div className='discover-results'>
                                {
                                    bookSlice.filter(book => {
                                        if (activeFilters.length === 0) {
                                            return book;
                                        } else {
                                            for (let i = 0; i < activeFilters.length; i++) {
                                                if (book.genre_id === activeFilters[i].genre_id) {
                                                    return book;
                                                }
                                            }
                                            return false;
                                        }
                                    }).map((book, index) => (
                                        <BookshelfCard 
                                            title={book.book_title}
                                            author={book.author_name}
                                            rating={book.overall_rating}
                                            isCommunity={true}
                                        />
                                    ))
                                }
                            </div>
                            <Pagination 
                                className='discover-results-pagination' 
                                dir='ltr'
                                page={currentPage} 
                                count={pageCount} 
                                onChange={(event, value) => handlePageChange(value)} 
                                variant='outlined' 
                                shape='rounded' 
                                showFirstButton 
                                showLastButton 
                            />
                            </>
                }
            </div>
        </div>
    );
};

export default Discover;