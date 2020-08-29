// Standard Imports
import React from 'react';
import cssClasses from './ContactData.module.css';
// Axios Instance Imports
import axiosOrder from '../../../axios-orders';
// Redux Imports
import { connect } from 'react-redux';
// Custom Component Imports
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

// Component Class =========================
class ContactData extends React.Component {
    // State ---------------
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
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLangth: 5,
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'cheapest', displayValue: 'Cheapest' },
                        { value: 'fastest', displayValue: 'Fastest' },
                    ]
                },
                value: 'cheapest',
                valid: true,
                validation: {}
            }
        }, // END OF: orderForm -----
        formIsValid: false,
        loading: false,
    } // END OF: State ----------



    render() {
        // Convert the 'orderForm' Object from the state to an array we can iterate through
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        // Create a form variable for Loading Spinner purposes
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        value={formElement.config.value}
                        changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
                    />
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        // If the component is still loading, display a Spinner
        if (this.state.loading) {
            form = <Spinner />;
        }

        // Return JSX ----------
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    } // END OF: render() ----------



    // FUNCTIONS =========================

    /*  Continue with the purchase: ---------------
     *      Process and Place Order
     */
    orderHandler = (event) => {
        // Prevents the default action for the event
        event.preventDefault();
        // Set 'Loading' state to true, enablind Loading Spinners
        this.setState({ loading: true });
        // Loop through all properties in 'this.state.orderForm' to create a new 'formData' object to send through HTTP Requests
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // Compile the current order to Send
        const sendThisBurger = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
        }
        // HTTP POST Request based on the Axios-Order Instance
        axiosOrder.post('/orders.json', sendThisBurger)
            .then((response) => {
                console.log(response);
                // Alert the user of successful POST
                alert('Burger Ordered');
                // Disable Loading Spinner
                this.setState({ loading: false });
                // Push to the homepage
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
                // Disable Loading Spinner
                this.setState({ loading: false });
            });
    }

    /*  Form Input Changed Handler: ---------------
     *      Handles the two-way binding of the form Inputs, updating the component state when
     *      an Input component detects a change.
     */
    inputChangedHandler = (event, inputIdentifier) => {
        /*  Since we have nested Objects, when we cop the 'orderForm' object from above, since it has nested objects (Objects are just pointers) 
         *  the pointers to the *Nested Object* would be pointing to the state's Object-memory-values. This creates a *Mutable* State, which is
         *  not how you should edit state. State must always be manipulated in an Immutable manner.
         *  To solve this, the VALUES of the nested components are copied and made into a new Object, then the outer-object is put together when
         *  the 'setState()' function is called. */

        // Create a copy of the orderForm state
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // Create the object for the nested portion of the 'orderForm' object are editing
        const updatedFormElement = {
            ...this.state.orderForm[inputIdentifier]
        };
        // Change the 'value' property for the Form Element
        updatedFormElement.value = event.target.value;
        // Set the 'valid' property for the Form Element
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // Input Element in question has been "touched"
        updatedFormElement.touched = true;
        // Update the 'inputIdentifier' key object with the 'updatedFormElement' object
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // Check entire Form Validity
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = (updatedOrderForm[inputIdentifier].valid && formIsValid)
        }

        // Set the state with the finalized OrderForm
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    } // END OF: inputChangeHandler() ----------



    /*  Validation Check on Inputs: ---------------
     *      Returns a Boolean value dependent on the validity of the passed 'value', dependent on
     *      the 'rules' that are passed into the function
     */
    checkValidity(value, rules) {
        let isValid = true;
        // Rules ----------
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        // END OF: Rules -----

        // Return validity result
        return isValid;
    } // END OF: checkValidity() ----------
}

// Redux Connections ===============
const mapStateToProps = (reduxState) => {
    return {
        ings: reduxState.ingredients,
        totalPrice: reduxState.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactData);