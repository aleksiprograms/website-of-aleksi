import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
`;

const Title = styled.h3`
    color: #000;
    font-size: 1.3rem;
    margin-right: 0.6rem;
`;

const ListContainer = styled.div`
    margin-bottom: 0.3rem;
`;

const Link = styled.a`
    color: #f00;
    text-decoration: none;
    font-size: 1rem;
    &.hover {
        text-decoration: underline;
    }
`;

const Content = styled.div`
    overflow: auto;
`;

const Image = styled.img`
    float: left;
    margin-right: 0.8rem;
    margin-bottom: 0.8rem;
    border-radius: 0.8rem;
`;

const ImageLandscape = styled(Image)`
    width: 70%;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const ImagePortrait = styled(Image)`
    width: 30%;

    @media (max-width: 900px) {
        width: 45%;
    }
`;

const Text = styled.p`
    color: #000;
    font-size: 1rem;
`;

const Project = ({ title, text, platforms, technologies, githubUrl, imageUrl, imageOrientation }) => {
    const renderImage = () => {
        switch (imageOrientation) {
            case "landscape":
                return (
                    <ImageLandscape
                        src={imageUrl}
                        alt="Screenshot from project"
                    />
                );
            case "portrait":
                return (
                    <ImagePortrait
                        src={imageUrl}
                        alt="Screenshot from project"
                    />
                );
            case "none":
                return (null);
            default:
                return (null);
        }
    }

    return (
        <div>
            <TitleContainer>
                <Title>{title}</Title>
                <Link href={githubUrl} target="_blank">Github</Link>
            </TitleContainer>
            <ListContainer>
                <strong>Platforms: </strong>
                <em>{platforms}</em>
            </ListContainer>
            <ListContainer>
                <strong>Technologies: </strong>
                <em>{technologies}</em>
            </ListContainer>
            <Content>
                {renderImage()}
                <Text>{text}</Text>
            </Content>
        </div>
    );
};

export default Project;