//Standard Imports
import React from 'react';
import cssClasses from './Layout.module.css';
//Higher Order Component Import
import Auxiliary from '../../hoc/Auxiliary';
//Custom Component Imports
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Auxiliary>
        <Toolbar/>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Auxiliary>
); export default layout;