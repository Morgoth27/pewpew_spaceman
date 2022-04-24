import React from "react";

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
              class="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label for="name" class="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  type="text"
                  class="userName input clickable"
                  required
                ></input>
              </div>

              <div className="formSect emailSection">
                <label for="email" class="formHeader userEmailHeader">
                  Email:
                </label>
                <input
                  name="email"
                  type="text"
                  class="userEmail input clickable"
                  required
                ></input>
              </div>

              <div className="formSect passwordSection">
                <label for="password" class="formHeader userPasswordHeader">
                  Password:
                </label>
                <input
                  name="password"
                  type="password"
                  class="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="clickable" id="submitLogin">
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
              class="userEntryForm"
              data-visible="true"
            >
              <div className="formSect usernameSection">
                <label for="name" class="formHeader userNameHeader">
                  Username:
                </label>
                <input
                  name="name"
                  type="text"
                  class="userName input clickable"
                  required
                ></input>
              </div>

              <div className="formSect passwordSection">
                <label for="password" class="formHeader userPasswordHeader">
                  Password:
                </label>
                <input
                  name="password"
                  type="password"
                  class="userPassword input clickable"
                  required
                ></input>
              </div>

              <button type="submit" className="clickable" id="submitLogin">
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
