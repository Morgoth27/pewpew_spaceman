
import React, {useState} from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Bestiary from "./components/Bestiary.jsx";
import Leaderboards from "./components/Leaderboards.jsx";
import GameSetUp from "./components/GameSetUp.jsx";

import Authservice from './utils/auth';
import { useNavigate } from "react-router-dom";

console.log(Authservice.loggedIn())
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

/*
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
*/





function App() {


  // const navigate = useNavigate();

   return (
    
        
        <Router>
          {/* Wrap page elements in Router component to keep track of location state */}
          <div className="flex-column justify-flex-start min-100-vh">
            {/* <Header /> */}
            <div className="container">
              {/* Wrap Route elements in a Routes component */}
                <Routes>
                {/* Define routes using the Route component to render different page components at different paths */}
                {/* Define a default route that will render the Home component */}
              { Authservice.loggedIn() ? 
                <>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                {/* Define a route that will take in variable data */}
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/shop" 
                  element={<Shop />}
                />
                <Route 
                  path="/bestiary" 
                  element={<Bestiary />} 
                />
                <Route 
                  path="/leaderboards" 
                  element={<Leaderboards />} 
                />
                <Route 
                  path="/gamesetup" 
                  element={<GameSetUp />} 
                />
                </>:<> {console.log(window.location)} {window.location.pathname === '/login' ? console.log('login') : window.location.assign('/login')} <Route path="/login" element={<Login />}/></>
              }
                </Routes>
                
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      
    );

}

   export default App;