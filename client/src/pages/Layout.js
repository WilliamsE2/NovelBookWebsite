import { Outlet, Link } from "react-router-dom";

import '../styles/Layout.css';

const Layout = () => {
    return (
        <>
            <div className="layout-container">
                <nav className="nav-bar">
                    <ul className="nav-menu-left">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <div className="title-div">
                                    <h1 className="title-text">novel.</h1>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item mybookshelf-nav-item">
                            <Link to="/mybookshelf" className="nav-link">
                                <div className="nav-div">
                                    <p className="nav-text">MyBookShelf</p>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/discover" className="nav-link">
                                <div className="nav-div">
                                    <p className="nav-text">Discover</p>
                                </div>
                            </Link>
                        </li>
                    </ul>

                    <ul className="nav-menu-right">
                        <li className="nav-item">
                            <Link to="/account" className="nav-link">
                                <div className="nav-div">
                                    <p className="nav-text">Account</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Outlet />

            <div>
                <p>Copyright @EvanWilliams</p>
            </div>
        </>
    );
};

export default Layout;
