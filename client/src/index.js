//import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './css/reset.css';
import './css/bestiary.css';
import './css/leaderboards.css';
import './css/home.css';
import './css/login.css';
import './css/shop.css';

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
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);