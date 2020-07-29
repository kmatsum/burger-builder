//React Import
import React from 'react';
//Higher Order Component Imports
import Auxiliary from '../../hoc/Auxiliary';
//Custom Component Imports
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}


//BurgerBuilder Component Class =========================
class BurgerBuilder extends React.Component {
    //Burger State =====
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }



    //Render JSX ===============
    render() {
        //Create a JavaScript Object of the Ingredients and determine if but button should be disabled
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
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
    }



    //FUNCTIONS ==================================================

    /*  Update the Purchasable State: ===============
            Will analyze the 'ingredients' Object retrieved from arguments to determine if the built burger
            is NOT empty and purchasable                                                                    */
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

    /*  Add Ingredient: ===============
            Will add 1 to the quantity of ingredients of 'type', retrieved from arguments                   */
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

    /*  Remove Ingredient: ===============
            Will remove 1 from the quantity of ingredients of 'type', retrieved from arguments          */
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

    /*  Purchasing Method: ===============
            Will update the 'purchasing' state value and show the OrderSummary modal                    */
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
} export default BurgerBuilder;