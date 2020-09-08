// Import Action Types
import * as actionTypes from '../actions/actionTypes';
// Utility Imports
import { updateObject } from '../utility';

// Initial State
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
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
                error: action.error,
                loading: false,
            });
        }

        // Default case
        default: {
            return state;
        }
    }

}; export default reducer;