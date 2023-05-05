
import '../styles/Book.css';

const Book = () => {
    return (
        <div className='book-container'>
            <div className='column-left'>
                <img className='book-cover-image' src={require('../assets/book-cover-test.jpeg')} alt='Book Cover'/>
                <div className='book-add-button'>
                    <p>Add to Reading List</p>
                </div>
                <div className='book-amazon-button'>
                    <p>Amazon link</p>
                </div>
                <div className='book-review-button'>
                    <p>Write a review button</p>
                </div>
            </div>
            <div className='column-right'>
                <div className='book-top'>
                    <h1>Harry Potter and the Deathly Hallows</h1>
                    <p>J.K. Rowling</p>
                </div>
                <div>
                    <div className='book-info'>
                        <p>Published July 21, 2007</p>
                        <p>759 pages</p>
                        <p>Fantasy</p>
                    </div>
                    <p>Rating</p>
                    <p className='description'>Harry has been burdened with a dark, dangerous and seemingly impossible task: that of locating and destroying Voldemort's remaining Horcruxes. Never has Harry felt so alone, or faced a future so full of shadows. But Harry must somehow find within himself the strength to complete the task he has been given. He must leave the warmth, safety and companionship of The Burrow and follow without fear or hesitation the inexorable path laid out for him... In this final, seventh installment of the Harry Potter series, J.K. Rowling unveils in spectacular fashion the answers to the many questions that have been so eagerly awaited.</p>
                    <div>
                        <p>Reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;