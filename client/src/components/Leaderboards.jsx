import React from "react";
import { useQuery } from '@apollo/client';

import { LEADERBOARD_QUERY } from "../utils/queries";




const leaderboardPage = () => {


    console.log(document.referrer)
    // window.onload = () => {
    //     window.location.reload();
    // }
    
    
    const {loading, data}  = useQuery(LEADERBOARD_QUERY);
    
    var rankInc = 0;

    // try {
    //     console.log(data)
    // } catch(err) {
    //     console.error(err)
    //     alert("Can't load leaderboard scores. :(")
    // }

    // console.log(leaderboard())
if (!loading) {
    var players = data.leaderboard.map((anObjectMapped, index) => {
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
    console.log(players)
} else {
    console.log('loading');
}

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
export default leaderboardPage;
