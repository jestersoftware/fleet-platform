import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExampleAnimation from './components/example/animation/example-animation'
import ExampleOrgUnit from './components/example/data/example-orgunit'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Using react transition group + animejs
        </p>
        <div>
          <ExampleAnimation />
        </div>
        <div>
          <ExampleOrgUnit />
        </div>
      </div>
    );
  }
}

export default App;
