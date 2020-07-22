//React Import
import React from 'react';
//Higher Order Component Imports
import Auxiliary from '../../hoc/Auxiliary';

//BurgerBuilder Component Class =========================
class BurgerBuilder extends React.Component {
    //Render JSX ===============
    render() {
        return (
            <Auxiliary>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
} export default BurgerBuilder;