//React Imports
import React from 'react';
//PropTypes Imports
import PropTypes from 'prop-types';
//CSS Imports
import cssClasses from './BurgerIngredient.module.css';


//Component Class =========================
class BurgerIngredient extends React.Component {

    render() { //Render JSX Code ===============
        let ingredient = null;

        //Dependent on the props.type, the used div and CSS Class will differ
        switch (this.props.type) {
            case ('bread-bottom'): {
                ingredient = <div className={cssClasses.BreadBottom}></div>;
                break;
            }

            case ('bread-top'): {
                ingredient = (
                    <div className={cssClasses.BreadTop}>
                        <div className={cssClasses.Seeds1}></div>
                        <div className={cssClasses.Seeds2}></div>
                    </div>
                );
                break;
            }

            case ('meat'): {
                ingredient = <div className={cssClasses.Meat}></div>
                break;
            }

            case ('cheese'): {
                ingredient = <div className={cssClasses.Cheese}></div>
                break;
            }

            case ('bacon'): {
                ingredient = <div className={cssClasses.Bacon}></div>
                break;
            }

            case ('salad'): {
                ingredient = <div className={cssClasses.Salad}></div>
                break;
            }

            default: {
                ingredient = null;
            }
        }

        //Return JXS
        return (
            ingredient
        );
    } //END OF: Render() =====

}; export default BurgerIngredient;



//Using Prop-Types, define prop definitions =========================
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};