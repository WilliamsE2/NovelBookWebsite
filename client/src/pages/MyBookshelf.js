import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

import testData from '../lists-data.json';

const MyBookshelf = () => {

    const userId = sessionStorage.getItem('userId');

    const [listData, changeListData] = useState([]);
    const [bookData, changeBookData] = useState([]);

    const pageItemCount = 10;
    const [pageCount, changePageCount] = useState(0);
    const [currentPage, changeCurrentPage] = useState(1);

    const [currentList, changeCurrentList] = useState('Read');
    const [openCreateList, changeOpenCreateList] = useState(false);
    const [openDeleteList, changeOpenDeleteList] = useState(false);

    const [bookSlice, changeBookSlice] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:3001/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            console.log(data);
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            changeListData(jsonData);
            /*for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].list_name === 'Read') {
                    return getListBooks(jsonData, jsonData[i].row_number, jsonData[i].list_name);
                }
            }*/
        });
    }, [userId]);

    const getListBooks = (data, listNum, listName) => {
        const bookIds = JSON.stringify(data[listNum - 1].list);

        fetch('http://localhost:3001/lists/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, bookIds}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            changeBookData(jsonData);
            setPagination(jsonData.length);
            changeCurrentList(listName);
        });
    };

    const setPagination = (bookAmount) => {
        changePageCount(Math.ceil(bookAmount / pageItemCount));
        handlePageChange(1);
    };

    const handlePageChange = (i) => {
        changeCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        changeBookSlice(bookData.slice(startItem - 1, (pageItemCount * i)));
    };

    const handleListChange = (listNum, listName) => {
        const data = listData;
        //getListBooks(data, listNum, listName);
    };

    return (
        <div className='bookshelf-container'>
            <div className='bookshelf-column-left'>
                <div className='bookshelf-my-lists'>
                    <p className='bookshelf-my-lists-text'>My Bookshelves</p>
                </div>
                <div className='bookshelf-my-lists-list'>
                    {
                        listData.length < 1 ? 
                            <LoadingSpinner />
                        : 
                            listData.map((list) => (
                                <p className='bookshelf-my-lists-list-text' onClick={() => handleListChange(list.row_number, list.list_name)}>{list.list_name}</p>
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
                {
                    bookData.length < 1 ? '' : 
                        <>
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
                                        bookId={book.bookId}
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
                        </>
                }
            </div>
        </div>
    );
};

export default MyBookshelf;
