import React from "react";
import { useMutation } from '@apollo/client';
//import { blob } from "stream/consumers";
import { ADD_USER, LOGIN } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
   
var clickableHoverSource = "../assets/clickable-hover.wav";
var clickableHover;

var clickableClickSource = "../assets/high-bloop.mp3";
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




    const CREATEPanel = document.querySelector('.createPanel');
const LOGINPanel = document.querySelector('.loginPanel');

const swapLOG = document.querySelector('.swapLogBTN');
const swapCREATE = document.querySelector('.swapCreateBTN');


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
  const renderLogin = ()  => {





    const navigate = useNavigate();
    const [login, loginData ] = useMutation(LOGIN);
    const [createUser, CreateUserData ] = useMutation(ADD_USER);

    
    const onNewUser = (e) => {
      e.preventDefault()

      const c_userNameEl = document.querySelector("#cUserName");
      const c_emailEl = document.querySelector("#cEmail");
      const c_passwordEl = document.querySelector("#cPassword");

      try {
        const DATA = createUser({ 
          variables:{
            username: c_userNameEl.value, 
            email: c_emailEl.value, 
            password:c_passwordEl.value
          }
        })
        DATA.then(({data}) => {
          console.log(data)
          Auth.login(data.addUser.token)
        })
      } catch(err) {
        console.error(err)
        alert("Invalid signup information.")
      }
    }

    const onLogin =  (e) => {
      e.preventDefault()

      const l_userNameEl = document.querySelector("#lUserName");
      const l_passwordEl = document.querySelector("#lPassword");


      const DATA = login({ 
        variables:{
          username: l_userNameEl.value, 
          password: l_passwordEl.value
        }
      })
      DATA.then(({data}) => {
          console.log( data );
          Auth.login(data.login.token)
        }
      )
      .catch((err) => {
        console.error(err)
        alert("Incorrect login information.")
      })
      
      
    }


    return (
      <>
        <div className="loginBG"></div>

        <div className="createPanel" data-visible="false">
          <h1 className="createHeader">Create Account</h1>

          <div className="formHolder">
            <form
              
              className="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label htmlFor="name" className="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  id="cUserName"
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
                  id="cEmail"
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
                  id="cPassword"
                  type="password"
                  className="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="signupBtn clickable" id="signupBtn" onClick={onNewUser}>
                Submit
              </button>
            </form>
          </div>

          <div className="swapLogin">
            <h1 className="alreadyHead">Already have an account?</h1>

            <div className="swapBTN swapLogBTN clickable">Sign In</div>
          </div>
        </div>

        <div className="loginPanel" data-visible="true">
          <h1 className="createHeader">Sign In</h1>

          <div className="formHolder">
            <form
              
              className="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label htmlFor="name" className="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  id="lUserName"
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
                  id="lPassword"
                  type="password"
                  className="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="loginBtn clickable" id="loginBtn" onClick={onLogin}>
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

  export default renderLogin;
//}
