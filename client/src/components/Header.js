import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #111;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 25%;
    padding-right: 25%;
    
    @media (max-width: 1500px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media (max-width: 1200px) {
        padding-left: 15%;
        padding-right: 15%;
    }
    @media (max-width: 900px) {
        padding-left: 10%;
        padding-right: 10%;
    }
    @media (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const Title = styled(Link)`
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    text-decoration: none;
`;

const Header = () => {
    return (
        <Container>
            <Title to="/">Website of Aleksi</Title>
            <Navigation />
        </Container>
    );
};

export default Header;