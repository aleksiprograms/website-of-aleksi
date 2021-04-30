import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import { UserProvider } from './context/UserContext';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import LoginView from './views/LoginView';
import AdminView from './views/AdminView';
import CreateProjectView from './views/CreateProjectView';
import TagsView from './views/TagsView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <UserProvider>
                <ThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <Header />
                        <Container maxWidth="md" className={classes.content}>
                            <Route exact path="/" component={HomeView} />
                            <Route path="/projects" component={ProjectsView} />
                            <Route path="/login" component={LoginView} />
                            <Route path="/admin" component={AdminView} />
                            <Route
                                path="/create-project/:id?"
                                component={CreateProjectView}
                            />
                            <Route path="/tags" component={TagsView} />
                        </Container>
                        <Footer />
                    </div>
                </ThemeProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
