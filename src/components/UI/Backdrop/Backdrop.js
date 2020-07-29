//React Imports
import React from 'react';
import cssClasses from './Backdrop.module.css';



//Component Function =========================
const backdrop = (props) => {

    //Return JSX ===============
    return (
        props.show ? <div className={cssClasses.Backdrop} onClick={props.clicked}></div> : null
    );
}; export default backdrop;