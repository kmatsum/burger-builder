import React from 'react';
import cssClasses from './Spinner.module.css';

//Component Function =========================
const spinner = () => {
    //Return JSX ---------------
    return (
        <div className={cssClasses.Loader}>Loading...</div>
    );
}; export default spinner;