// Action Type Imports
import * as actionTypes from './actionTypes';
// Axios Imports
import axios from 'axios';

// Action Creators =========================

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        error: error,
    };
};



// Asyncronous Actions =========================
export const auth = (email, password) => {
    // Return a Async function for Redux-Thunk to handle
    return (dispatch) => {
        // Send an HTTP POST Requests
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]');
        // ... Authenticate User
        dispatch(authStart());
    }
}