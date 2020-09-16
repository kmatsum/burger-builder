// Reducer Function Imports
import reducer from './auth';
// Action Type Imports
import * as actionTypes from '../actions/actionTypes';



// Define the Test Suite
describe('Authication Reducer', () => {
    // Define a Test
    it('Should return the initial state when an invalid action is passed', () => {
        /*  Expect a result / returned value from the reducer
         *      In this case, when the reducer is provided with an undefined state, it should
         *      put the "initialState" values which get returned, since the Action Object is empty
         */
        expect(
            // Reducer Function Call, passing the parameters the reducer takes (STATE, ACTION OBJECT)
            reducer(undefined, {})
        )
            // What the Reducer function should return for successful test
            .toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: "/",
            });
    });

    it('Should store the toke upon login', () => {
        expect(
            reducer({
                // "Initial Reducer State"
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath: "/",
            }, { // Action Object
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'some-token',
                userId: 'some-user-id',
            })
        )
            .toEqual({
                token: 'some-token',
                userId: 'some-user-id',
                error: null,
                loading: false,
                authRedirectPath: "/",
            });
    })
});