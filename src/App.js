//React Imports
import React from 'react';
//Layout Imports
import Layout from './components/Layout/Layout';

//Component Function =========================
class App extends React.Component {
  //Render JSX ===============
  render() {
    return (
      <div>
        <Layout>
          <p>This is the Burger Builder Web Application</p>
        </Layout>
      </div>
    );
  }
} export default App;