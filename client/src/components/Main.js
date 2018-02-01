import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Register from './Register';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/dashboard' component={Dashboard}></Route>
            <Route path='/register' component={Register}></Route>
        </Switch>
    </main>
)

export default Main