import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink
                exact
                className="navigationLink"
                activeClassName="navigationLink navigationLinkActive"
                to="/"
            >Home</NavLink>
            <NavLink
                className="navigationLink navigationLinkMarginLeft"
                activeClassName="navigationLink navigationLinkActive"
                to="/projects"
            >Projects</NavLink>
        </div>
    );
};

export default Navigation;