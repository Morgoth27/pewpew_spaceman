import React from "react";

import Game from "../components/Game.jsx"

import playGame from "../assets/scenes/temp"

export const config = {
  type: Phaser.AUTO,
  parent: "Game",
  width: window.innerWidth,
  height: window.innerHeight,
  scene: playGame
};

const game = new Phaser.Game(config);


export default class App extends React.Component {
	render() {
		return (
			<>
                
                <script src="../assets/engine/phaser.min.js"></script>

                <div id="Game"></div>

                

                <Game />

			</>
		);
	}
}