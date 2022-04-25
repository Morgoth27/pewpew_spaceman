import React from "react";

const CREATEPanel = document.querySelector('.createPanel');
const LOGINPanel = document.querySelector('.loginPanel');

const swapLOG = document.querySelector('.swapLogBTN');
const swapCREATE = document.querySelector('.swapCreateBTN');

if (swapLOG) {
	swapLOG.addEventListener('click', () => {
    var createVIS = CREATEPanel.getAttribute('data-visible');
		if (createVIS === "true") {
			CREATEPanel.setAttribute('data-visible', false);
			LOGINPanel.setAttribute('data-visible', true);
		} else {
			CREATEPanel.setAttribute('data-visible', true);
			LOGINPanel.setAttribute('data-visible', false);
		}
	})
}

if (swapCREATE) {
	swapCREATE.addEventListener('click', () => {
		var loginVIS = LOGINPanel.getAttribute('data-visible');
		if (loginVIS === "true") {
			CREATEPanel.setAttribute('data-visible', true);
			LOGINPanel.setAttribute('data-visible', false);
		} else {
			CREATEPanel.setAttribute('data-visible', false);
			LOGINPanel.setAttribute('data-visible', true);
		}
	})
}


var clickableHoverSource = "../assets/sound-effects/clickable-hover.wav";
var clickableHover;

var clickableClickSource = "../assets/sound-effects/inventory-bloop.mp3";
var clickableClick;

const clickable = document.querySelectorAll('.clickable');

if (clickable) {
	for (var i=0; i<clickable.length; i++) {
		clickable[i].addEventListener('mouseover', () => {
			clickableHover = new Audio(clickableHoverSource);
			clickableHover.muted = false;
			clickableHover.volume = .80;
			clickableHover.play();
		})
	}
	for (var i=0; i<clickable.length; i++) {
		clickable[i].addEventListener('click', () => {
			clickableClick = new Audio(clickableClickSource);
			clickableClick.muted = false;
			clickableClick.volume = .80;
			clickableClick.play();
		})
	}
}


export default class App extends React.Component {
  render() {
    return (
      <>
        <div className="loginBG"></div>

        <div className="createPanel" data-visble="true">
          <h1 className="createHeader">Create Account</h1>

          <div className="formHolder">
            <form
              action="/api/users/register"
              method="post"
              className="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label htmlFor="name" className="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  type="text"
                  className="userName input clickable"
                  required
                ></input>
              </div>

              <div className="formSect emailSection">
                <label htmlFor="email" className="formHeader userEmailHeader">
                  Email:
                </label>
                <input
                  name="email"
                  type="text"
                  className="userEmail input clickable"
                  required
                ></input>
              </div>

              <div className="formSect passwordSection">
                <label htmlFor="password" className="formHeader userPasswordHeader">
                  Password:
                </label>
                <input
                  name="password"
                  type="password"
                  className="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="signupBtn clickable" id="signupBtn">
                Submit
              </button>
            </form>
          </div>

          <div className="swapLogin">
            <h1 className="alreadyHead">Already have an account?</h1>

            <div className="swapBTN swapLogBTN clickable">Sign In</div>
          </div>
        </div>

        <div className="loginPanel" data-visible="false">
          <h1 className="createHeader">Sign In</h1>

          <div className="formHolder">
            <form
              action="/api/users/login"
              method="post"
              className="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label htmlFor="name" className="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  type="text"
                  className="userName input clickable"
                  required
                ></input>
              </div>

              <div className="formSect passwordSection">
                <label htmlFor="password" className="formHeader userPasswordHeader">
                  Password:
                </label>
                <input
                  name="password"
                  type="password"
                  className="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="loginBtn clickable" id="loginBtn">
                Submit
              </button>
            </form>
          </div>

          <div className="swapLogin">
            <h1 className="alreadyHead">Don't have an account?</h1>

            <div className="swapBTN swapCreateBTN clickable">
              Create Account
            </div>
          </div>
        </div>
      </>
    );
  }
}
