import React from "react";
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

ReactDOM.render(

    <Leaderboards />,

  document.getElementById('root')
);