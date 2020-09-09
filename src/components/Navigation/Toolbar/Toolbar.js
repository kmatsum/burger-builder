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
            {/* DrawerToggle: Hamburger icon for mobile. Only displayed when min-width is 500 */}
            <DrawerToggle
                clicked={props.drawerToggleClicked}
            />
            <div className={cssClasses.Logo}>
                <Logo />
            </div>
            <nav className={cssClasses.DesktopOnly}>
                <NavigationItems
                    isAuthenticated={props.isAuthenticated}
                />
            </nav>
        </header>
    );
}; export default toolbar;