// Import Action Types
import * as actionTypes from './actionTypes';
// Axios Instance Imports
import axiosOrder from '../../axios-orders';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};



export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};
export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};



export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
}



// Asynchronous Actions =========================

export const requestPurchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        // HTTP POST Request based on the Axios-Order Instance
        axiosOrder.post(`/orders.json?auth=${token}`, orderData)
            .then((response) => {
                // Alert the user of successful POST
                alert('Burger Ordered');
                // Redux: Send the Order data Information as well as update the 'loading' state
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                // Call Redux to set the Error Object, as well as update that the loading has finished
                dispatch(purchaseBurgerFailed(error));
            });
    }
}

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        // Use Axios to retrieve the Orders
        axiosOrder.get(`/orders.json?auth=${token}`)
            //Process the HTTP Response
            .then((response) => {
                //Loop through the HTTP Response Data and push them onto a new array
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        id: key,
                        ...response.data[key],
                    });
                }
                // Dispatch a Redux action to update the Orders Redux Store
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            //Catch any errors the HTTP Request could have thrown
            .catch((error) => {
                dispatch(fetchOrderFail(error));
            });



        /*  This can also be done using a simple fetch() JavaScript requests. However, the header will
         *  need to be configured manually, but in this case, since it is just a GET Request, the
         *  normal fetch() method is used
         */
        // fetch('https://react-burger-builder-de78d.firebaseio.com/orders.json')
        //     .then((response) => {
        //         //If the response HTTP Code is NOT 'ok', throw an error
        //         if (!response.ok) {
        //             throw Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        //     //Parse the response data
        //     .then((data) => {
        //         // Loop through the HTTP Response Data and push them onto a new array
        //         const fetchedOrders = [];
        //         for (let key in data) {
        //             fetchedOrders.push({
        //                 id: key,
        //                 ...data[key],
        //             });
        //         }
        //         //Set the new state
        //         this.setState({
        //             orders: fetchedOrders,
        //             loading: false
        //         });
        //     })
        //     //Catch an error
        //     .catch((error) => {
        //         this.setState({
        //             loading: false
        //         });
        //     });
    }
}

