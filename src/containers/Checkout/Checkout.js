// Standard Imports
import React from 'react';
// React Router Imports
import { Route, Redirect } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
// Custom Component Imports
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// Component Class =========================
class Checkout extends React.Component {
    // Render Method ---------------
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            // Set a <Redirect/> component to redirect us when purchasing has been successfully completed
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

            summary = (
                <div>
                    {purchasedRedirect}
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

        // Return JSX -----
        return summary;
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
const mapStateToProps = (reduxState) => {
    return {
        ings: reduxState.burgerBuilder.ingredients,
        purchased: reduxState.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);