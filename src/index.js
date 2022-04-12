import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login.jsx";
import playGame from "./phaser/scene";

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
  <Login />,
  document.getElementById("root") || document.createElement("div")
);
