// Import Action Types
import * as actionTypes from '../actions/actionTypes';
// Utility Imports
import { updateObject } from '../../shared/utility';

// Initial State
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
}

// Reducer Function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Start the Auth Process
        case (actionTypes.AUTH_START): {
            return updateObject(state, { error: null, loading: true });
        }

        // Save user Auth Information when successful
        case (actionTypes.AUTH_SUCCESS): {
            return updateObject(state, {
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            });
        }

        // Save error Information when auth failed
        case (actionTypes.AUTH_FAIL): {
            return updateObject(state, {
                token: null,
                userId: null,
                error: action.error,
                loading: false,
            });
        }

        // Logout a User
        case (actionTypes.AUTH_LOGOUT): {
            return updateObject(state, {
                token: null,
                userId: null,
            });
        }

        // Change the redirect path
        case (actionTypes.AUTH_SET_REDIRECT_PATH): {
            return updateObject(state, {
                authRedirectPath: action.path,
            });
        }

        // Default case
        default: {
            return state;
        }
    }

}; export default reducer;