//Standard Imports
import React from 'react';
import cssClasses from './Button.module.css';

//Component Function =========================
const button = (props) => {

    //Return JSX ===============
    return (
        <button
            className={[cssClasses.Button, cssClasses[props.buttonType]].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >{props.children}</button>
    );
}; export default button;