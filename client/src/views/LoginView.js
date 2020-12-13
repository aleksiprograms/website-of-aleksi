import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import useUserApi from '../hooks/useUserApi';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    
    @media (max-width: 900px) {
        width: 60%;
    }
    @media (max-width: 600px) {
        width: 70%;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    color: #000;
    font-size: 1.5rem;
    align-self: center;
    margin-bottom: 0.3rem;
`;

const ErrorMessage = styled.p`
    color: #f00;
    font-size: 1.3rem;
    height: 1.3rem;
    align-items: flex-end;
    align-self: center;
`;

const FormRow = styled.div`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    margin-top: 0.3rem;
`;

const InputTitle = styled.p`
    color: #000;
    font-size: 1rem;
`;

const Input = styled.input`
    color: #000;
    font-size: 0.85rem;
    width: 100%;
`;

const Button = styled.button`
    color: #fff;
    background-color: #111;
    text-decoration: none;
    font-size: 1rem;
    border: 0.20rem solid #00f;
    border-radius: 0.5rem;
    width: 5.6rem;
    height: 2.3rem;
    margin-top: 1rem;
    align-self: center;

    &:hover {
        background-color: #00f;
    }
`;

const LoginView = () => {

    const userContext = useContext(UserContext);
    const userApi = useUserApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setUsername('');
        setPassword('');
        setErrorMessage(userContext.error);
    }, [userContext.error]);

    if (userContext.user != null) {
        return (
            <Redirect to="/admin" />
        );
    }

    const login = (event) => {
        event.preventDefault();
        userApi.login(username, password);
    }

    return (
        <Container>
            <Title>ADMIN LOGIN</Title>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Form onSubmit={login}>
                <FormRow>
                    <InputTitle>Username</InputTitle>
                    <Input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </FormRow>
                <FormRow>
                    <InputTitle>Password</InputTitle>
                    <Input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </FormRow>
                <Button type="submit">LOG IN</Button>
            </Form>
        </Container>
    );
};

export default LoginView;