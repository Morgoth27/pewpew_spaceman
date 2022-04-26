// import { ADD_USER } from '../utils/mutations';
// import { USERS_QUERY } from '../utils/queries';
// import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
// // import { useMutation } from 'react-apollo-hooks';

// const handleInputChange = (event) => {

// const [formState, setFormState] = useState({
//   signupName: '',
//   signupEmail: '',
//   signupPassword: ''
// });

//   const {name, value} = event.target
//   switch(name) {
//     case 'signupName':
//       this.useState.signupName = value;
//       break;
//     case 'signupEmail':
//       this.useState.signupEmail =  value;
//       break;
//     case 'signupPassword':
//       this.useState.signupPassword = value;
//       break;
//   }
// }

//   const [addUser] = useMutation(ADD_USER, {
//   variables: {
//     username: formState.username,
//     email: formState.email,
//     password: formState.password
//   }
// });

// return (
//   // <div>
//     <button
//       onSubmit={(e) => {
//         e.preventDefault();
//         addUser();
//       }}  type="submit" className="signupBtn clickable" id="signupBtn"
//     >
//       ...
//     </button>
//   // </div>
// );


// // const createNewUser = () => {
// //   const [formState, setFormState] = useState({
// //       username: '',
// //       email: '',
// //       password: ''
// //   });
// // };

// export default handleInputChange


import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

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
};

export default Signup;