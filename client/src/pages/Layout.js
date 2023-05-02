import { Outlet, Link } from "react-router-dom";

import '../styles/Layout.css';

const Layout = () => {
    return (
        <>
            <div className="nav-bar-container">
                <nav className="nav-bar">
                    <ul className="nav-menu">
                        <li className="nav-link"><Link className="nav-text" to="/">Home</Link></li>
                        <li className="nav-link"><Link className="nav-text" to="/mybookshelf">MyBookShelf</Link></li>
                        <li className="nav-link"><Link className="nav-text" to="/account">Account</Link></li>
                    </ul>
                </nav>
            </div>

            <Outlet />
        </>
    );
};

export default Layout;
