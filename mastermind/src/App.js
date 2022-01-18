import React from "react";
import Move from "./move";

// Stateful Component
class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            secret: this.createSecret(3),
            level: 3,
            tries: 0,
            guess: 123,
            moves: [],
            counter: 60
        };
    }

    //region game logic methods
    createSecret = (level) => {
        let numbers = [this.createDigit(1, 9)];
        while (numbers.length < level) {
            let digit = this.createDigit(0, 9);
            if (!numbers.includes(digit))
                numbers.push(digit);
        }
        return numbers.reduce((number, digit) => 10 * number + digit, 0);
    }

    createDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    play = () => {
        let game = {...this.state}
        if (game.secret === game.guess) {
            game.level++;
            game.counter = 60;
            game.tries = 0;
            game.moves = []
            game.secret = this.createSecret(game.level);
        } else {
            game.tries++;
            let message = this.createMessage(game.guess, game.secret);
            game.moves.push(new Move(game.guess, message));
        }
        this.setState(game);
    }

    createMessage = (guess, secret) => {
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i = 0; i < guessAsString.length; ++i) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; ++j) {
                let s = secretAsString.charAt(j);
                if (s === g) {
                    if (i === j)
                        perfectMatch++;
                    else
                        partialMatch++;
                }
            }
        }
        if (perfectMatch === 0 && partialMatch === 0)
            return "No match";
        let message = "";
        if (partialMatch>0)
            message = `-${partialMatch}`;
        if (perfectMatch>0)
            message += `+${perfectMatch}`;
        return message;
    }

    countDown = () => {
        let game = {...this.state}
        if (game.counter <= 0) {
            game.counter = 60;
            game.tries = 0;
            game.moves = []
            game.secret = this.createSecret(game.level);
        } else {
            game.counter = game.counter - 1;
        }
        this.setState(game);
    }

    handleChange = (event) => {
        let game = {...this.state}
        game.guess = Number(event.target.value);
        this.setState(game);
    }

    componentDidMount() {
        setInterval(this.countDown, 1000);
    }
    //endregion

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Console</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label className="form-label" htmlFor="gamelevel">Game Level:</label>
                            <span id="gamelevel"
                                  className="badge alert-info">{this.state.level}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="tries">Tries:</label>
                            <span id="tries"
                                  className="badge alert-primary">{this.state.tries}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="counter">Counter:</label>
                            <span id="counter"
                                  className="badge alert-danger">{this.state.counter}</span>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="guess">Guess:</label>
                            <div className="input-group mb-3">
                                <input type="text"
                                       id="counter"
                                       value={this.state.guess}
                                       onChange={this.handleChange}
                                       className="form-control"></input>
                                <div className="input-group-append">
                                    <button onClick={this.play}
                                            className="btn btn-success">Play
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Moves</h3>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover table-striped table-responsive">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Guess</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.moves.map((move,index) =>
                                    <tr key={move.guess + index.toString()}>
                                        <td>{index+1}</td>
                                        <td>{move.guess}</td>
                                        <td>{move.message}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;