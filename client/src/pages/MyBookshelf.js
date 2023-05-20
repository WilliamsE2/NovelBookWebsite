import React, {useState} from 'react';
import { Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';

import listData from '../lists-data.json';

const MyBookshelf = () => {

    return (
        <div className='bookshelf-container'>
            <div className='bookshelf-column-left'>
                <p>Left</p>
            </div>
            <div className='bookshelf-column-right'>
                <p className='bookshelf-list-title'>List Title</p>
                <div className='bookshelf-list'>
                    {
                        listData.filter(book => {
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
            </div>
        </div>
    );
};

export default MyBookshelf;
