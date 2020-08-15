import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="pageContainer">
                <Header />
                <div className="appContainer">
                    <Route exact path="/" component={HomePage} />
                    <Route path="/projects" component={ProjectsPage} />
                    <Route path="/admin" component={AdminPage} />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;