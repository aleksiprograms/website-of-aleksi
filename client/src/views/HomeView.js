import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin-top: 1.5rem;
`;

const TextContainer = styled.div`
    display: table;
    margin-bottom: 1rem;
`;

const Title = styled.h1`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 2rem;
`;

const Text = styled.p`
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-size: 1.3rem;
`;

const Image = styled.img`
    width: 80%;
    margin-bottom: 1rem;
    border-radius: 0.8rem;

    @media (max-width: 1500px) {
        width: 80%;
    }
    @media (max-width: 1200px) {
        width: 90%;
    }
    @media (max-width: 900px) {
        width: 95%;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const Button = styled(Link)`
    color: #fff;
    background-color: #111;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.7rem 1.4rem;
    border: 0.23rem solid #f00;
    border-radius: 0.8rem;
    margin-bottom: 1rem;

    &:hover {
        color: #000;
        border: 0.23rem solid #000;
        background-color: #f00;
    }
`;

const HomeView = () => {
    return (
        <Container>
            <TextContainer>
                <Title>Hey, I am Aleksi</Title>
            </TextContainer>
            <TextContainer>
                <Text>
                    I am mainly self-taught programmer/developer and
                    I am interested in mobiledev, webdev and gamedev.
                </Text>
            </TextContainer>
            <Button to="/projects">PROJECTS</Button>
            <Image
                src="https://dl.dropboxusercontent.com/s/q2mf0ugw4ohzrlm/battleagainstshapesart.png?dl=0"
                alt="Home page art"
            />
        </Container>
    );
};

export default HomeView;