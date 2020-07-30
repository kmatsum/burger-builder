//Standard Imports
import React from 'react';
import cssClasses from './Logo.module.css';
//Logo Image Imports
import burgerLogo from '../../assets/images/burger-logo.png';

//Component Function =========================
const logo = (props) => {

    //Return JSX ===============
    return (
        <div className={cssClasses.Logo}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    );
}; export default logo;