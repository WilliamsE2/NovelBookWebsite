
import '../styles/Book.css';

// Components
import BookSelector from '../components/BookSelector';

const Book = () => {

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

    return (
        <div className='book-container'>
            <div className='column-left'>
                <img className='book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                <div className='book-add-list'>
                    <div className='test-div-1'>
                        <div className='book-button'>
                            <p>Add to Reading List</p>
                        </div>
                    </div>
                    <div className='test-div-2'>
                        <div className='down-arrow-button'>
                            <img className='down-arrow-image' src={require('../assets/down-arrow.png')} alt='Down Arrow'/>
                        </div>
                    </div>
                </div>
                <a className='book-button amazon-button' target='_blank' rel="noopener noreferrer" href='https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545139708'>
                    <img className='amazon-image' src={require('../assets/amazon-logo.png')} alt='Amazon Logo'/>
                </a>
                <div className='book-review-stars'>
                    <p>Write a Review</p>
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
                        <p>Overall rating</p>
                        <p>Your review at top if exists</p>
                        <p>Review component</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;