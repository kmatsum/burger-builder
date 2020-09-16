// React Import
import React from 'react';
// Higher Order Component Imports
import Auxiliary from '../../hoc/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// Axios Instance Imports
import axiosOrder from '../../axios-orders';
// Redux Imports
import { connect } from 'react-redux';
import * as actions from '../../store/actions/reduxActionIndex';
// Custom Component Imports
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

// Component Class =========================
export class BurgerBuilder extends React.Component {

    // Component State ----------
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onFetchIngredients();
    }

    // Render JSX ----------
    render() {
        // Create a JavaScript Object of the Ingredients and determine if but button should be disabled
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        // Component Variables
        let burgerBuilder = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients cant be loaded!</p> : <Spinner />
        let orderSummary = null;

        // Check if Ingredients are loaded from the Backend Server, load Components
        if (this.props.ings) {
            burgerBuilder = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchasableState(this.props.ings)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPrice={this.props.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
            />;
        }

        // Return JSX -----
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burgerBuilder}
            </Auxiliary>
        );
    }



    // FUNCTIONS =========================

    /*  Update the Purchasable State: ---------------
    *       Will analyze the 'ingredients' Object retrieved from arguments to determine if the built burger
    *       is NOT empty and purchasable
    */
    updatePurchasableState = (ingredients) => {
        //Go through the ingredients Object to add all the quantities
        const sum = Object.keys(ingredients).map((igKey) => {
            return (
                ingredients[igKey]
            );
        }).reduce((sum, el) => {
            return (sum + el);
        }, 0);
        //Set the Purchasability State of the current burger based on the ingredient quantity
        return sum > 0;
    }

    /*  Purchasing Method: ---------------
    *       Will update the 'purchasing' state value and show the OrderSummary modal
    */
    purchaseHandler = () => {
        // Check if the user is Authenticated (TRUE will continue with the purchase, FALSE will take the user to Sign Up)
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onAuthSetRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }

    /*  Cancel the Purchase Order: ---------------
    *       Will update the 'purchasing' state value and show the OrderSummary modal
    */
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    /*  Continue with the Purchase Order: ---------------
    *       Will handle the continue ordering request
    */
    purchaseContinuedHandler = () => {
        // Create Query Parameters for our URL
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push("price=" + this.state.totalPrice);
        // const queryString = queryParams.join("&");

        // this.props.history.push({
        //     pathname: "/checkout",
        //     search: "?" + queryString,
        // });

        this.props.onInitPurchase();

        this.props.history.push("/checkout");
    }
}



// Redux Connections ===============
const mapStateToProps = (reduxState) => {
    return {
        ings: reduxState.burgerBuilder.ingredients,
        totalPrice: reduxState.burgerBuilder.totalPrice,
        error: reduxState.burgerBuilder.error,
        isAuthenticated: reduxState.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onFetchIngredients: () => dispatch(actions.fetchIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    };
};

// Export the container component with the React-Redux 'connect' Higher Order Component
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosOrder));