import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';
import Footer from './components/Footer';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        
        <Product />
        <Footer />
      </div>
    );
  }
}

export default App;
