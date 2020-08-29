// Action Type Imports
import * as actionTypes from '../actions/actionTypes';

// Ingredient Price Constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState = {
    //Component Initial State ----------
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
}

// Main Redux Reducer =========================
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: ++state.ingredients[action.ingredientName],
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        }

        case (actionTypes.REMOVE_INGREDIENT): {
            //Check if there are ingredients to remove
            if (state.ingredients[action.ingredientName] <= 0) {
                return state;
            }

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: --state.ingredients[action.ingredientName],
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        }

        default: {
            return state;
        }
    }
}; export default reducer;