import { useReducer, useState } from 'react';
import useInterval from './useInterval';

function useEmailValidtion(seconds) {// This function checks if the email is valid
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // This reducer function simultaneously checks the validity of the email and returns the entered value
    const [emailValid, setEmailValid] = useState(false);
    /*
    useReducer() inner function arguments:
      state: current state value
      action: tells the reducer how to change the state
    */
    const emailReducer = (state, action) => {
        const isValidEmail = validateEmail(action);
        setEmailValid(isValidEmail);
        return action;
    };

    // Uses useReducer() instead of useState() to add more state functionality 
    const [email, setEmail] = useReducer(emailReducer, '');
    const maxSeconds = 30;
    const [count, setCount] = useState(maxSeconds);

    // This is a React function which handles time (in milliseconds)
    useInterval(() => {
        setCount(count - 1);
    }, 1000);

    const retObject = { setEmail, count, email, emailValid, setCount };
    return retObject;
}

export default useEmailValidtion;