//Standard Imports
import React from 'react';
import cssClasses from './CheckoutSummary.module.css';
//Custom Components
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

//Component Function =========================
const checkoutSummary = (props) => {

    //Return JSX ---------------
    return (
        <div className={cssClasses.CheckoutSummary}>
            <h1>Thank you for your purchase! We hope you enjoy!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div>
                <Button
                    buttonType="Danger"
                    clicked
                >CANCEL</Button>
                <Button
                    buttonType="Success"
                    clicked
                >CONTINUE</Button>
            </div>
        </div>
    );
}; export default checkoutSummary;