import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
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

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f00',
        },
        secondary: {
            main: '#90c',
        },
    },
});

const Initializer = ({ children }) => {
    const userApi = useUserApi();
    const projectApi = useProjectApi();

    useEffect(() => {
        userApi.initIfSaved();
        projectApi.getProjects();
    }, []);

    return <>{children}</>;
};

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <UserProvider>
                <ProjectProvider>
                    <ThemeProvider theme={theme}>
                        <Initializer>
                            <div className={classes.root}>
                                <CssBaseline />
                                <Header />
                                <Container
                                    maxWidth="md"
                                    className={classes.content}
                                >
                                    <Route
                                        exact
                                        path="/"
                                        component={HomeView}
                                    />
                                    <Route
                                        path="/projects"
                                        component={ProjectsView}
                                    />
                                    <Route
                                        path="/admin"
                                        component={AdminView}
                                    />
                                    <Route
                                        path="/login"
                                        component={LoginView}
                                    />
                                    <Route
                                        path="/create"
                                        component={CreateView}
                                    />
                                </Container>
                                <Footer />
                            </div>
                        </Initializer>
                    </ThemeProvider>
                </ProjectProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
