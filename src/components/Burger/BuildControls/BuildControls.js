//React Imports
import React from 'react';
import cssClasses from './BuildControls.module.css';
//Custom Component Imports
import BuildControl from './BuildControl/BuildControl';



//An Array of all available "Controls" for the Burger Builder
const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];


//Component Function =========================
const buildControls = (props) => {

    //Return JSX ==========
    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl) => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />
                );
            })}
            <button
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >{props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>
        </div>
    );
}; export default buildControls;