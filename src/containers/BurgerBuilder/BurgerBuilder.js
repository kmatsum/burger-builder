//React Import
import React from 'react';
//Higher Order Component Imports
import Auxiliary from '../../hoc/Auxiliary';
//Custom Component Imports
import Burger from '../../components/Burger/Burger';

//BurgerBuilder Component Class =========================
class BurgerBuilder extends React.Component {
    
    // constructor() {
    //     super(props);
    //     this.state = {
    //     }
    // }

    //Current Burger State =====
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        }
    }

    //Render JSX ===============
    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
} export default BurgerBuilder;