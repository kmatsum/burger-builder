//Standard Imports
import React from 'react';
import cssClasses from './Order.module.css';

//Component Function =========================
const order = (props) => {
    //Convert the Ingredients JavaScript Object into an Array of Ingredients
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    //Convert the Array of Ingredients to <span> HTML elements to 
    const ingredientsComponent = ingredients.map((ig) => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}
            >{ig.name} ({ig.amount})</span>
        );
    });

    //Return JSX ---------------
    return (
        <div className={cssClasses.Order}>
            <p>Ingredients: {ingredientsComponent}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
}; export default order;