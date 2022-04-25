import { ADD_USER } from '../utils/mutations';
import { USERS_QUERY } from '../utils/queries';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
// import { useMutation } from 'react-apollo-hooks';



function newUserConstructor ([addNewUser, [data]]) {
const newUser = (username, email, password) => {
    // const [name, setName] = useState('');
  
    const addUser = addNewUser({
      username, email, password
    }
  )}
return newUser
    // const cacheUser = useMutation(ADD_USER, {
    //   update(cache, { data: { cacheUser } }) {
    //     try {
    //       const { users } = cache.readQuery({ query: USERS_QUERY });
  
    //       cache.writeQuery({
    //         query: USERS_QUERY,
    //         data: { users: [...users, cacheUser] },
    //       });
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   },
    // })

};

export default newUserConstructor