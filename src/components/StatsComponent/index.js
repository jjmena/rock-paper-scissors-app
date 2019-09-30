import React, { Component } from 'react';
import './StatsComponent.css';

class StatsComponent extends Component {

    state = {
        stats: { draw: 0, winner1: 0, winner2: 0, total: 0 }
    }

    componentDidMount() {
        this.updateStats()
        this.interval = setInterval(() => this.updateStats(), 1000);
    }

    updateStats = () => {
        fetch(process.env.REACT_APP_API_HOST + 'stats', { method: 'GET' })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    stats: {
                        draw: data.DRAW,
                        winner1: data.WINNER_PLAYER1,
                        winner2: data.WINNER_PLAYER2,
                        total: data.DRAW + data.WINNER_PLAYER1 + data.WINNER_PLAYER2
                    }
                })
            })
            .catch(console.log)
    }

    render() {
        return (
            <section>
                <div className="StatsComponent">
                    <h3>Game Statistics</h3>
                </div>
                <div className="StatsComponent-result-table">
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
            </section>)
    }

}

export default StatsComponent;
