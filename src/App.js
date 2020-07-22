//React Imports
import React from 'react';
//Layout Imports
import Layout from './components/Layout/Layout';
//Container Imports
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

//App Component Class =========================
class App extends React.Component {
  //Render JSX ===============
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
} export default App;