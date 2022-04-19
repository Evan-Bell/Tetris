import React, { useEffect, useRef, useState } from 'react'
import StylizedBoardDisplay from "./BoardDisplay"
import ControlsDisplay from './Controls';
import Board from "./game"



const width = 10;
const height = 24; //playable height is 20


var gameBoard = new Board(width, height);
  
 //ADD TIME DROPS AND TIME DELAY
 //IMPROVE THE CSS/REACT/JS ASPECT OF SHOWING SO IT IS LESS LAGGY AND LOOKS BETTER
 // MAKE IT SO THE KEYPRESS IS APPLIED WHENEVER SOMEONE IS IN THE TETRIS WINDOW / MOUSE PRESSED IT
 //LEARN CSS FOR GOD SAKE


 export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_board: gameBoard,
            score: {},
            level:{},
            hold: {},
            next:{},
            highscore:{},
            highlevel: {},
            droptime: {},
            interval: {}
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.update_board(),
          100
        );
      }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    update_board() {
        this.setState({
            game_board: gameBoard
        });
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
        }
    }

    handleInput(event){ //MAKE THIS AUTOCLICK INSTEAD OF HAVING TO GO INTO TEXT BOX
        switch(event.key) {
            case 'ArrowLeft': 
                gameBoard.move_left();
              break;
            case 'ArrowRight': 
                gameBoard.move_right();
                break;
            case 'ArrowDown': 
                gameBoard.move_drop();
                break;
            case 'ArrowUp': 
                gameBoard.rotate_piece();
                break;
            case 'h':
                gameBoard.move_hold_swap();
                break;
            case '-':
                gameBoard.stop_drop();
                break;
            case '=':
                gameBoard.start_drop();
                break;
            case ' ':
                gameBoard.hard_drop();
                break;
        }
    }
    
    
    render() {
        return (
            <div className="TetrisGame">
                <h2>{`Interval: ${this.interval}`}</h2>
                <input type='text' onKeyDown={this.handleInput} onChange={e => this.update_board()}/>
                <input type="range" min="1" value={this.interval} max="100" onChange={e => this.update_board()}/>
                <ControlsDisplay inputboard={this.state.game_board}/>
                <StylizedBoardDisplay inputboard={this.state.game_board} inputheight={height} inputwidth={width}/>
            </div>
        );
     }
}