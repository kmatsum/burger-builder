//React Imports
import React from 'react';
import cssClasses from './Modal.module.css';
//Higher Order Component Imports
import Auxiliary from '../../../hoc/Auxiliary';
//UI Component Imports
import Backdrop from '../Backdrop/Backdrop';



//Component Function =========================
const modal = (props) => {

    //Return JSX Code ==========
    return (
        <Auxiliary>
            <Backdrop
                show={props.show}
                clicked={props.modalClosed}
            />
            <div
                className={cssClasses.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
}; export default modal;