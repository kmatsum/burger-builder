//Standard Imports
import React from 'react';
import cssClasses from './NavigationItem.module.css';

//Component Function =========================
const navigationItem = (props) => {

    //Return JSX ===============
    return (
        <li className={cssClasses.NavigationItem}>
            <a
                href={props.link}
                className={props.active ? cssClasses.active : null}
            >{props.children}</a>
        </li>
    );
}; export default navigationItem;