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

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    // Remove Auth information from Local Storage
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path,
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
                // --- Save Auth Data ---
                // Calculate the expiration date
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // Save the authentication into local storage:
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);

                // --- Dispatch Redux Actions ---
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            // Catch errors and send to Redux Dispatch
            .catch((error) => {
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

export const authCheckState = () => {
    return (dispatch) => {
        // Try to grab Saved Token
        const token = localStorage.getItem("token");

        // Logout to clear data if Saved Token DNE
        if (!token) {
            dispatch(logout());
        } else {
            // Get the expiration Date and calculate the expiration period
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;

            // If the token has expired, Logout to clear data
            // expiresIn <= 0
            if (expiresIn <= 0) {
                dispatch(logout());
            } else {
                // Grab User Id
                const userId = localStorage.getItem("userId");
                // Run Redux Actions
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expiresIn));
            }
        }
    };
}