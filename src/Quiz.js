import React, { Component } from 'react';
import QuizOption from './QuizOption';
import classNames from 'classnames';

class Quiz extends Component {
    constructor(props) {
        super(props);
        let riddle = this.playGame();
        let correct = false;
        let gameOver = false;

        this.state = {
            riddle,
            correct,
            gameOver,
            time: 5,
            point: 0
        }

        this.renderOptions = this.renderOptions.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    componentDidMount() {
        this.checkTime();
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateRandomOption(ansewr) {
        let result = ansewr;
        let resultArray = [];

        for (let i = 1; i < 4; i++) {
            let addSub = this.randomNumber(0, 1);
            if (addSub === 1) {
                let tem = result + i;
                resultArray.push(tem);
            } else {
                let tem = result - i;
                resultArray.push(tem);
            }
        }

        return resultArray;
    }

    playGame() {
        let field1 = this.randomNumber(20, 50);
        let field2 = this.randomNumber(50, 99);
        let ansewr = field1 + field2;
        let resultArray = this.generateRandomOption(ansewr);
        resultArray.push(ansewr);
        resultArray.sort();
        let abc = {
            resultArray: resultArray,
            field1: field1,
            field2: field2,
            ansewr: ansewr
        };

        // console.log(ansewr);

        if (this.state && this.state.gameOver) {
            this.setState({ riddle: abc });
        } else {
            return abc;
        }
    }

    checkResults(option) {
        // console.log(option);
        if (this.state.riddle.ansewr === option) {
            // console.log('correct');
            this.setState({ correct: true, gameOver: true, point: this.state.point + 1 });
        } else {
            // console.log('game over');
            this.setState({ correct: false, gameOver: true, time: 0 });
        }
    }
    renderOptions() {
        return (
            <div className="options">
                {this.state.riddle.resultArray.map((val, index) =>
                    <QuizOption key={index} option={val} checkResults={(option) => this.checkResults(option)} />
                )}
            </div>
        );
    }

    renderMessages() {
        if (this.state.correct) {
            // return (
            //     <h3>Good Job !</h3>
            // );
            this.setState({ correct: false, gameOver: false, time: 5 });
            this.playGame();
        } else {
            return (
                <h3>Hit the button below to Play Again</h3>
            );
        }
    }

    playAgain() {
        this.setState({ correct: false, gameOver: false, time: 5, point: 0 });
        this.playGame();
    }

    checkTime() {
        setInterval(() => {
            if (this.state.time > 0) {
                let time = this.state.time - 1;
                this.setState({ time });
            } else {
                this.setState({ correct: false, gameOver: true });
            }
        }, 1000);
    }

    render() {
        return (
            <div className="quiz">
                <h1>Quiz</h1>
                <div className="quiz-content">
                    <p className="question">
                        What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span> ?
                    </p>
                    {this.renderOptions()}
                </div>
                <div className={classNames('after', { 'hide': !this.state.gameOver }, { 'wrong animated zoomInDown': !this.state.correct }, { 'correct animated zoomInDown': this.state.correct })} >
                    {this.renderMessages()}
                </div>

                <div className="play">
                    <a className="button" onClick={this.playAgain}>Play Again</a>
                </div>
                <div className="checkTime">Time: {this.state.time}</div>
                <div className="point">Point: {this.state.point}</div>
            </div>
        );
    }
}

export default Quiz;