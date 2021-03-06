//React Imports
import React from 'react';
import cssClasses from './BuildControl.module.css';



//Component Function =========================
const buildControl = (props) => {

    //Return JSX ==========
    return (
        <div className={cssClasses.BuildControl}>
            <div className={cssClasses.Label}>{props.label}</div>
            <button
                className={cssClasses.Less}
                onClick={props.removed}
                disabled={props.disabled}
            >Less</button>
            <button
                className={cssClasses.More}
                onClick={props.added}
            >More</button>
        </div>
    );
}; export default buildControl;