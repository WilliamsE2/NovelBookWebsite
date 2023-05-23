import '../styles/Home.css';

// Components
import BookSelector from '../components/BookSelector.js';

const Home = () => {

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
    ];

    return (
        <div className='home-container'>
            <div className='home-section'>
                <p className='home-section-title'>2023 Reading Challenge</p>
                <div className='home-section-banner'>
                    <img className='home-section-banner-image' src={require('../assets/frodo-banner.jpeg')} alt='Reading Banner'/>
                </div>
                <div className='home-section-recs'>
                    {
                        bookRecs.map(rec => (
                            <BookSelector title={rec.title} author={rec.author} />
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
                        bookRecs.map(rec => (
                            <BookSelector title={rec.title} author={rec.author} />
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
                        bookRecs.map(rec => (
                            <BookSelector title={rec.title} author={rec.author} />
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
                        bookRecs.map(rec => (
                            <BookSelector title={rec.title} author={rec.author} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
