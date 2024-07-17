// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import ProductDetails from './ProductList'; // Example: Corrected to './ProductList' assuming that's the correct file
import NotFound from './NotFound'; // Ensure this matches the filename and path

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route component={NotFound} /> {/* Ensure this matches the imported NotFound component */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
