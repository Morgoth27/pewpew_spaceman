import { REMOVE_USER, USERS_QUERY } from '../gql';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from 'react-apollo-hooks';

const removeUser = () => {
    // const [name, setName] = useState('');
  
    const removeUser = useMutation(REMOVE_USER, {
    variables: {id: user.id},
      update(cache, { data: { removeUser } }) {
        try {
          const { users } = cache.readQuery({ query: USERS_QUERY });
  
          cache.writeQuery({
            query: USERS_QUERY,
            data: { users: users.filter(user => user.id !== removeUser)},
          });
        } catch (e) {
          console.error(e);
        }
      },
    })
};

module.export = removeUser;