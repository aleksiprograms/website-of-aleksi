import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    flex-direction: row;

    @media (max-width: 600px) {
        margin-top: 0.6rem;
    }
`;

const Link = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    &.hover {
        text-decoration: underline;
    }
    &.active {
        color: #f00;
    }
`;

const LinkML = styled(Link)`
    margin-left: 3rem;
`;

const Navigation = () => {
    return (
        <Container>
            <Link exact to="/">Home</Link>
            <LinkML to="/projects">Projects</LinkML>
        </Container>
    );
};

export default Navigation;