import React, { useEffect, useState, useRef } from 'react';
import { Rating, Pagination, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import '../styles/Book.css';

// Components
import BookSelector from '../components/BookSelector.js';
import Review from '../components/Review.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

import reviewData from '../review-data.json';

const Book = () => {

    const userId = sessionStorage.getItem('userId');
    const bookId = useParams().id;
    const [genreId, changeGenreId] = useState(1);
    
    const [bookData, changeBookData] = useState([]);
    const [listData, changeListData] = useState([]);
    const [bookRecData, changeBookRecData] = useState([]);


    const [openList, changeOpenList] = useState(false);
    const [createList, changeCreateList] = useState(false);
    const [newListName, changeNewListName] = useState('');

    const [userRating, changeUserRating] = useState(null);
    const [starFilter, changeStarFilter] = useState(0);
    const [starFilterColor, changeStarFilterColor] = useState([
        {rating: 1, color: 'blue'},
        {rating: 2, color: 'blue'},
        {rating: 3, color: 'blue'},
        {rating: 4, color: 'blue'},
        {rating: 5, color: 'blue'},
    ]);

    const [listTrigger, changeListTrigger] = useState(false);

    const scrollToMyReview = useRef(null);

    let userReview = {
        'name': 'Mia Joy',
        'rating': 0,
        'content': '',
        'date': 'May 11, 2023'
    }

    useEffect(() => {
        fetch('http://localhost:3001/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bookId}),
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
            changeBookData(jsonData);
            changeGenreId(jsonData.genre_id);
        });
    }, [bookId]);

    useEffect(() => {
        fetch('http://localhost:3001/book/lists-dropdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, bookId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeListData(JSON.parse(data));
        });
    }, [userId, bookId, listTrigger]);

    useEffect(() => {
        fetch('http://localhost:3001/book/recommended', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bookId, genreId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeBookRecData(JSON.parse(data));
        });
    }, [bookId, genreId]);

    const addBookToList = (listId) => {
        fetch('http://localhost:3001/lists/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, listId, bookId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeListTrigger(!listTrigger);
        });
    };

    const removeBookFromList = (listId) => {
        fetch('http://localhost:3001/lists/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, listId, bookId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeListTrigger(!listTrigger);
        });
    };

    const createListWithBook = () => {
        changeCreateList(!createList);

        fetch('http://localhost:3001/lists/create/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, newListName, bookId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeNewListName('');
            changeListTrigger(!listTrigger);
        });
    };

    const cancelNewList = () => {
        changeCreateList(!createList);
        changeNewListName('');
    };

    const handleChildRating = (value) => {
        changeUserRating(value);
    };

    const handleScrollToReview = () => {
        scrollToMyReview.current?.scrollIntoView({behavior: 'smooth'});
    };

    const handleStarFilter = (rating) => {
        if (rating === starFilter) {
            changeStarFilter(0);
        } else {
            changeStarFilter(rating);
        }

        const nextStarFilterColors = starFilterColor.map(filter => {
            if (filter.rating === rating && filter.color.includes('blue')) {
                return {
                    ...filter,
                    color: 'orange'
                };
            } else if (filter.rating === rating && filter.color.includes('orange')) {
                return {
                    ...filter,
                    color: 'blue'
                };
            } else if (filter.rating !== rating && filter.color.includes('orange')) {
                return {
                    ...filter,
                    color: 'blue'
                };
            } else {
                return filter;
            }
        });
        changeStarFilterColor(nextStarFilterColors);
    };

    return (
        <div className='book-container'>
            {
                bookData.length < 1 ? 
                    <LoadingSpinner />
                :
                <>
                <div className='book-column-left'>
                    <img className='book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                    <div className='book-add-list'>
                        <div className='book-button' onClick={() => changeOpenList(!openList)}>
                            <p className='book-button-text'>Add to List</p>
                        </div>
                        <div className='book-list-results-box-outer'>
                            <div className='book-list-results-box-inner'>
                                {
                                    listData.filter(list => {
                                        if (openList === false) {
                                            return false;
                                        } else {
                                            return list;
                                        }
                                    }).map((list, index) => (
                                        <div className='book-list-result' key={index}>
                                            <p className='book-list-result-text'>{list.list_name}</p>
                                            {
                                                list.in_list ? <img className='checkmark-image' onClick={() => removeBookFromList(list.list_id)} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/> : <img className='plus-image' onClick={() => addBookToList(list.list_id)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                            }
                                        </div>
                                    ))
                                }
                                {
                                    openList ?
                                            createList ?
                                                <div className='book-create-new-list-edit'>
                                                    <input className='book-create-new-list-text book-create-new-list-input' placeholder='List Name' value={newListName} onChange={(e) => changeNewListName(e.target.value)} />
                                                    <img className='plus-image plus-image-rotate' onClick={() => cancelNewList()} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                                    <img className='checkmark-image' onClick={() => createListWithBook()} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/>
                                                </div>
                                            :
                                                <div className='book-list-result book-create-new-list'>
                                                    <p className='book-list-result-text book-create-new-list-text'>Create a New List</p>
                                                    <img className='plus-image' onClick={() => changeCreateList(!createList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                                </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    <a className='book-button amazon-button' target='_blank' rel="noopener noreferrer" href={`${bookData.link}`}>
                        <img className='amazon-image' src={require('../assets/amazon-logo.png')} alt='Amazon Logo'/>
                    </a>
                    <div className='book-user-rating-button'>
                        <Rating
                            className='book-user-rating-stars'
                            name="simple-controlled"
                            value={userRating}
                            defaultValue={0}
                            size='large'
                            onChange={(event, newRating) => {
                                changeUserRating(newRating);
                            }}
                        />
                        <p className='book-user-rating-write-review-button' onClick={() => handleScrollToReview()}>Write a Review</p>
                    </div>
                </div>
                <div className='book-column-right'>
                    <div className='book-top'>
                        <h1>{bookData.book_title}</h1>
                        <p>{bookData.author_name}</p>
                    </div>
                    <div className='book-bottom'>
                        <div className='book-info'>
                            <p>Published {bookData.publishing_date_display}</p>
                            <p>{bookData.page_count} pages</p>
                            <p>{bookData.genre_title}</p>
                        </div>
                        <div className='book-description'>
                            <p className='description'>{bookData.description}</p>
                        </div>
                        <div className='book-recommend'>
                            <p className='book-recommend-text'>Books like this one...</p>
                            <div className='book-recommend-row'>
                                {
                                    bookRecData.length < 1 ? 
                                        <LoadingSpinner /> 
                                    : 
                                        bookRecData.map(rec => (
                                            <BookSelector title={rec.book_title} author={rec.author_name} />
                                        ))
                                }
                            </div>
                        </div>
                        <div className='book-review'>
                            <div ref={scrollToMyReview} className='book-review-user'>
                                <p className='book-review-user-title'>My Review</p>
                                <Review 
                                    name={userReview.name} 
                                    rating={userRating} 
                                    content={userReview.content} 
                                    date={userReview.date} 
                                    readOnly={false} 
                                    editable={true}
                                    handler={handleChildRating}
                                    showUser={false}
                                />
                            </div>
                            <div className='book-review-community'>
                                <p className='book-review-community-title'>Community Rating & Reviews</p>
                                <div className='book-review-community-rating'>
                                    <Rating
                                        className='book-review-community-rating-stars'
                                        name="read-only"
                                        value={3.64}
                                        defaultValue={2.5}
                                        precision={0.1}
                                        size='large'
                                        readOnly
                                    />
                                    <p className='book-review-community-rating-text'>3.64</p>
                                    <p className='book-review-community-rating-amount-text'>24 ratings</p>
                                    <p className='book-review-community-review-amount-text'>11 reviews</p>
                                </div>
                                <div className='book-review-rating-differences'>
                                    <div className='book-review-rating-differences-row'>
                                        <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(5)}>5 stars</p>
                                        <div style={{color: starFilterColor[4].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(5)} variant="determinate" value={16} /></div>
                                        <p className='book-review-rating-differences-amount-text'>4</p>
                                    </div>
                                    <div className='book-review-rating-differences-row'>
                                        <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(4)}>4 stars</p>
                                        <div style={{color: starFilterColor[3].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(4)} variant="determinate" value={34} /></div>
                                        <p className='book-review-rating-differences-amount-text'>9</p>
                                    </div>
                                    <div className='book-review-rating-differences-row'>
                                        <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(3)}>3 stars</p>
                                        <div style={{color: starFilterColor[2].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(3)} variant="determinate" value={22} /></div>
                                        <p className='book-review-rating-differences-amount-text'>6</p>
                                    </div>
                                    <div className='book-review-rating-differences-row'>
                                        <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(2)}>2 stars</p>
                                        <div style={{color: starFilterColor[1].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(2)} variant="determinate" value={12} /></div>
                                        <p className='book-review-rating-differences-amount-text'>3</p>
                                    </div>
                                    <div className='book-review-rating-differences-row'>
                                        <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(1)}>1 star</p>
                                        <div style={{color: starFilterColor[0].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(1)} variant="determinate" value={8} /></div>
                                        <p className='book-review-rating-differences-amount-text'>2</p>
                                    </div>
                                </div>
                                <div className='book-review-list'>
                                    {
                                        reviewData.filter(review => {
                                            if (review.rating === starFilter || starFilter === 0) {
                                                return review;
                                            } else {
                                                return false;
                                            }
                                        }).map((review, index) => (
                                            <div className='book-review-list-element'>
                                                <Review 
                                                    name={review.name} 
                                                    rating={review.rating} 
                                                    content={review.content} 
                                                    date={review.update_date} 
                                                    readOnly={true} 
                                                    editable={false} 
                                                    showUser={true}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    );
};

export default Book;