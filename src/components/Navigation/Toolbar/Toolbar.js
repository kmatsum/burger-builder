//Standard Imports
import React from 'react';
import cssClasses from './Toolbar.module.css';
//Custom Component Imports
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';

//Component Function =========================
const toolbar = (props) => {

    //Return JSX ===============
    return (
        <header className={cssClasses.Toolbar}>
            <DrawerToggle
                clicked={props.drawerToggleClicked}
            />
            <div className={cssClasses.Logo}>
                <Logo />
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}; export default toolbar;