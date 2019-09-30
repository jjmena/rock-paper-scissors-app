import React, { Component } from 'react';
import StatsComponent from './components/StatsComponent';
import RoundComponent from './components/RoundComponent';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="header">
          <h2>Welcome to Paper, Rock, Scissor Game</h2>          
        </header>        
        <StatsComponent/>
        <br/>
        <RoundComponent/>                          
      </div>
    );
  }
}

export default App;
