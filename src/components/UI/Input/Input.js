//Standard Imports
import React from 'react';
import cssClasses from './Input.module.css';

//Component Function =========================
const input = (props) => {
    const inputCSSClasses = [cssClasses.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputCSSClasses.push(cssClasses.Invalid);
    }

    let inputElement = null;
    //Switch Statement to determine the Input HTML Element ----------
    switch (props.elementType) {
        //One-Line Input HTML Element -----
        case ("input"): (
            inputElement =
            <input
                {...props.elementConfig}
                className={inputCSSClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
        ); break;
        //Text-Area HTML Element -----
        case ("textarea"): (
            inputElement =
            <textarea
                {...props.elementConfig}
                className={inputCSSClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
        ); break;
        //'Dropdown' HTML Element -----
        case ("select"): (
            inputElement =
            <select className={inputCSSClasses.join(' ')} value={props.value} onChange={props.changed}>
                { //Map each 'option' from props.elementConfig to an option of the 'select' Input Element 
                    props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))
                }
            </select>
        ); break;
        //Default Input HTML Element -----
        default: (
            inputElement =
            <input
                {...props.elementConfig}
                className={inputCSSClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
        );
    } //END OF: Switch() -----



    //Return JSX ---------------
    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}; export default input;