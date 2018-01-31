import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import Home from './Home';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/'></Route>
            <Route path='/dashboard'></Route>
            <Route path='/register'></Route>
        </Switch>
    </main>
)

export default Main