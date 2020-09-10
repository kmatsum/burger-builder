// Standard Imports
import React from 'react';
// React Router Imports
import { Redirect } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';



// Component Class =========================
class Logout extends React.Component {

    componentDidMount() {
        // Logout of the user upon mounting
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

// Redux Component Connections

// const mapStateToProps ...

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
}

export default connect(null, mapDispatchToProps)(Logout);