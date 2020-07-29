import React from 'react';
import cssClasses from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



//COMPONENT FUNCTION ===============
const burger = (props) => {
    const ingredients = ingredientToComponent(props.ingredients);

    //Return JSX Code ==========
    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}; export default burger;
//END OF: BURGER COMPONENT FUNCTION =====





//FUNCTIONS ==================================================

/*  METHOD ID: ingredientToComponent() ===============
        - Using the given ingredients from props, create the quantity worth of <BurgerIngredients> of that ingredient */
const ingredientToComponent = (ingredientObject) => {
    const ingredientArray = Object.keys(ingredientObject).map((igKey) => {
        return [...Array(ingredientObject[igKey])].map((_, index) => {
            return (
                <BurgerIngredient key={igKey + index} type={igKey} />
            );
        });
    });

    //Flatten the array to an One-Dimmentional Array
    let flatIngredientArray = ingredientArray.reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    //Check if the ingredientList is empty
    if (flatIngredientArray.length ===0) {
        flatIngredientArray = <p>Please start adding ingredients!</p>
    }

    //Return flattened list of JSX Ingredients
    return flatIngredientArray;
} //END OF: ingredientToComponent() =====

//END OF: FUNCTIONS =====