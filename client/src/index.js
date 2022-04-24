//import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Bestiary from "./components/Bestiary.jsx";
import Leaderboards from "./components/Leaderboards.jsx";
import GameSetUp from "./components/GameSetUp.jsx";
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

  <GameSetUp />,

  document.getElementById("root") || document.createElement("div")
);
