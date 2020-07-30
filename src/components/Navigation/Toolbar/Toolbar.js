//Standard Imports
import React from 'react';
import cssClasses from './Toolbar.module.css';
//Custom Component Imports
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

//Component Function =========================
const toolbar = (props) => {

    //Return JSX ===============
    return (
        <header className={cssClasses.Toolbar}>
            <div>Menu</div>
            <Logo />
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    );
}; export default toolbar;