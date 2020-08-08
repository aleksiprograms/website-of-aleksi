import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="homeContainer">
            <div className="homeTextContainer">
                <h1 className="homeTitle">Hey, I am Aleksi</h1>
            </div>
            <div className="homeTextContainer">
                <p className="homeText">
                    I am mainly self-taught programmer/developer and
                    I am interested in mobiledev, webdev and gamedev.
                </p>
            </div>
            <Link
                className="button"
                to="/projects"
            >PROJECTS</Link>
            <img
                className="imageHome"
                src="https://dl.dropboxusercontent.com/s/q2mf0ugw4ohzrlm/battleagainstshapesart.png?dl=0"
            />
        </div>
    );
};

export default HomePage;