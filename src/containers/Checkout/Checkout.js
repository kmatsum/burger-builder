// Standard Imports
import React from 'react';
// React Router Imports
import { Route } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
// Custom Component Imports
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// Component Class =========================
class Checkout extends React.Component {

    // Render Method ---------------
    render() {
        // Return JSX -----
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCancel={this.checkoutCancelledHandler}
                    onContinue={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }

    // FUNCTIONS =========================

    /*  Continue with the purchase: ---------------
    *       
    */
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    /*  Cancel the purchase: ---------------
    *       
    */
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
}

// Redux Connections ===============
const mapStateToProps = (reduxStore) => {
    return {
        ings: reduxStore.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);