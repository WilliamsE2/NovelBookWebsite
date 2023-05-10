import React, {useState} from 'react';
import { Rating, Pagination, LinearProgress } from '@mui/material';

import '../styles/Book.css';

// Components
import BookSelector from '../components/BookSelector';

const Book = () => {

    const [openList, changeOpenList] = useState(false);
    const [inList, changeInList] = useState(false);
    const [createList, changeCreateList] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [newListInput, changeNewListInput] = useState("");
    const [userRating, changeUserRating] = useState(null);

    const bookRecs = [
        {
            'title': 'Harry Potter and the Deathly Hallows',
            'author': 'J.K. Rowling'
        },
        {
            'title': 'Harry Potter and the Deathly Hallows',
            'author': 'J.K. Rowling'
        },
        {
            'title': 'Harry Potter and the Deathly Hallows',
            'author': 'J.K. Rowling'
        },
        {
            'title': 'Harry Potter and the Deathly Hallows',
            'author': 'J.K. Rowling'
        }
    ] 

    let lists = [
        {
            'title': 'My Reading List',
            'added': inList
        },
        {
            'title': 'Read',
            'added': inList
        },
        {
            'title': 'Favorites',
            'added': inList
        },
        {
            'title': 'Dummy',
            'added': inList
        }
    ]

    let reviews = [
        {
            'id': 1,
            'name': 'Evan Williams',
            'rating': 4,
            'description': 'A book worth reading once a year.',
            'likes': 7,
            'creation_date': 'February 13, 2023',
            'update_date': 'March, 6, 2023'
        }
    ]

    return (
        <div className='book-container'>
            <div className='column-left'>
                <img className='book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                <div className='book-add-list'>
                    <div className='book-button' onClick={() => changeOpenList(!openList)}>
                        <p className='book-button-text'>Add to List</p>
                    </div>
                    <div className='book-list-results-box-outer'>
                        <div className='book-list-results-box-inner'>
                            {
                                lists.filter(list => {
                                    if (openList === false) {
                                        return false;
                                    } else {
                                        return list;
                                    }
                                }).map((list, index) => (
                                    <div className='book-list-result' key={index}>
                                        <p className='book-list-result-text'>{list.title}</p>
                                        {
                                            list.added ? <img className='checkmark-image' onClick={() => changeInList(!inList)} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/> : <img className='plus-image' onClick={() => changeInList(!inList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                        }
                                    </div>
                                ))
                            }
                            {
                                openList ?
                                        createList ?
                                            <div className='book-create-new-list-edit'>
                                                <input className='book-create-new-list-text book-create-new-list-input' placeholder='List Name' onChange={event => changeNewListInput(event.target.value)} />
                                                <img className='plus-image plus-image-rotate' onClick={() => changeCreateList(!createList)} src={require('../assets/plus-icon.png')} alt='Plus Sign'/>
                                                <img className='checkmark-image' onClick={() => changeCreateList(!createList)} src={require('../assets/checkmark-icon.png')} alt='Checkmark'/>
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
                <a className='book-button amazon-button' target='_blank' rel="noopener noreferrer" href='https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545139708'>
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
                    <p className='book-user-rating-write-review-button'>Write a Review</p>
                </div>
            </div>
            <div className='column-right'>
                <div className='book-top'>
                    <h1>Harry Potter and the Deathly Hallows</h1>
                    <p>J.K. Rowling</p>
                </div>
                <div className='book-bottom'>
                    <div className='book-info'>
                        <p>Published July 21, 2007</p>
                        <p>759 pages</p>
                        <p>Fantasy</p>
                    </div>
                    <div className='book-description'>
                        <p className='description'>Harry has been burdened with a dark, dangerous and seemingly impossible task: that of locating and destroying Voldemort's remaining Horcruxes. Never has Harry felt so alone, or faced a future so full of shadows. But Harry must somehow find within himself the strength to complete the task he has been given. He must leave the warmth, safety and companionship of The Burrow and follow without fear or hesitation the inexorable path laid out for him... In this final, seventh installment of the Harry Potter series, J.K. Rowling unveils in spectacular fashion the answers to the many questions that have been so eagerly awaited.</p>
                    </div>
                    <div className='book-recommend'>
                        <p className='book-recommend-text'>Books like this one...</p>
                        <div className='book-recommend-row'>
                            {
                                bookRecs.map(rec => (
                                    <BookSelector title={rec.title} author={rec.author} />
                                ))
                            }
                        </div>
                    </div>
                    <div className='book-review'>
                        <div className='book-review-user'>
                            <p className='book-review-user-title'>My Review</p>

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
                                    <p className='book-review-rating-differences-stars-text'>5 stars</p>
                                    <LinearProgress className='book-review-rating-differences-bar' variant="determinate" value={16} />
                                    <p className='book-review-rating-differences-amount-text'>4</p>
                                </div>
                                <div className='book-review-rating-differences-row'>
                                    <p className='book-review-rating-differences-stars-text'>4 stars</p>
                                    <LinearProgress className='book-review-rating-differences-bar' variant="determinate" value={38} />
                                    <p className='book-review-rating-differences-amount-text'>9</p>
                                </div>
                                <div className='book-review-rating-differences-row'>
                                    <p className='book-review-rating-differences-stars-text'>3 stars</p>
                                    <LinearProgress className='book-review-rating-differences-bar' variant="determinate" value={25} />
                                    <p className='book-review-rating-differences-amount-text'>6</p>
                                </div>
                                <div className='book-review-rating-differences-row'>
                                    <p className='book-review-rating-differences-stars-text'>2 stars</p>
                                    <LinearProgress className='book-review-rating-differences-bar' variant="determinate" value={13} />
                                    <p className='book-review-rating-differences-amount-text'>3</p>
                                </div>
                                <div className='book-review-rating-differences-row'>
                                    <p className='book-review-rating-differences-stars-text'>1 star</p>
                                    <LinearProgress className='book-review-rating-differences-bar' variant="determinate" value={8} />
                                    <p className='book-review-rating-differences-amount-text'>2</p>
                                </div>
                            </div>
                            <p>List of review component</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;