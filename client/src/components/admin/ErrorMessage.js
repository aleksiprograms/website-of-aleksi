import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
    color: #f00;
    font-size: 1.3rem;
`;

const ErrorMessage = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <Error>
            {message}
        </Error>
    );
}

export default ErrorMessage;