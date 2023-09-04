import { useReducer, useState } from 'react';
import useInterval from './useInterval';

function EmailValidatingForm() {
  // This function checks if the email is valid
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

  // This section renders the UI
  return (
    <div className="container">
      <br />
      <div>
        <div className="content">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={count <= 0}
            value={email}
            placeholder="Enter Email"
            type="email"
            name="email"
            required
          />
          &nbsp;&nbsp;&nbsp;
          <button
            disabled={!emailValid || count <= 0}
            onClick={() => {
              setCount(0);
              alert(`button clicked with email ${email}`);
            }}
            className="btn-lg"
            type="submit"
          >
            PRESS ME!
          </button>
          <div>
            {count > 0
              ? `You Have ${count} Seconds To Enter Your Email`
              : 'Email Entered or Time Expired'}
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmailValidatingForm;
