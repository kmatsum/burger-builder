// Standard Imports
import React from 'react';
import cssClasses from './Auth.module.css';
// Redux Imports
import { connect } from 'react-redux';
import * as actions from '../../store/actions/reduxActionIndex';
// Custom Component Imports
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';



// Component Class =========================
class Auth extends React.Component {
    // Component State ----------
    state = {
        controls: {
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
                    isEmail: true,
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        },
    }

    // Render JSX ----------
    render() {
        // Convert the 'controls' Object from the state to an array we can iterate through
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        // Map Input components to the "Controls" of this Container
        let form = formElementsArray.map((formElement) => (
            <Input
                className={cssClasses.Input}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}
                changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
            />
        ));

        // Return JSX ----------
        return (
            <div className={cssClasses.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">Login</Button>
                </form>
            </div>
        );
    }



    // Functions =========================

    /*  Form Submit Handler: ---------------
     *      Handles the event of when the Login form is submitted, calling on the Redux.Auth of our application
     */
    submitHandler = (event) => {
        // Prevent the default action of the event (Form Submission in this case...)
        event.preventDefault();

        // Call the Redux Dispatch action
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
    } // END OF: submitHandler() ----------

    /*  Form Input Changed Handler: ---------------
     *      Handles the two-way binding of the form Inputs, updating the component state when
     *      an Input component detects a change.
     */
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                value: event.target.value,
            }
        };

        // Set the state with the finalized OrderForm
        this.setState({ controls: updatedControls, });
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



// Redux Connectors ===============

// const mapStateToProps ...

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => dispatch(actions.auth(email, password)),
    };
};

// Connect Redux to this Component at export
export default connect(null, mapDispatchToProps)(Auth);