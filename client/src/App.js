import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="appContainer">
                    <Route exact path="/" component={Home} />
                    <Route path="/projects" component={Projects} />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;