import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProjects } from './redux/actions/projectActions';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const AppContainer = styled.div`
    margin-left: 25%;
    margin-right: 25%;
    flex: 1;

    @media (max-width: 1500px) {
        margin-left: 20%;
        margin-right: 20%;
    }
    @media (max-width: 1200px) {
        margin-left: 15%;
        margin-right: 15%;
    }
    @media (max-width: 900px) {
        margin-left: 10%;
        margin-right: 10%;
    }
    @media (max-width: 600px) {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <PageContainer>
                <Header />
                <AppContainer>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/projects" component={ProjectsPage} />
                    <Route path="/admin" component={AdminPage} />
                </AppContainer>
                <Footer />
            </PageContainer>
        </BrowserRouter>
    );
};

export default App;