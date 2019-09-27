import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    userId: null,
    rounds: [],
    stats: {draw: 0, winner1: 0, winner2: 0, total: 0}
  }

  componentDidMount() {    
    fetch('http://localhost:8080/user', {method: 'POST'})
    .then(res => res.json())
    .then((data) => {
      this.setState({ userId: data.userId })
    })
    .catch(console.log)
    this.updateStats()  
    this.interval = setInterval(() => this.updateStats(), 1000);
  }

  playRound = () => {
    fetch('http://localhost:8080/round/user/' + this.state.userId, {method: 'POST'})    
    .then(res => res.json())
    .then((data) => {
      this.state.rounds.push(data)
      this.setState({ rounds: this.state.rounds})
      this.updateStats()      
    })
    .catch(console.log)
  }

  resetRounds = () => {
    fetch('http://localhost:8080/round/user/' + this.state.userId, {method: 'DELETE'})        
    .then((data) => {
      this.setState({ rounds: []})
      this.updateStats()      
    })
    .catch(console.log)
  }

  updateStats = () => {
    fetch('http://localhost:8080/stats', {method: 'GET'})    
    .then(res => res.json())
    .then((data) => {
      this.setState({ stats: {draw: data.DRAW, winner1: data.WINNER_PLAYER1, winner2: data.WINNER_PLAYER2, total: data.DRAW + data.WINNER_PLAYER1 + data.WINNER_PLAYER2}})      
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Paper, Rock, Scissor Game. Welcome {this.state.userId}</h3>          
        </header>
        <section>
          <div>
            <table align="center">
              <thead>
                <tr>
                  <th>Total Rounds</th>
                  <th>Won by Player 1</th>
                  <th>Won by Player 2</th>
                  <th>Draw rounds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.stats.total}</td>
                  <td>{this.state.stats.winner1}</td>
                  <td>{this.state.stats.winner2}</td>
                  <td>{this.state.stats.draw}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <br/>
        <section>
          <div className="App-result-table">
            <table align="center">
              <thead>
                <tr>
                  <th>Player 1 Option</th>
                  <th>Player 2 Option</th>
                  <th>Game Result</th>
                </tr>
              </thead>
              <tbody>                
              {this.state.rounds.map(function (value, index) {             
                return(           
                      <tr>
                          <td>{value.firstPlayerOption}</td>
                          <td>{value.secondPlayerOption}</td>
                          <td>{value.result}</td>
                      </tr>
                      )                          
                    })}                
              </tbody>
            </table>            
          </div>
          <br/>
          <button type="button" onClick={this.playRound}>Play Round</button>
          <button type="button" onClick={this.resetRounds}>Reset Game</button>
        </section>        
      </div>
    );
  }
}

export default App;
