import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navigation from './Navigation';

const Header = () => {
    return (
        <div className="headerContainer">
            <Link
                className="headerTitle"
                to="/"
            >Website of Aleksi</Link>
            <Navigation />
        </div>
    );
};

export default Header;