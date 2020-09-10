// Action Type Imports
import * as actionTypes from '../actions/actionTypes';
// Utility Imports
import { updateObject } from '../utility';

// Ingredient Price Constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState = {
    //Component Initial State ----------
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
}

// Main Redux Reducer =========================
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): {
            // Create an Updated Ingredient Object
            const updatedIngredient = { [action.ingredientName]: ++state.ingredients[action.ingredientName] };
            // Create a "new" Ingredients Object
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            // Create a new State Object
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
            };

            return updateObject(state, updatedState);
        }

        case (actionTypes.REMOVE_INGREDIENT): {
            //Check if there are ingredients to remove
            if (state.ingredients[action.ingredientName] <= 0) {
                return state;
            }

            // Create an Updated Ingredient Object
            const updatedIng = { [action.ingredientName]: --state.ingredients[action.ingredientName] };
            // Create a "new" Ingredients Object
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            // Create a new State Object
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true,
            };

            return updateObject(state, updatedSt);
        }

        case (actionTypes.SET_INGREDIENTS): {
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false,
            });
        }

        case (actionTypes.FETCH_INGREDIENTS_FAILED): {
            return updateObject(state, { error: true, });
        }

        default: {
            return state;
        }
    }
}; export default reducer;