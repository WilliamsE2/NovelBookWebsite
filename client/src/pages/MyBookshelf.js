import React, {useState} from 'react';
import { Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';

import listData from '../lists-data.json';
import { Link } from 'react-router-dom';

const MyBookshelf = () => {

    const [listTitle, changeListTitle] = useState('Read');

    const lists = [
        'Read',
        'My Reading List',
        'Favorites'
    ];

    const handleListChange = (value) => {
        changeListTitle(value);
    };

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
                <p className='bookshelf-list-title'>{listTitle}</p>
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
