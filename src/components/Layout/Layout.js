//Standard Imports
import React from 'react';
import cssClasses from './Layout.module.css';
//Higher Order Component Import
import Auxiliary from '../../hoc/Auxiliary';
//Custom Component Imports
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

//Component Class =========================
class Layout extends React.Component {
    //Instantiate State
    state = {
        showSideDrawer: true,
    }
    
    //Render Method ===============
    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

    //FUNCTIONS =========================

    /*  Force-Close the Side Drawer Component: ===============
            Will force the 'showSideDrawer' state to be false, closing the Side Drawer Component        */
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    /*  Toggle the Side Drawer Component: ===============
            Will Toggle the 'showSideDrawer' state to the opposite of the previous state                */
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }
} export default Layout;