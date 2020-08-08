import React from 'react';
import '../App.css';

const Project = ({ title, text, githubUrl, imageUrl, imageOrientation }) => {
    const renderImage = () => {
        switch (imageOrientation) {
            case "landscape":
                return (
                    <img className="image imageLandscape" src={imageUrl} alt="new" />
                );
            case "portrait":
                return (
                    <img className="image imagePortrait" src={imageUrl} alt="new" />
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
                <a className="link" href={githubUrl} target="_blank">Github</a>
            </div>
            <div className="projectContent">
                {renderImage()}
                <p className="mainText">{text}</p>
            </div>
        </div>
    );
};

export default Project;