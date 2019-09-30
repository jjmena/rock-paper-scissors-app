import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    userId: null,
    rounds: [],
    stats: {draw: 0, winner1: 0, winner2: 0, total: 0}
  }
  
  componentDidMount() {
    fetch(process.env.REACT_APP_API_HOST + 'user', {method: 'POST'})
    .then(res => res.json())
    .then((data) => {
      this.setState({ userId: data.userId })
    })
    .catch(console.log)
    this.updateStats()  
    this.interval = setInterval(() => this.updateStats(), 1000);
  }

  playRound = () => {
    fetch(process.env.REACT_APP_API_HOST + 'round/user/' + this.state.userId, {method: 'POST'})    
    .then(res => res.json())
    .then((data) => {
      data.translatedResult = this.translateResult(data.result)
      this.state.rounds.push(data)
      this.setState({ rounds: this.state.rounds})
      this.updateStats()      
    })
    .catch(console.log)
  }

  resetRounds = () => {
    fetch(process.env.REACT_APP_API_HOST + 'round/user/' + this.state.userId, {method: 'DELETE'})        
    .then((data) => {
      this.setState({ rounds: []})
      this.updateStats()      
    })
    .catch(console.log)
  }

  updateStats = () => {
    fetch(process.env.REACT_APP_API_HOST + 'stats', {method: 'GET'})    
    .then(res => res.json())
    .then((data) => {
      this.setState({ stats: {draw: data.DRAW, winner1: data.WINNER_PLAYER1, winner2: data.WINNER_PLAYER2, total: data.DRAW + data.WINNER_PLAYER1 + data.WINNER_PLAYER2}})      
    })
    .catch(console.log)
  }

  translateResult = (r) => {    
    if (r === 'WINNER_PLAYER1') return "Player 1 wins"
    if (r === 'WINNER_PLAYER2') return "Player 2 wins"
    return "Draw game"
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h2>Welcome to Paper, Rock, Scissor Game</h2>          
        </header>
        <section>
          <h3>Game Statistics</h3>
          <div className="result-table">
            <table>
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
          <h3>Games Played</h3>
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>Player 1</th>
                  <th>Player 2</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>                
              {this.state.rounds.map(function (value, index) {             
                return(           
                      <tr>
                          <td>{value.firstPlayerOption}</td>
                          <td>{value.secondPlayerOption}</td>
                          <td>{value.translatedResult}</td>
                      </tr>
                      )                          
                    })}                
              </tbody>
            </table>            
          </div>
          <br/>
          <button type="button" onClick={this.playRound} className="button">Play Round</button>
          <button type="button" onClick={this.resetRounds} className="button">Reset Game</button>
        </section>    
        <footer className="footer">
          <p>Session identifier: {this.state.userId}</p>          
        </footer>    
      </div>
    );
  }
}

export default App;
