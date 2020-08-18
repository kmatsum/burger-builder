//Standard Imports
import React from 'react';
//React Router Imports
import { Route } from 'react-router-dom'
//Custom Component Imports
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

//Component Class =========================
class Checkout extends React.Component {
    //State ---------------
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        //Get the Search Parameters from the URL
        const query = new URLSearchParams(this.props.location.search);
        //Get the ingredients and Price from the Search Parameter Query
        const ingredients = {}
        let price = 0;
        //query.entries() returns an iterator that can be used to extract all URL Queries
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        //Set the Checkout component Ingredient State
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    //Render Method ---------------
    render() {
        //Return JSX -----
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCancel={this.checkoutCancelledHandler}
                    onContinue={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}
                />
            </div>
        );
    }

    //FUNCTIONS =========================

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
} export default Checkout;