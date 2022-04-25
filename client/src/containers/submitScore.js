import { SUBMIT_SCORE, USERS_QUERY } from '../gql';
import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';


const submitScore = useMutation(SUBMIT_SCORE);

const newScore = (score) => {
    // const [score, setName] = useState('');
  
    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
    
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await submitScore({
          variables: { score },
        });
  
        // window.location.reload();
      } catch (err) {
        console.error(err);
      }
    };}
  

