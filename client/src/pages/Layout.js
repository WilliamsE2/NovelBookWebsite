import { Outlet, Link } from "react-router-dom";

import '../styles/Layout.css';

// Components
import SearchBar from '../components/SearchBar.js';

const Layout = () => {

    return (
        <>
        <div className="layout-container">
            <nav className="nav-bar">
                <ul className="nav-menu-left">
                    <li className="nav-item">
                        <Link to="/layout" className="nav-link">
                            <div className="title-div">
                                <h1 className="title-text">novel.</h1>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item mybookshelf-nav-item">
                        <Link to="mybookshelf" className="nav-link">
                            <div className="nav-div">
                                <img className='book-icon' src={require('../assets/book-icon.png')} alt='Book Icon'/>
                                <p className="nav-text">My Bookshelf</p>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="discover" className="nav-link">
                            <div className="nav-div gap-fix">
                                <img className='compass-icon' src={require('../assets/compass-icon.png')} alt='Compass Icon'/>
                                <p className="nav-text">Discover</p>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="nav-menu-right">
                    <div className="searchbar-div">
                        <SearchBar />
                    </div>
                    <li className="nav-item">
                        <Link to='account' className="nav-link">
                            <div className="nav-div">
                                <img className='account-icon' src={require('../assets/profile-icon.png')} alt='Account Icon'/>
                                <p className="nav-text">Account</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

        <div className="current-page">
            <Outlet />
        </div>

        <div className="copyright">
            <p className="copyright-text">Copyright @EvanWilliams</p>
        </div>
        </>
    );
};

export default Layout;
