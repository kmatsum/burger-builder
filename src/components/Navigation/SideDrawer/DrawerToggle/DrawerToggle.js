//Standard Imports
import React from 'react';
import cssClasses from './DrawerToggle.module.css';

//Component Function =========================
const drawerToggle = (props) => {

    //Return JSX ===============
    return (
        <div
            className={cssClasses.DrawerToggle}
            onClick={props.clicked}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}; export default drawerToggle;