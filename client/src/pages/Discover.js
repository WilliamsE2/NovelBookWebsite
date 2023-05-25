import React, {useEffect, useState} from 'react';
import { Pagination } from '@mui/material';

import '../styles/Discover.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';

import listData from '../lists-data.json';

const Discover = () => {
    const pageItemCount = 10;
    const [pageCount, changePageCount] = useState(0);
    const [currentPage, changeCurrentPage] = useState(1);

    const [bookSlice, changeBookSlice] = useState([{}]);

    const [activeFilters, changeActiveFilters] = useState([]);

    const fictionGenres = [
        'Children\'s',
        'Graphic Novel',
        'Action & Adventure',
        'Fantasy',
        'Science Fiction',
        'Horror',
        'Mystery',
        'Thriller & Suspense',
        'Romance',
        'Historical Fiction',
        'Contemporary Fiction',
        'Literary Fiction'
    ];

    const nonfictionGenres = [
        'Memoir/Autobiography',
        'Biography',
        'History',
        'Politics',
        'Economics',
        'Humanities',
        'Philosophy',
        'Religion',
        'Science',
        'Self-help',
        'True Crime'
    ]

    const removeFilter = (filter) => {
        const removeFilter = activeFilters.filter((item) => 
            item !== filter
        )
        changeActiveFilters(removeFilter);
    }

    const addFilter = (filter) => {
        const addFilter = activeFilters.concat(filter);
        changeActiveFilters(addFilter);
    }

    const handleFilter = (filter) => {
        let removed = false;

        for (let i = 0; i < activeFilters.length; i++) {
            if (activeFilters[i] === filter) {
                removeFilter(filter);
                removed = true;
            }
        }

        if (!removed) {
            addFilter(filter);
        }
    }

    const handlePageChange = (i) => {
        changeCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        changeBookSlice(listData.slice(startItem - 1, (pageItemCount * i)));
    };

    useEffect(() => {
        changePageCount(Math.ceil(listData.length / pageItemCount));
        handlePageChange(1);
    }, []);

    return (
        <div className='discover-container'>
            <div className='discover-column-left'>
                <div className='discover-filter'>
                    <p className='discover-filter-text'>Fiction</p>
                </div>
                <div className='discover-filter-options'>
                    {
                        fictionGenres.map((genre) => (
                            <p className='discover-filter-options-text' onClick={() => handleFilter(genre)}>{genre}</p>
                        ))
                    }
                </div>
                <div className='discover-filter'>
                    <p className='discover-filter-text'>Nonfiction</p>
                </div>
                <div className='discover-filter-options'>
                    {
                        nonfictionGenres.map((genre) => (
                            <p className='discover-filter-options-text' onClick={() => handleFilter(genre)}>{genre}</p>
                        ))
                    }
                </div>
                <div className='discover-filter-blocks-space'>
                    {
                        activeFilters.map((filter) => (
                            <div className='discover-filter-block'>
                                <img className='discover-filter-block-image' onClick={() => removeFilter(filter)} src={require('../assets/plus-icon.png')} alt='Delete'/>
                                <p className='discover-filter-block-text'>{filter}</p>
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
                <div className='discover-results'>
                    {
                        bookSlice.filter(book => {
                            if (activeFilters.length === 0) {
                                return book;
                            } else {
                                for (let i = 0; i < activeFilters.length; i++) {
                                    if (book.genre === activeFilters[i]) {
                                        return book;
                                    }
                                }
                                return false;
                            }
                        }).map((book, index) => (
                            <BookshelfCard 
                                title={book.title}
                                author={book.author}
                                rating={book.user_rating}
                                isCommunity={true}
                                addedDate={book.added_date}
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
            </div>
        </div>
    );
};

export default Discover;