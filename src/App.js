//React Imports
import React from 'react';
//React Router Imports
import { Route, Switch } from 'react-router-dom';
//Layout Imports
import Layout from './containers/Layout/Layout';
//Container Imports
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

//App Component Class =========================
class App extends React.Component {
  //Render JSX ----------
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
} export default App;