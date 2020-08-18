//Standard Imports
import React from 'react';
import cssClasses from './ContactData.module.css';
//Axios Instance Imports
import axiosOrder from '../../../axios-orders';
//Custom Component Imports
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import input from '../../../components/UI/Input/Input';

//Component Class =========================
class ContactData extends React.Component {
    //State ---------------
    state = {
        /*  The 'orderForm' object holds information for <form> configuration
         *  Each Object within the 'orderForm' object has an 'elementType' and an 'elementConfig' property.
         *  These two properties are passed into our custom <Input/> Component, which will use these to setup
         *  the proper Input HTML Tag, value property, etc. */
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        }, //END OF: orderForm -----
        loading: false,
    } //END OF: State ----------



    render() {
        //Convert the 'orderForm' Object from the state to an array we can iterate through
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        //Create a form variable for Loading Spinner purposes
        let form = (
            <form>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
                    />
                ))}
                <Button clicked={this.orderHandler} buttonType="Success">ORDER</Button>
            </form>
        );
        //If the component is still loading, display a Spinner
        if (this.state.loading) {
            form = <Spinner />;
        }

        //Return JSX ----------
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    } //END OF: render() ----------



    //FUNCTIONS =========================

    /*  Continue with the purchase: ---------------
     *      Process and Place Order
     */
    orderHandler = (event) => {
        //Prevents the default action for the event
        event.preventDefault();
        //Set 'Loading' state to true, enablind Loading Spinners
        this.setState({ loading: true })
        //Compile the current burger to Send
        const sendThisBurger = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            // customer: {
            //     name: 'Kaz',
            //     address: {
            //         street: 'Teststreet 1',
            //         zipCode: '12345',
            //         country: 'Earth',
            //     },
            //     email: 'test@test.com'
            // },
            // deliveryMethod: 'Prime'
        }
        //HTTP POST Request based on the Axios-Order Instance
        axiosOrder.post('/orders.json', sendThisBurger)
            .then((response) => {
                console.log(response);
                //Alert the user of successful POST
                alert('Burger Ordered');
                //Disable Loading Spinner
                this.setState({ loading: false });
                //Push to the homepage
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
                //Disable Loading Spinner
                this.setState({ loading: false });
            });
    }

    /*  Continue with the purchase: ---------------
     *      Process and Place Order
     */
    inputChangedHandler = (event, inputIdentifier) => {
        //Create a copy of the orderForm state
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //Since we have nested Objects in the orderForm state, the nested input
        //element object with the 'inputIdentifier' key needed to be copied */
        const updatedFormElement = {
            ...this.state.orderForm[inputIdentifier]
        };

        //Change the 'value' property for the Form Element
        updatedFormElement.value = event.target.value;
        //Update the 'inputIdentifier' key object with the 'updatedFormElement' object
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        //Set the state with the finalized OrderForm
        this.setState({ orderForm: updatedOrderForm });
    }
} export default ContactData;