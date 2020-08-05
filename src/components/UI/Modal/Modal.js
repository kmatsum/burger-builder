//React Imports
import React from 'react';
import cssClasses from './Modal.module.css';
//Higher Order Component Imports
import Auxiliary from '../../../hoc/Auxiliary';
//UI Component Imports
import Backdrop from '../Backdrop/Backdrop';



//Component Class =========================
class Modal extends React.Component {

    //Should Component Update ===============
    shouldComponentUpdate(nextProps, nextState) {
        //Check if the 'show' props has been changed to determine if the Component needs to Update
        return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    }

    //Render Method ===============
    render() {
        //Return JSX Code ==========
        return (
            <Auxiliary>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={cssClasses.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
} export default Modal;