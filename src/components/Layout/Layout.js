//React Import
import React from 'react';
//Higher Order Component Import
import Auxiliary from '../../hoc/Auxiliary';
//CSS Imports
import cssClasses from './Layout.module.css';

const layout = (props) => (
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Auxiliary>
); export default layout;