//Standard Imports
import React from 'react';
//Custom Component Imports
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

//Component Class =========================
class Checkout extends React.Component {
    //State ---------------
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    //Render Method ---------------
    render() {
        //Return JSX -----
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        );
    }
} export default Checkout;