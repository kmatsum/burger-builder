//React Import
import React from 'react';
//Higher Order Component Import
import Auxiliary from '../../hoc/Auxiliary';

const layout = (props) => (
    <Auxiliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxiliary>
); export default layout;