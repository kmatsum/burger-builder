//Standard Imports
import React from 'react';
//Higher Order Component Imports
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//Axios Instance Imports
import axiosOrder from '../../axios-orders';
//Custom Component Imports
import Order from '../../components/Order/Order';

//Component Class =========================
class Orders extends React.Component {
    //State ---------------
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        // Use Axios to retrieve the Orders
        axiosOrder.get('/orders.json')
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
                //Set the new state
                this.setState({
                    orders: fetchedOrders,
                    loading: false
                });
            })
            //Catch any errors the HTTP Request could have thrown
            .catch((error) => {
                //Set the state
                this.setState({
                    loading: false
                });
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

    render() {
        //Return JSX ----------
        return (
            <div>
                {this.state.orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    );
                })}
            </div>
        );
    }
} export default withErrorHandler(Orders, axiosOrder);