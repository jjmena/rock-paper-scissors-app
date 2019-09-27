import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    userId: null,
    rounds: []
  }

  componentDidMount() {    
    fetch('http://localhost:8080/user', {method: 'POST'})
    .then(res => res.json())
    .then((data) => {
      this.setState({ userId: data.userId })
    })
    .catch(console.log)
  }

  playRound = () => {
    fetch('http://localhost:8080/round/user/' + this.state.userId, {method: 'POST'})    
    .then(res => res.json())
    .then((data) => {
      this.state.rounds.push(data)
      this.setState({ rounds: this.state.rounds})      
    })
    .catch(console.log)
  }

  resetRounds = () => {
    fetch('http://localhost:8080/round/user/' + this.state.userId, {method: 'DELETE'})        
    .then((data) => {
      this.setState({ rounds: []})      
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
          <div className="App-result-table">
            <table>
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
          <button type="button" onClick={this.playRound}>Play Round</button>
          <button type="button" onClick={this.resetRounds}>Reset Game</button>
        </section>        
      </div>
    );
  }
}

export default App;
