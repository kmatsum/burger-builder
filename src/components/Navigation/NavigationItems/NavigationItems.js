//Standard Imports
import React from 'react';
import cssClasses from './NavigationItems.module.css';
//Custom Component Imports
import NavigationItem from './NavigationItem/NavigationItem';

//Component Imports =========================
const navigationItems = (props) => {

    //Return JSX ----------
    return (
        <ul className={cssClasses.NavigationItems}>
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Login</NavigationItem>}
        </ul>
    );
}; export default navigationItems;