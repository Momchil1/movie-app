import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Logo from './Logo';
import Options from './Options';
import Movies from './Movies';
import Details from './Details';
import Reviews from './Reviews';
import Login from "./Login";

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div className="row mb-2 bg-dark p-2">
                    <div className="col-2">
                        <Logo/>
                    </div>
                    <div className="col-10">
                        <Options/>
                    </div>
                </div>
                <div className="row">
                    <Switch>
                        <Route path='/' exact component={Movies}/>
                        <Route path='/details/:id' component={Details}/>
                        {/*reviews for the given movie id*/}
                        <Route path='/reviews/:id' component={Reviews}/>
                        <Route exact path="/auth/login" component={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
