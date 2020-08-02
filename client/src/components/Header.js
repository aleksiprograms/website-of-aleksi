import React from 'react';
import '../App.css';
import Navigation from './Navigation';

const Header = () => {
    return (
        <div className="headerContainer">
            <h1 className="headerTitle">Website of Aleksi</h1>
            <Navigation />
        </div>
    );
};

export default Header;