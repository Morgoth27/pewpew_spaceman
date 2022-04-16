import React from "react";


export default class App extends React.Component {
	render() {
		return (
			<>
                <div className="leaderboardBG"></div>

				<div className="topPanel">
                    <h1 className="leaderboardHeader">Leaderboards</h1>

				</div>


                <div className="leaderboardPanelHolder">
                    <div className="leaderPanel timeSurvivedPanel">
                        <h1 className="LBHeader">Time Survived</h1>

                        <div className="scoringSection timeScoreSection">

                        </div>

                    </div>

                    <div className="leaderPanel overallScorePanel">
                        <h1 className="LBHeader">Overall Score</h1>

                        <div className="scoringSection overallScoreSection">
                            
                        </div>

                    </div>

                    <div className="leaderPanel enemiesKilledPanel">
                        <h1 className="LBHeader">Enemies Killed</h1>

                        <div className="scoringSection enemiesScoreSection">
                            
                        </div>

                    </div>
                </div>



			</>
		);
	}
}
