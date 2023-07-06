import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';

import '../styles/MyBookshelf.css';

// Components
import BookshelfCard from '../components/BookshelfCard.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const MyBookshelf = () => {

    const userId = sessionStorage.getItem('userId');

    const [listData, changeListData] = useState([]);
    const [bookData, changeBookData] = useState([]);
    const [bookSlice, changeBookSlice] = useState([]);

    const pageItemCount = 10;
    const [pageCount, changePageCount] = useState(0);
    const [currentPage, changeCurrentPage] = useState(1);

    const [currentList, changeCurrentList] = useState(0);
    const [openCreateList, changeOpenCreateList] = useState(false);
    const [openDeleteList, changeOpenDeleteList] = useState(false);
    const [newListName, changeNewListName] = useState('');

    const [updateTrigger, changeUpdateTrigger] = useState(false);

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
            const jsonData = JSON.parse(data);
            changeListData(jsonData);

            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].list_name === 'Read' && jsonData[i].deletable === false) {
                    changeCurrentList(i);
                    changeBookData(jsonData[i].book_list);
                    
                    changePageCount(Math.ceil(jsonData[i].book_list.length / pageItemCount));
                    changeCurrentPage(1);
                    changeBookSlice(jsonData[i].book_list.slice(0, pageItemCount));

                    console.log(jsonData);
                }
            }
        });
    }, [userId, updateTrigger]);

    const createList = () => {
        changeOpenCreateList(!openCreateList)

        fetch('http://localhost:3001/lists/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, newListName}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeUpdateTrigger(!updateTrigger);
        });
    };

    const handlePageChange = (i) => {
        changeCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        changeBookSlice(bookData.slice(startItem - 1, (pageItemCount * i)));
    };

    const handleListChange = (num) => {
        changeCurrentList(num);

        const list = listData[num];
        changeBookData(list.book_list);
        changePageCount(Math.ceil(list.book_list.length / pageItemCount));
        changeCurrentPage(1);
        changeBookSlice(list.book_list.slice(0, pageItemCount));
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
                                <p className='bookshelf-my-lists-list-text' onClick={() => handleListChange(list.row_number - 1, list.list_name)}>{list.list_name}</p>
                            ))
                    }
                </div>
                {
                    openCreateList ? 
                        <div className='bookshelf-create-list'>
                            <input className='bookshelf-create-list-input' placeholder='List Name' value={newListName} onChange={(e) => changeNewListName(e.target.value)} />
                            <img className='bookshelf-create-list-image bookshelf-create-list-image-rotate' onClick={() => changeOpenCreateList(!openCreateList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                            <img className='bookshelf-create-list-image' onClick={() => createList()} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/>
                        </div> 
                    : 
                        <div className='bookshelf-create-list-button'>
                            <p className='bookshelf-create-list-text' onClick={() => changeOpenCreateList(!openCreateList)}>Create List</p>
                        </div>
                }
            </div>
            <div className='bookshelf-column-right'>
                {
                    listData.length < 1 ? 
                            <LoadingSpinner /> 
                        : 
                            <div className='bookshelf-column-right-top'>
                                <p className='bookshelf-list-title'>{listData[currentList].list_name}</p>
                                {
                                    listData[currentList].deletable ? 
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
                                    : ''
                                }
                            </div>
                }
                {
                    bookSlice.length < 1 ? 
                            <LoadingSpinner /> 
                        : 
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
                            {
                                bookData[0].book_id < 0 ? 
                                    <p className='bookshelf-empty-text'>List is empty.</p>
                                :
                                    <>
                                    <div className='bookshelf-list'>
                                        {
                                            bookSlice.filter(book => {
                                                if (book.book_id < 0) {
                                                    return '';
                                                } else {
                                                    return book;
                                                }
                                            }).map((book, index) => (
                                                <BookshelfCard 
                                                    bookId={book.book_id}
                                                    title={book.book_title}
                                                    author={book.author_name}
                                                    rating={0}
                                                    isCommunity={false}
                                                    addedDate={'Dummy Date'}
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
                            </>
                }
            </div>
        </div>
    );
};

export default MyBookshelf;
