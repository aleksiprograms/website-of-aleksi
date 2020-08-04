import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="appContainer">
                    <Route exact path="/" component={HomePage} />
                    <Route path="/projects" component={ProjectsPage} />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;