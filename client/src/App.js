import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserProvider } from './context/UserContext';
import { ProjectProvider } from './context/ProjectContext';
import useUserApi from './hooks/useUserApi';
import useProjectApi from './hooks/useProjectApi';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import CreateView from './views/CreateView';

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

const Initializer = ({ children }) => {

    const userApi = useUserApi();
    const projectApi = useProjectApi();

    useEffect(() => {
        userApi.initIfSaved();
        projectApi.getProjects();
    }, []);

    return (
        <>
            {children}
        </>
    );
}

const App = () => {

    return (
        <BrowserRouter>
            <UserProvider>
                <ProjectProvider>
                    <Initializer>
                        <PageContainer>
                            <Header />
                            <AppContainer>
                                <Route exact path="/" component={HomeView} />
                                <Route path="/projects" component={ProjectsView} />
                                <Route path="/admin" component={AdminView} />
                                <Route path="/login" component={LoginView} />
                                <Route path="/create" component={CreateView} />
                            </AppContainer>
                            <Footer />
                        </PageContainer>
                    </Initializer>
                </ProjectProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;