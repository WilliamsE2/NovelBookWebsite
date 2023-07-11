import React, { useEffect, useState, useRef } from 'react';
import { Rating, Pagination, LinearProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import '../styles/Book.css';

// Components
import BookSelector from '../components/BookSelector.js';
import Review from '../components/Review.js';
import ReviewEdit from '../components/ReviewEdit.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const Book = () => {

    const userId = sessionStorage.getItem('userId');
    const bookId = useParams().id;
    const [genreId, changeGenreId] = useState(1);
    
    const [bookData, changeBookData] = useState([]);
    const [listData, changeListData] = useState([]);
    const [bookRecData, changeBookRecData] = useState([]);
    const [bookRatingData, changeBookRatingData] = useState([]);
    const [bookReviewData, changeBookReviewData] = useState([]);
    const [userBookReviewData, changeUserBookReviewData] = useState([]);

    const [openList, changeOpenList] = useState(false);
    const [createList, changeCreateList] = useState(false);
    const [newListName, changeNewListName] = useState('');

    const [starFilter, changeStarFilter] = useState(0);
    const [starFilterColor, changeStarFilterColor] = useState([
        {rating: 1, color: 'blue'},
        {rating: 2, color: 'blue'},
        {rating: 3, color: 'blue'},
        {rating: 4, color: 'blue'},
        {rating: 5, color: 'blue'},
    ]);
    const [ratingData, changeRatingData] = useState([]);

    const [userRating, changeUserRating] = useState(0);
    const [userReviewContent, changeUserReviewContent] = useState('');
    const [overallRating, changeOverallRating] = useState(0);
    const [numberOfReviews, changeNumberOfReviews] = useState(0);
    
    const [listTrigger, changeListTrigger] = useState(false);
    const [reviewTrigger, changeReviewTrigger] = useState(false);

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

    useEffect(() => {
        fetch('http://localhost:3001/book/ratings', {
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
            changeBookRatingData(jsonData);
            changeOverallRating(jsonData.overall_rating);
            changeNumberOfReviews(jsonData.number_of_reviews);

            changeRatingData([
                {numberOfReviews: jsonData.one_count, percentage: Math.floor((jsonData.one_count / jsonData.number_of_reviews) * 100)},
                {numberOfReviews: jsonData.two_count, percentage: Math.floor((jsonData.two_count / jsonData.number_of_reviews) * 100)},
                {numberOfReviews: jsonData.three_count, percentage: Math.floor((jsonData.three_count / jsonData.number_of_reviews) * 100)},
                {numberOfReviews: jsonData.four_count, percentage: Math.floor((jsonData.four_count / jsonData.number_of_reviews) * 100)},
                {numberOfReviews: jsonData.five_count, percentage: Math.floor((jsonData.five_count / jsonData.number_of_reviews) * 100)}
            ]);
        });
    }, [bookId, reviewTrigger]);

    useEffect(() => {
        fetch('http://localhost:3001/book/reviews', {
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
            changeBookReviewData(JSON.parse(data));
        });
    }, [bookId, reviewTrigger]);

    useEffect(() => {
        fetch('http://localhost:3001/book/user-review', {
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
            changeUserBookReviewData(JSON.parse(data));
            changeUserRating(JSON.parse(data)[0]?.rating);
        });
    }, [userId, bookId, reviewTrigger]);

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

    const postReview = () => {
        fetch('http://localhost:3001/book/reviews/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bookId, userId, userRating, userReviewContent, overallRating, numberOfReviews}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeReviewTrigger(!reviewTrigger);
        });
    };

    const deleteReview = () => {
        console.log(bookId);
        console.log(userId);
        console.log(userRating);
        console.log(overallRating);
        console.log(numberOfReviews);
        console.log(((overallRating * numberOfReviews) - userRating) / (numberOfReviews - 1));

        fetch('http://localhost:3001/book/reviews/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bookId, userId, userRating, overallRating, numberOfReviews}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeReviewTrigger(!reviewTrigger);
        });
    };

    const cancelNewList = () => {
        changeCreateList(!createList);
        changeNewListName('');
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
                                            <BookSelector bookId={rec.book_id} title={rec.book_title} author={rec.author_name} />
                                        ))
                                }
                            </div>
                        </div>
                        <div className='book-review'>
                            <div ref={scrollToMyReview} className='book-review-user'>
                                <p className='book-review-user-title'>My Review</p>
                                {
                                    userBookReviewData.length < 1 ? 
                                        <ReviewEdit
                                            rating={userRating} 
                                            ratingFunc={changeUserRating} 
                                            content={userReviewContent} 
                                            contentFunc={changeUserReviewContent} 
                                            postFunc={postReview} 
                                        /> 
                                    : 
                                        <Review 
                                            bookId={bookId}
                                            rating={userBookReviewData[0].rating} 
                                            content={userBookReviewData[0].review_description} 
                                            date={userBookReviewData[0].update_date} 
                                            showUser={false} 
                                            deletable={true} 
                                            deleteFunc={deleteReview}
                                        />
                                }
                            </div>
                            <div className='book-review-community'>
                                <p className='book-review-community-title'>Community Rating & Reviews</p>
                                <div className='book-review-community-rating'>
                                    {
                                        bookRatingData.length < 1 ? 
                                            <LoadingSpinner /> 
                                        : 
                                            <>
                                            <Rating
                                                className='book-review-community-rating-stars'
                                                name="read-only"
                                                value={bookRatingData.overall_rating}
                                                defaultValue={2.5}
                                                precision={0.1}
                                                size='large'
                                                readOnly
                                            />
                                            <p className='book-review-community-rating-text'>{bookRatingData.overall_rating}</p>
                                            <p className='book-review-community-review-amount-text'>{bookRatingData.number_of_reviews} reviews</p>
                                            </>
                                    }
                                </div>
                                <div className='book-review-rating-differences'>
                                    {
                                        ratingData.length < 1 ? 
                                            <LoadingSpinner /> 
                                        : 
                                            <>
                                            <div className='book-review-rating-differences-row'>
                                                <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(5)}>5 stars</p>
                                                <div style={{color: starFilterColor[4].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(5)} variant="determinate" value={ratingData[4].percentage} /></div>
                                                <p className='book-review-rating-differences-amount-text'>{ratingData[4].numberOfReviews}</p>
                                            </div>
                                            <div className='book-review-rating-differences-row'>
                                                <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(4)}>4 stars</p>
                                                <div style={{color: starFilterColor[3].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(4)} variant="determinate" value={ratingData[3].percentage} /></div>
                                                <p className='book-review-rating-differences-amount-text'>{ratingData[3].numberOfReviews}</p>
                                            </div>
                                            <div className='book-review-rating-differences-row'>
                                                <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(3)}>3 stars</p>
                                                <div style={{color: starFilterColor[2].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(3)} variant="determinate" value={ratingData[2].percentage} /></div>
                                                <p className='book-review-rating-differences-amount-text'>{ratingData[2].numberOfReviews}</p>
                                            </div>
                                            <div className='book-review-rating-differences-row'>
                                                <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(2)}>2 stars</p>
                                                <div style={{color: starFilterColor[1].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(2)} variant="determinate" value={ratingData[1].percentage} /></div>
                                                <p className='book-review-rating-differences-amount-text'>{ratingData[1].numberOfReviews}</p>
                                            </div>
                                            <div className='book-review-rating-differences-row'>
                                                <p className='book-review-rating-differences-stars-text' onClick={() => handleStarFilter(1)}>1 star</p>
                                                <div style={{color: starFilterColor[0].color, width: '90%'}}><LinearProgress className='book-review-rating-differences-bar' color='inherit' onClick={() => handleStarFilter(1)} variant="determinate" value={ratingData[0].percentage} /></div>
                                                <p className='book-review-rating-differences-amount-text'>{ratingData[0].numberOfReviews}</p>
                                            </div>
                                            </>
                                    }
                                </div>
                                <div className='book-review-list'>
                                    {
                                        bookReviewData.filter(review => {
                                            if (review.rating === starFilter || starFilter === 0) {
                                                return review;
                                            } else {
                                                return false;
                                            }
                                        }).map((review, index) => (
                                            <div className='book-review-list-element'>
                                                <Review 
                                                    name={review.first_name.concat(' ', review.last_name)} 
                                                    rating={review.rating} 
                                                    content={review.review_description} 
                                                    date={review.update_date} 
                                                    showUser={true} 
                                                    deletable={false}
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