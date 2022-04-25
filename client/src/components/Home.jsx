import React from "react";
import { Link } from "react-router-dom";






export default class App extends React.Component {
  render() {
    return (
      <>
        <div className="homeBG"></div>
        <div className="homePlanet"></div>

        <div className="shipArea">
          <div className="SHIP"></div>


          <div className="holderHolder">
            <div className="confirmationHolder">
              <h1 className="confirmSignOut">
                Are you sure you want to sign out?
              </h1>

              <h2 className="spacemanSad">Spaceman will miss you!</h2>

              <div className="stay clickable">Stay</div>
              <div className="signOutSad clickable">Sign Out</div>
            </div>
          </div>

        </div>

        <div className="menuPanel" data-visble="true">
          <div className="gameHeader">PewPew Spaceman</div>
          <ul className="menuBTNHolder">
            <li className="menuBTN nav shop clickable">
              <Link to={`/shop`}>Shop</Link>
            </li>

            <li className="menuBTN nav bestiary clickable">
              <Link to={`/bestiary`}>Bestiary</Link>
            </li>

            <li className="menuBTN nav leaderboards clickable">
              <Link to={`/leaderboards`}>Leaderboards</Link>
            </li>

            <li className="menuBTN util options clickable">
              Options
            </li>

            <li className="menuBTN util signOut clickable">
              Sign Out
            </li>
          </ul>
          <div className="playGame clickable">
            <Link to={`/gamesetup`}>Play Game</Link>
          </div>
        </div>
      </>
    );
  }
}
