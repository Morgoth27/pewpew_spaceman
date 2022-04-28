import React from "react";
import { Link } from "react-router-dom";



//   var clickableHoverSource = "../assets/clickable-hover.wav";
// var clickableHover;

// var clickableClickSource = "../assets/high-bloop.mp3";
// var clickableClick;

// const clickable = document.querySelectorAll('.clickable');

// if (clickable) {
// 	for (var i=0; i<clickable.length; i++) {
// 		clickable[i].addEventListener('mouseover', () => {
// 			clickableHover = new Audio(clickableHoverSource);
// 			clickableHover.muted = false;
// 			clickableHover.volume = .80;
// 			clickableHover.play();
// 		})
// 	}
// 	for (var i=0; i<clickable.length; i++) {
// 		clickable[i].addEventListener('click', () => {
// 			clickableClick = new Audio(clickableClickSource);
// 			clickableClick.muted = false;
// 			clickableClick.volume = .80;
// 			clickableClick.play();
// 		})
// 	}
// }











//   const signOutConfirm = document.querySelector(".holderHolder");

//   const stay = document.querySelector('.stay');
//   const signOutSad = document.querySelector('.signOutSad');
  
//   const signOut = document.querySelector('.signOut');
  

//     signOut.addEventListener('click', () => {
//       signOutConfirm.style.transform = "scale(1)";
//       signOutConfirm.style.marginRight = "0";
//     })
//     stay.addEventListener('click', () => {
//       signOutConfirm.style.transform = "scale(0)";
//       signOutConfirm.style.marginRight = "-200%";
//     })
//     signOutSad.addEventListener('click', () => {
//       console.log("signed out")
//     })


const homePage = () => {







 const signOut = () => {
  const signOutConfirm = document.querySelector(".holderHolder");

  const stay = document.querySelector('.stay');
  const signOutSad = document.querySelector('.signOutSad');
  
  const signOut = document.querySelector('.signOut');
  

    signOut.addEventListener('click', () => {
      signOutConfirm.style.transform = "scale(1)";
      signOutConfirm.style.marginRight = "0";
    })
    stay.addEventListener('click', () => {
      signOutConfirm.style.transform = "scale(0)";
      signOutConfirm.style.marginRight = "-200%";
    })
    signOutSad.addEventListener('click', () => {
      console.log("signed out")
    })
 }







    return (
      <>
        <div className="homeBG"></div>
        <div className="homePlanet"></div>

        <div className="shipArea">
          <div className="SHIP"></div>


        </div>

          <div className="holderHolder">
            <div className="confirmationHolder">
              <h1 className="confirmSignOut">
                Are you sure you want to sign out?
              </h1>

              <h2 className="spacemanSad">Spaceman will miss you!</h2>

              <div className="stay clickable" onClick={() => {const signOutConfirm = document.querySelector(".holderHolder");signOutConfirm.style.transform = "scale(0)";signOutConfirm.style.marginRight = "-200%";}}>Stay</div>
              <div className="signOutSad clickable" onClick={() => {localStorage.removeItem("id_token")}}><Link to={`/login`}>Sign Out</Link></div>
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

            <li className="menuBTN util signOut clickable" onClick={() => {  
              const signOutConfirm = document.querySelector(".holderHolder");
              signOutConfirm.style.transform = "scale(1)";
              signOutConfirm.style.marginRight = "0";
            }}>
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
  export default homePage;
