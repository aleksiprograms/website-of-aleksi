import React from 'react';
import '../../App.css';

const ProjectAdmin = ({ id, title }) => {
    return (
        <div>
            <h3>{title}</h3>
            <button>EDIT</button>
            <button>DELETE</button>
        </div>
    );
};

export default ProjectAdmin;