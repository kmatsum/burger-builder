// React Imports
import React from 'react';
// React Router Imports
import { Route, Switch, withRouter } from 'react-router-dom';
// Redux Imports
import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';
// Layout Imports
import Layout from './containers/Layout/Layout';
// Container Imports
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

// App Component Class =========================
class App extends React.Component {
  
  componentDidMount() {
    // Try to grab Authentication Data from Local Storage
    this.props.onTryAutoSignin();
  }

  // Render JSX ----------
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

// Redux Connections

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignin: () => dispatch(authActions.authCheckState()),
  };
}

export default connect(null, mapDispatchToProps)(App);
// Apparently, sometimes "connect()" breaks routing (Fix):
// export default withRouter(connect(null, mapDispatchToProps)(App));