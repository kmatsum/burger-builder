// Standard Imports
import React from 'react';
// Higher Order Component Imports
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// Axios Instance Imports
import axiosOrder from '../../axios-orders';
// Redux Imports
import { connect } from 'react-redux';
import * as actions from '../../store/actions/reduxActionIndex';
// Custom Component Imports
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

// Component Class =========================
class Orders extends React.Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let mainContent = <Spinner />;
        if (!this.props.loading) {
            mainContent = (
                this.props.orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    );
                })
            )
        }

        //Return JSX ----------
        return (
            <div>
                {mainContent}
            </div>
        );
    }
}

// Redux Connections ===============

const mapStateToProps = (reduxState) => {
    return {
        orders: reduxState.order.orders,
        loading: reduxState.order.loading,
        token: reduxState.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrder));