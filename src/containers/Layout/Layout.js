// Standard Imports
import React from 'react';
import cssClasses from './Layout.module.css';
// Higher Order Component Import
import Auxiliary from '../../hoc/Auxiliary';
// Redux Imports
import { connect } from 'react-redux';
// Custom Component Imports
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Component Class =========================
class Layout extends React.Component {
    // Instantiate State
    state = {
        showSideDrawer: false,
    }

    // Render Method ===============
    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

    // FUNCTIONS =========================

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
}

// Redux Component Connections
const mapStateToProps = (reduxState) => {
    return {
        // Check to see if we are authenticated by comparing the value to null
        isAuthenticated: reduxState.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);