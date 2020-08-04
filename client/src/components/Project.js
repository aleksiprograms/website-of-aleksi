import React from 'react';
import '../App.css';

const Project = ({ title, text, link, imageLink, imageOrientation }) => {
    const renderImage = () => {
        console.log("imageOrientation = " + imageOrientation);
        switch (imageOrientation) {
            case "landscape":
                return (
                    <img className="image imageLandscape" src={imageLink} alt="new" />
                );
            case "portrait":
                return (
                    <img className="image imagePortrait" src={imageLink} alt="new" />
                );
            case "none":
                return (null);
            default:
                return (null);
        }
    }

    return (
        <div>
            <div className="projectTop">
                <h3 className="projectTitle">{title}</h3>
                <a className="link" href={link} target="_blank">Github</a>
            </div>
            <div className="projectContent">
                {renderImage()}
                <p className="mainText">{text}</p>
            </div>
        </div>
    );
};

export default Project;