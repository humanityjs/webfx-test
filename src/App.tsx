import * as React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Header from './components/Header/Header';
import Stages from './components/stages/Stages';
import { AppProvider } from './context/app.context';

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <div className="">
          <Header />
          <Stages />
        </div>
      </AppProvider>
    );
  }
}

export default hot(module)(App);
