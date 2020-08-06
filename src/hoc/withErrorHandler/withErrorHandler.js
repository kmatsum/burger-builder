//Standard Imports
import React from 'react';
//Custom Component Imports
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

//Higher Order Component Wrapping Function =========================
const withErrorHandler = (WrappedComponent, axios) => {
    //Return Anonymous Component ---------------
    return (
        class extends React.Component {
            //Error State -----
            state = {
                error: null,
            }

            /*  When the Component is instantiated, create Axios Interceptors on the Axios instance
             *  that is targetted by the HoC in order to create Request and Response interceptors.
             *  These interceptors will check for any erros from the HTTP Requests and update the Error Modal
             *  accordingly with the information presented */
            componentWillMount() {
                this.requestInterceptor = axios.interceptors.request.use(
                    (request) => {
                        this.setState({ error: null });
                        return (request);
                    }
                );
                this.responseInterceptor = axios.interceptors.response.use(
                    (response) => response,
                    (error) => {
                        this.setState({ error: error });
                    }
                );
            }

            //Render Component ---------------
            render() {
                //Return JSX -----
                return (
                    <Auxiliary>
                        <Modal
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}
                        >
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Auxiliary>
                );
            }
            

            /*  When the withErrorHandler Component is no longer needed, the Axios Interceptors are ejected
             *  to reduce memory leaks that may happen. */
            componentWillUnmount() {
                axios.interceptors.request.eject(this.requestInterceptor);
                axios.interceptors.response.eject(this.responseInterceptor);
            }



            //FUNCTIONS =========================

            /*  Confirm Error: ---------------
            *       Set the error state to null, essentially closing the Error Modal
            */
            errorConfirmedHandler = () => {
                this.setState({ error: null });
            }
        }
    );
}; export default withErrorHandler;