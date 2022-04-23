//import Phaser from "phaser";
import React, {useState} from "react";
import ReactDOM from "react-dom";

import Main from "./components/Main.jsx"


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Bestiary from "./components/Bestiary.jsx";
import Leaderboards from "./components/Leaderboards.jsx";
import GameSetUp from "./components/GameSetUp.jsx";



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

//import playGame from "./phaser/scene";

//console.log(App);

// export const config = {
//   type: Phaser.AUTO,
//   parent: "phaser",
//   width: window.innerWidth,
//   height: window.innerHeight,
//   // scene: playGame
// };

// const game = new Phaser.Game(config);


ReactDOM.render(

  
  <>
  
  <ApolloProvider client={client}>
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
    </ApolloProvider> 

  document.getElementById("root") || document.createElement("div")
  </>
);
