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

    const [filtersOn, changeFiltersOn] = useState(false);

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

    let filters = [
        {
            'filter': 'Children\'s',
            'active': false
        },
        {
            'filter': 'Graphic Novel',
            'active': false
        },
        {
            'filter': 'Action & Adventure',
            'active': false
        },
        {
            'filter': 'Fantasy',
            'active': false
        },
        {
            'filter': 'Science Fiction',
            'active': false
        },
        {
            'filter': 'Horror',
            'active': false
        },
        {
            'filter': 'Mystery',
            'active': false
        },
        {
            'filter': 'Thriller & Suspense',
            'active': false
        },
        {
            'filter': 'Romance',
            'active': false
        },
        {
            'filter': 'Historical Fiction',
            'active': false
        },
        {
            'filter': 'Contemporary Fiction',
            'active': false
        },
        {
            'filter': 'Literary Fiction',
            'active': false
        },
        {
            'filter': 'Memoir/Autobiography',
            'active': false
        },
        {
            'filter': 'Biography',
            'active': false
        },
        {
            'filter': 'History',
            'active': false
        },
        {
            'filter': 'Politics',
            'active': false
        },
        {
            'filter': 'Economics',
            'active': false
        },
        {
            'filter': 'Humanities',
            'active': false
        },
        {
            'filter': 'Religion',
            'active': false
        },
        {
            'filter': 'Science',
            'active': false
        },
        {
            'filter': 'Self-help',
            'active': false
        },
        {
            'filter': 'True Crime',
            'active': false
        }
    ]

    const handleFilter = (filter) => {
        let noFilter = true;

        for (let i = 0; i < filters.length; i++) {
            if (filters[i].filter === filter) {
                filters[i].active = !filters[i].active;
                console.log(filters[i].active);
            }
            
            if (filters[i].active) {
                noFilter = false;
            }
        }

        console.log(filters);
        console.log(noFilter);

        /*if (noFilter && filtersOn) {
            changeFiltersOn(false);
        } else if (!noFilter && !filtersOn) {
            changeFiltersOn(true);
        }*/
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
                        filters.filter(filter => {
                            if (filter.active) {
                                return filter;
                            } else {
                                return false;
                            }
                        }).map((filter, index) => (
                            <div className='discover-filter-block'>
                                <img className='discover-filter-block-image' src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                <p className='discover-filter-block-text'>{filter.filter}</p>
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
                            if (!filtersOn) {
                                return book;
                            } else {
                                for (let i = 0; i < filters.length; i++) {
                                    if (book.genre === filters[i].filter && filters[i].active === true) {
                                        return book;
                                    }
                                }
                            }
                            return false;
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