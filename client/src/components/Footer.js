import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex-shrink: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    background-color: #111;
`;

const Text = styled.p`
    color: #fff;
    font-size: 0.8rem;
    align-self: center;
`;

const Footer = () => {
    return (
        <Container>
            <Text>
                Copyright &copy; 2020 Aleksi Tolvanen. All Rights Reserved
            </Text>
        </Container>
    );
};

export default Footer;