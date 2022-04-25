import React from "react";

var rankInc = 0;

const players = [
    {
        _id: 12313123312123123,
        score: 131313300,
        username: 'H4cker'
    },
    {
        score: 2300,
        username: 'Player3'
    },
    {
        score: 200,
        username: 'Player2'
    },
    {
        score: 100,
        username: 'Player1'
    },
].map((anObjectMapped, index) => {
    rankInc++;
    return (
        <div className="scoreRow" key={`${anObjectMapped.username}_{anObjectMapped.score}`}>
            <div className="RANK scoreRowPiece">
                {rankInc + ":"}
            </div>
            <div className="NAME scoreRowPiece">
                {anObjectMapped.username}
            </div>
            <div className="MID scoreRowPiece">
                
            </div>
            <div className="SCORE scoreRowPiece">
                {anObjectMapped.score}
            </div>
        </div>
    );
})

const scoreSection = document.querySelector('.scoringSection');

// for (var i = 0)


export default class App extends React.Component {
	render() {
		return (
			<>
                <div className="leaderboardBG"></div>

				<div className="topPanel">
                    <h1 className="leaderboardHeader">Leaderboards</h1>

				</div>


                <div className="leaderboardPanelHolder">
                    {/* <div className="leaderPanel timeSurvivedPanel">
                        <h1 className="LBHeader">Time Survived</h1>

                        <div className="scoringSection timeScoreSection">

                        </div>

                    </div> */}

                    <div className="leaderPanel overallScorePanel">
                        <h1 className="LBHeader">Top Scores</h1>

                        <div className="scoringSection overallScoreSection">
                        {/* <div className="scoreRow">
                                <div className="RANK scoreRowPiece">
                                    1:
                                </div>
                                <div className="NAME scoreRowPiece">
                                    ldkajaaaaaaaa
                                </div>
                                <div className="MID scoreRowPiece">
                                   
                                </div>
                                <div className="SCORE scoreRowPiece">
                                    100000
                                </div>
                            </div> */}

                            {players}

                        </div>

                    </div>

                    {/* <div className="leaderPanel enemiesKilledPanel">
                        <h1 className="LBHeader">Enemies Killed</h1>

                        <div className="scoringSection enemiesScoreSection">
                            
                        </div>

                    </div> */}
                </div>



			</>
		);
	}
}
