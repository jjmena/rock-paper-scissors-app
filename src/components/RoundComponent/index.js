import React, { Component } from 'react';
import './RoundComponent.css';

class RoundComponent extends Component {

    state = {
        userId: this.props.userId,
        rounds: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + 'user', { method: 'POST' })
            .then(res => res.json())
            .then((data) => {
                this.setState({ userId: data.userId })
            })
            .catch(console.log)
    }

    playRound = () => {
        fetch(process.env.REACT_APP_API_HOST + 'round/user/' + this.state.userId, { method: 'POST' })
            .then(res => res.json())
            .then((data) => {
                data.translatedResult = this.translateResult(data.result)
                this.state.rounds.push(data)
                this.setState({ rounds: this.state.rounds })                
            })
            .catch(console.log)
    }

    resetRounds = () => {
        fetch(process.env.REACT_APP_API_HOST + 'round/user/' + this.state.userId, { method: 'DELETE' })
            .then((data) => {
                this.setState({ rounds: [] })
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
            <section>
                <div className="RoundComponent">
                    <h3>Games Played</h3>
                </div>
                <div className="RoundComponent-result-table">
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
                                return (
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
                <br />
                <button type="button" onClick={this.playRound} className="RoundComponent-button">Play Round</button>
                <button type="button" onClick={this.resetRounds} className="RoundComponent-button">Reset Game</button>
                <footer className="RoundComponent-footer">
                    <p>Session identifier: {this.state.userId}</p>
                </footer>
            </section>
        )
    }

}

export default RoundComponent;
