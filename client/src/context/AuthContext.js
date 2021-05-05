import {createContext} from "react";

const loop = () => {

}

export const AuthContext = createContext({
    userId: null,
    token: null,
    name: null,
    isAuthenticated: false,
    isCompleted: false,
    todos: [],
    login: loop,
    logout: loop
})
