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
                <p>List Title</p>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Community Rating</th>
                            <th>My Rating</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listData.filter(book => {
                                return book;
                            }).map((book, index) => (
                                <tr key={index}>
                                    <td></td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.community_rating}</td>
                                    <td>{book.my_rating}</td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookshelf;
