import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Paper, Rock, Scissor Game</h3>
        </header>
        <section>
          <div class="App-result-table">
            <table>
              <thead>
                <tr>
                  <th>Player 1 Option</th>
                  <th>Player 2 Option</th>
                  <th>Game Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ROCK</td>
                  <td>ROCK</td>
                  <td>DRAW</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button">Play Round</button>
          <button type="button">Reset Game</button>
        </section>        
      </div>
    );
  }
}

export default App;
