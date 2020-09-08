// Action Type Imports
import * as actionTypes from './actionTypes';
// Axios Instance Imports
import axiosOrder from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};



// Asyncronous Actions =========================

export const fetchIngredients = () => {
    return (dispatch) => {
        // HTTP Requests to get the default ingredients
        axiosOrder.get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsFailed());
            });
    };
};