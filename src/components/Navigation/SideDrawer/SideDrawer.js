//Standard Imports
import React from 'react';
import cssClasses from './SideDrawer.module.css';
//Custom Component Imports
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

//Component Function =========================
const sideDrawer = (props) => {
    //Open or Close the side Drawer by conditionally applying CSS classes
    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if (props.open) {
        attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
    }

    //Return JSX ===============
    return (
        <Auxiliary>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={attachedClasses.join(' ')}>
                <div className={cssClasses.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated}
                    />
                </nav>
            </div>
        </Auxiliary>
    );
}; export default sideDrawer;