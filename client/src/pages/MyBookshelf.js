import React, {useEffect, useState} from 'react';
import { Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';

import listData from '../lists-data.json';

const MyBookshelf = () => {

    const pageItemCount = 10;
    const [pageCount, changePageCount] = useState(0);
    const [currentPage, changeCurrentPage] = useState(1);

    const [currentList, changeCurrentList] = useState('Read');
    const [bookSlice, changeBookSlice] = useState([{}]);

    const lists = [
        'Read',
        'My Reading List',
        'Favorites'
    ];

    const handlePageChange = (i) => {
        changeCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        changeBookSlice(listData.slice(startItem - 1, (pageItemCount * i)));
    };

    const handleListChange = (value) => {
        changeCurrentList(value);
        handlePageChange(1);
    };

    useEffect(() => {
        changePageCount(Math.ceil(listData.length / pageItemCount));
        handlePageChange(1);
    }, []);

    return (
        <div className='bookshelf-container'>
            <div className='bookshelf-column-left'>
                <div className='bookshelf-my-lists'>
                    <p className='bookshelf-my-lists-text'>My Bookshelves</p>
                </div>
                <div className='bookshelf-my-lists-list'>
                    {
                        lists.map((list) => (
                            <p className='bookshelf-my-lists-list-text' onClick={() => handleListChange(list)}>{list}</p>
                        ))
                    }
                </div>
            </div>
            <div className='bookshelf-column-right'>
                <p className='bookshelf-list-title'>{currentList}</p>
                <Pagination 
                    className='bookshelf-list-pagination' 
                    dir='ltr'
                    page={currentPage} 
                    count={pageCount} 
                    onChange={(event, value) => handlePageChange(value)} 
                    variant='outlined' 
                    shape='rounded' 
                    showFirstButton 
                    showLastButton 
                />
                <div className='bookshelf-list'>
                    {
                        bookSlice.filter(book => {
                            return book;
                        }).map((book, index) => (
                            <BookshelfCard 
                                title={book.title}
                                author={book.author}
                                rating={book.user_rating}
                                isCommunity={false}
                                addedDate={book.added_date}
                            />
                        ))
                    }
                </div>
                <Pagination 
                    className='bookshelf-list-pagination' 
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

export default MyBookshelf;
