//Standard Imports
import React from 'react';
import cssClasses from './NavigationItem.module.css';
//React Router Imports
import { NavLink } from 'react-router-dom';

//Component Function =========================
const navigationItem = (props) => {

    //Return JSX ----------
    return (
        <li className={cssClasses.NavigationItem}>
            <NavLink
                exact={props.exact}
                to={props.link}
                activeClassName={cssClasses.active}
            >{props.children}</NavLink>
        </li>
    );
}; export default navigationItem;