//React Import
import React from 'react';
//Higher Order Component Imports
import Auxiliary from '../../hoc/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//Axios Instance Imports
import axiosOrder from '../../axios-orders';
//Custom Component Imports
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

//Ingredient Price Constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}



//Component Class =========================
class BurgerBuilder extends React.Component {

    //Component State ----------
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        //HTTP Requests to get the default ingredients
        axiosOrder.get('/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch((error) => {
                this.setState({ error: true });
                console.log(error);
            });
    }

    //Render JSX ----------
    render() {
        //Create a JavaScript Object of the Ingredients and determine if but button should be disabled
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        //Component Variables
        let burgerBuilder = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients cant be loaded!</p> : <Spinner />
        let orderSummary = null;

        //Check if Ingredients are loaded from the Backend Server, load Components
        if (this.state.ingredients) {
            burgerBuilder = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler}
            />;

        }

        //Determine if the loading <Spinner/> needs to be displayed insted of <OrderSummary/>
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        //Return JSX -----
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



    //FUNCTIONS =========================

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
        this.setState({
            purchasable: sum > 0
        });
    }

    /*  Add Ingredient: ---------------
    *       Will add 1 to the quantity of ingredients of 'type', retrieved from arguments
    */
    addIngredientHandler = (type) => {
        //Calculate the new quantity of 'type' ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //Create a copy of the state and update the 'type' quantity
        const updatedIngredientState = {
            ...this.state.ingredients
        };
        updatedIngredientState[type] = updatedCount;
        //Update the Total Price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPriceState = oldPrice + priceAddition;
        //Update the state
        this.setState({
            ingredients: updatedIngredientState,
            totalPrice: updatedPriceState,
        });
        //Update the Purchasability of the current burger
        this.updatePurchasableState(updatedIngredientState);
    }

    /*  Remove Ingredient: ---------------
    *       Will remove 1 from the quantity of ingredients of 'type', retrieved from arguments
    */
    removeIngredientHandler = (type) => {
        //Return if there are no more ingredients left
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        //Calculate the new quantity of 'type' ingredient
        const updatedCount = oldCount - 1;
        //Create a copy of the state and update the 'type' quantity
        const updatedIngredientState = {
            ...this.state.ingredients
        };
        updatedIngredientState[type] = updatedCount;
        //Update the Total Price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPriceState = oldPrice - priceAddition;
        //Update the state
        this.setState({
            ingredients: updatedIngredientState,
            totalPrice: updatedPriceState,
        });
        //Update the Purchasability of the current burger
        this.updatePurchasableState(updatedIngredientState);
    }

    /*  Purchasing Method: ---------------
    *       Will update the 'purchasing' state value and show the OrderSummary modal
    */
    purchaseHandler = () => {
        this.setState({ purchasing: true });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    }
} export default withErrorHandler(BurgerBuilder, axiosOrder);