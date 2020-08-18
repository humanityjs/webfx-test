import * as React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Header from './components/Header';
import Stages from './components/stages/Stages';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <Header />
        <Stages />
      </div>
    );
  }
}

export default hot(module)(App);
