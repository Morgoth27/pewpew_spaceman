import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


import ReactDOM from "react-dom";
import App from './App';
import PlayGame from './components/GameSetUp.jsx'
import Leaderboards from './components/Leaderboards.jsx'
import './css/reset.css';
import './css/bestiary.css';
import './css/leaderboards.css';
import './css/home.css';
import './css/login.css';
import './css/shop.css';
import './css/game.css';



// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache(),
// });


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




const client = new ApolloClient({
  //link: authLink.concat(httpLink),
  uri: '/graphql',
  cache: new InMemoryCache(),
});





client
.query(
{
  query: gql`
    query Users 
    {
      users 
      {
        username
        _id
        password
      }
    }
  `
})
.then(result => console.log(result));


ReactDOM.render(
  
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,



  document.getElementById('root')
  
);