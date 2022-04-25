
import React, {useState} from "react";

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql
// } from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Bestiary from "./components/Bestiary.jsx";
import Leaderboards from "./components/Leaderboards.jsx";
import GameSetUp from "./components/GameSetUp.jsx";

// const client = new ApolloClient({
//     uri: 'https://48p1r2roz4.sse.codesandbox.io',
//     cache: new InMemoryCache(),
//   });

// const client = ...

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

function App() {

   return (
    <>
        {/* Wrap page elements in Router component to keep track of location state */}
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            {/* <Header /> */}
            <div className="container">
              {/* Wrap Route elements in a Routes component */}
              <Routes>
                {/* Define routes using the Route component to render different page components at different paths */}
                {/* Define a default route that will render the Home component */}
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
              </Routes>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </> 
    );

}

   export default App;