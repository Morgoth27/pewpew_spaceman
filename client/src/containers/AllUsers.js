import { USERS_QUERY } from '../gql';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from 'react-apollo-hooks';

const showUsers = () => {
    const allUsers = useQuery(USERS_QUERY);
    return allUsers
};

module.export = showUsers