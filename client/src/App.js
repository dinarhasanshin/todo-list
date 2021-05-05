import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./hooks/routes.hook"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import './App.css'

function App() {
  const {userId, token, ready, login, logout} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready){
    return <p>Loading...</p>
  }

  return (
      <AuthContext.Provider value={{
        token, userId, isAuthenticated, login, logout
      }}>
        <Router>
          <>
            {routes}
          </>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
