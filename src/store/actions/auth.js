// Action Type Imports
import * as actionTypes from './actionTypes';
// Axios Imports
import axios from 'axios';
// Import Key-Constants
import * as APIKeys from '../../keys';

// Action Creators =========================

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}



// Asyncronous Actions =========================

export const auth = (email, password, isSignup) => {
    // Return a Async function for Redux-Thunk to handle
    return (dispatch) => {
        // Start the authProcess
        dispatch(authStart());

        // Setup the JSON Payload for the HTTP Post Requests
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        // Change the API URL based on if we are Signing Up or Signing In
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKeys.FirebaseAPIKey}`;
        if (!isSignup) {
            authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKeys.FirebaseAPIKey}`;
        }

        // Send an HTTP POST Requests
        axios.post(authUrl, authData)
            // Provide the returned data to Redux Dispatch
            .then((response) => {
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            // Catch errors and send to Redux Dispatch
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // Set an Async Timeout to force a logout when the expirtaion time has been reached
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}