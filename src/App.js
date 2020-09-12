// React Imports
import React from 'react';
// React Router Imports
import { Route, Switch, Redirect, } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
// Higher Order Component Imports
import asyncComponent from './hoc/asyncComponent';
// Layout Imports
import Layout from './containers/Layout/Layout';
// Container Imports
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// Lazy Loaded Components
const asyncOrders = asyncComponent(() => { // (Only for [< React 16.6]) Using the asyncComponent() HoC we created, Lazy Load the component
  return import('./containers/Orders/Orders');
});
const asyncCheckout = asyncComponent(() => { // (Only for [< React 16.6]) Using the asyncComponent() HoC we created, Lazy Load the component
  return import('./containers/Checkout/Checkout');
});
// const Checkout = React.lazy(() => {
//   return import('./containers/Checkout/Checkout')
// });



// App Component Class =========================
class App extends React.Component {

  componentDidMount() {
    // Try to grab Authentication Data from Local Storage
    this.props.onTryAutoSignin();
  }

  // Render JSX ----------
  render() {
    /* --- GUARDS ---
     *  Guards help us to only allow access to certain places under a certain condidtion
     *  In this case, the available routes changes based on if you are authenticated or not
     */
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route
            path="/checkout"
            render={() => (
              /* Since we want to use React.lazy() to lazy load, we need to use the
               * React.Suspense component to be able to render asynchronously
              <React.Suspense fallback={<div>Loading...</div>}>
                {withRouter(<Checkout />)}
              </React.Suspense>
            )} /> */}
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route exact path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

// Redux Connections

const mapStateToProps = (reduxState) => {
  return {
    isAuthenticated: reduxState.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignin: () => dispatch(authActions.authCheckState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// Apparently, sometimes "connect()" breaks routing (Fix):
// export default withRouter(connect(null, mapDispatchToProps)(App));