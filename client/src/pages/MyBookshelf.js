import React, {useState} from 'react';
import { Rating, Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

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
                            <div className='bookshelf-card'>
                                <div className='bookshelf-card-margin'>
                                    <img className='bookshelf-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                                    <div className='bookshelf-card-info-details'>
                                        <p className='bookshelf-card-title-text'>{book.title}</p>
                                        <p className='bookshelf-card-author-text'>{book.author}</p>
                                    </div>
                                    <div className='bookshelf-card-rating'>
                                        <p>Community Rating: {book.community_rating}</p>
                                        <p className='bookshelf-card-rating-text'>Your Rating</p>
                                        <Rating
                                            name="simple-controlled"
                                            value={book.my_rating}
                                            defaultValue={0}
                                        />
                                    </div>
                                    <div className='bookshelf-card-extras'>
                                        <div className='bookshelf-card-delete-button'>
                                            <img className='bookshelf-card-delete-image' src={require('../assets/delete-icon.png')} alt='Delete'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MyBookshelf;
