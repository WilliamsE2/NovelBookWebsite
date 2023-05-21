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
    const [openCreateList, changeOpenCreateList] = useState(false);
    const [openDeleteList, changeOpenDeleteList] = useState(false);

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
                {
                    openCreateList ? 
                        <div className='bookshelf-create-list'>
                            <input className='bookshelf-create-list-input' placeholder='List Name' />
                            <img className='bookshelf-create-list-image bookshelf-create-list-image-rotate' onClick={() => changeOpenCreateList(!openCreateList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                            <img className='bookshelf-create-list-image' onClick={() => changeOpenCreateList(!openCreateList)} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/>
                        </div> 
                    : 
                        <div className='bookshelf-create-list-button'>
                            <p className='bookshelf-create-list-text' onClick={() => changeOpenCreateList(!openCreateList)}>Create List</p>
                        </div>
                }
            </div>
            <div className='bookshelf-column-right'>
                <div className='bookshelf-column-right-top'>
                    <p className='bookshelf-list-title'>{currentList}</p>
                    {
                        openDeleteList ? 
                            <div className='bookshelf-delete-list'>
                                <p className='bookshelf-delete-list-text'>Delete this list?</p>
                                <img className='bookshelf-create-list-image bookshelf-create-list-image-rotate' onClick={() => changeOpenDeleteList(!openDeleteList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                <img className='bookshelf-create-list-image' onClick={() => changeOpenDeleteList(!openDeleteList)} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/>
                            </div> 
                        : 
                            <div className='bookshelf-delete-list-button' onClick={() => changeOpenDeleteList(!openDeleteList)}>
                                <img className='bookshelf-delete-list-image' src={require('../assets/delete-icon.png')} alt='Delete'/>
                            </div>
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
