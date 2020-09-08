// Action Type Imports
import * as actionTypes from '../actions/actionTypes';
// Utility Imports
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.PURCHASE_INIT): {
            return updateObject(state, { purchased: false, });
        }



        case (actionTypes.PURCHASE_BURGER_START): {
            return updateObject(state, { loading: true, });
        }

        case (actionTypes.PURCHASE_BURGER_SUCCESS): {
            // Compile Data into a single Object
            const newOrder = updateObject(action.orderData, { id: action.orderId, });
            // Return new state
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true,
            });
        }

        case (actionTypes.PURCHASE_BURGER_FAILED): {
            return updateObject(state, { loading: false, });
        }



        case (actionTypes.FETCH_ORDERS_START): {
            return updateObject(state, { loading: true, });
        }

        case (actionTypes.FETCH_ORDERS_SUCCESS): {
            return updateObject(state, {
                orders: action.orders,
                loading: false,
            });
        }

        case (actionTypes.FETCH_ORDERS_FAIL): {
            return updateObject(state, { loading: false, });
        }

        default: {
            return state;
        }
    }
}; export default reducer;