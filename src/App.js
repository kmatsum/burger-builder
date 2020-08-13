//React Imports
import React from 'react';
//Layout Imports
import Layout from './containers/Layout/Layout';
//Container Imports
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

//App Component Class =========================
class App extends React.Component {
  //Render JSX ===============
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
          <Checkout />
        </Layout>
      </div>
    );
  }
} export default App;