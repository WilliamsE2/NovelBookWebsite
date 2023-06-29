import { useEffect, useState } from 'react';

import '../styles/Home.css';

// Components
import BookSelector from '../components/BookSelector.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const Home = () => {

    /*const bookRecs = [
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
    ];*/

    const [bookRecs, changeBookRecs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/home-books')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.text();
            }
        })
        .then(data => {
            changeBookRecs(JSON.parse(data));
        }); 
    }, []);

    return (
        <div className='home-container'>
            <div className='home-section'>
                <p className='home-section-title'>2023 Reading Challenge</p>
                <div className='home-section-banner'>
                    <img className='home-section-banner-image' src={require('../assets/frodo-banner.jpeg')} alt='Reading Banner'/>
                </div>
                <div className='home-section-recs'>
                    {
                        bookRecs.length < 1 ? 
                            <LoadingSpinner />
                        :
                            bookRecs.map(rec => (
                                <BookSelector bookId={rec.book_id} title={rec.book_title} author={rec.author_name} />
                            ))
                    }
                </div>
            </div>

            <div className='home-section'>
                <p className='home-section-title'>Popular</p>
                <div className='home-section-banner'>
                    <img className='home-section-banner-image' src={require('../assets/catcher-banner.jpeg')} alt='Reading Banner'/>
                </div>
                <div className='home-section-recs'>
                    {
                        bookRecs.length < 1 ? 
                            <LoadingSpinner />
                        :
                            bookRecs.map(rec => (
                                <BookSelector bookId={rec.book_id} title={rec.book_title} author={rec.author_name} />
                            ))
                    }
                </div>
            </div>

            <div className='home-section'>
                <p className='home-section-title'>Recommended</p>
                <div className='home-section-banner'>
                    <img className='home-section-banner-image' src={require('../assets/murakami-banner.png')} alt='Reading Banner'/>
                </div>
                <div className='home-section-recs'>
                    {
                        bookRecs.length < 1 ? 
                            <LoadingSpinner />
                        :
                            bookRecs.map(rec => (
                                <BookSelector bookId={rec.book_id} title={rec.book_title} author={rec.author_name} />
                            ))
                    }
                </div>
            </div>

            <div className='home-section'>
                <p className='home-section-title'>Can't go wrong with the classics...</p>
                <div className='home-section-banner'>
                    <img className='home-section-banner-image' src={require('../assets/gatsby-banner.jpeg')} alt='Reading Banner'/>
                </div>
                <div className='home-section-recs'>
                    {
                        bookRecs.length < 1 ? 
                            <LoadingSpinner />
                        :
                            bookRecs.map(rec => (
                                <BookSelector bookId={rec.book_id} title={rec.book_title} author={rec.author_name} />
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
