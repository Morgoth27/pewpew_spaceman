import React from "react";
import "../css/login.css";
import "../css/reset.css";


export default class App extends React.Component {
	render() {
		return (
			<>

				<div className="createPanel" data-visble="true">
					<h1 className="createHeader">Create Account</h1>

					<div className="formHolder">
						<form action="/api/users/register" method="post" class="userEntryForm" data-visible="true">
							<div className="formSect usernameSection">
								<label for="name" class="formHeader userNameHeader">Username:</label>
								<input name="name" type="text" class="userName input" required></input>
							</div>
				
							<div className="formSect emailSection">
								<label for="email" class="formHeader userEmailHeader">Email:</label>
								<input name="email" type="text" class="userEmail input" required></input>
							</div>

							<div className="formSect passwordSection">
								<label for="password" class="formHeader userPasswordHeader">Password:</label>
								<input name="password" type="password" class="userPassword input" required></input>
							</div>

							<button type="submit" id="submitLogin">Submit</button>
                		</form> 
					</div>
					

					<div className="swapLogin">
						<h1 className="alreadyHead">Already have an account?</h1>

						<div className="swapBTN swapLogBTN">Sign In</div>
					</div>

				</div>




				<div className="loginPanel" data-visible="false">
					<h1 className="createHeader">Sign In</h1>

					<div className="formHolder">
						<form action="/api/users/register" method="post" class="userEntryForm" data-visible="true">
							<div className="formSect usernameSection">
								<label for="name" class="formHeader userNameHeader">Username:</label>
								<input name="name" type="text" class="userName input" required></input>
							</div>

							<div className="formSect passwordSection">
								<label for="password" class="formHeader userPasswordHeader">Password:</label>
								<input name="password" type="password" class="userPassword input" required></input>
							</div>

							<button type="submit" id="submitLogin">Submit</button>
                		</form> 
					</div>
					

					<div className="swapLogin">
						<h1 className="alreadyHead">Don't have an account?</h1>

						<div className="swapBTN swapCreateBTN">Create Account</div>
					</div>

				</div>



			</>
		);
	}
}
