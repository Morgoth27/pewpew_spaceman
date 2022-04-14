import React from "react";

export default class App extends React.Component {
	render() {
		return (
			<>

                <div className="shipArea">
                    <div className="SHIP"></div>

                    <div className="gameHeader">PewPew Spaceman</div>

                    <div className="holderHolder">
                        <div className="confirmationHolder">
                            <h1 className="confirmSignOut">Are you sure you want to sign out?</h1>

                            <h2 className="spacemanSad">Spaceman will miss you!</h2>

                            <div className="stay clickable">Stay</div>
                            <div className="signOutSad clickable">Sign Out</div>
                        </div>
                    </div>

                    <div className="playGame clickable">Play Game</div>
                </div>

				<div className="menuPanel" data-visble="true">
                    <ul className="menuBTNHolder">
                        <li className="menuBTN nav shop clickable">Shop</li>

                        <li className="menuBTN nav bestiary clickable">Bestiary</li>

                        <li className="menuBTN nav leaderboards clickable">Leaderboards</li>

                        <li className="menuBTN util options clickable">Options</li>

                        <li className="menuBTN util signOut clickable">Sign Out</li>
 
                    </ul>
				</div>



			</>
		);
	}
}