import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {SignUpPage} from '../components/AuthPage/SignUpPage/SignUpPage'
import {SignInPage} from '../components/AuthPage/SignInPage/SignInPage'
import {TodoPage} from "../components/TodoPage/TodoPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/todos" exact>
                    <TodoPage />
                </Route>
                <Redirect to="/todos"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/signUp" exact>
                <SignUpPage />
            </Route>
            <Route path="/signIn" exact>
                <SignInPage />
            </Route>
            <Redirect to="/signUp" />
        </Switch>
    )
}