import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import LogIn from './LogIn'
import SignUp from './SignUp'

module.exports = (
    <Route path="/" component={App}>
        <Route path="/login" component={LogIn}/>
        <Route path="/signup" component={SignUp}/>
    </Route>
)
