import React from 'react';
//CSS Import
import cssClasses from './BurgerIngredient.module.css';

const burgerIngredient = (props) => {
    let ingredient = null;

    //Dependent on the props.type, the used CSS Class will differ
    switch (props.type) {
        
        case ('bread-bottom'): {
            ingredient = <div className={cssClasses.BreadBottom}></div>;
        } break;

        case ('bread-top'): {
            ingredient = (
                <div className={cssClasses.BreadTop}>
                    <div className={cssClasses.Seeds1}></div>
                    <div className={cssClasses.Seeds2}></div>
                </div>
            );
        } break;

        case ('meat'): {
            ingredient = <div className={cssClasses.Meat}></div>
        } break;

        case ('cheese'): {
            ingredient = <div className={cssClasses.Cheese}></div>
        } break;

        case ('bacon'): {
            ingredient = <div className={cssClasses.Bacon}></div>
        } break;

        case ('salad'): {
            ingredient = <div className={cssClasses.Salad}></div>
        } break;

        default: {
            ingredient = null;
        }
    }

    //Return JXS ===============
    return (
        ingredient
    );
}; export default burgerIngredient;