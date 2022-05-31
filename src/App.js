import React from 'react'
import { useState, useEffect } from 'react';
import StylizedBoardDisplay from "./BoardDisplay"
import ControlsDisplay from './Controls';
import Board from "./game"
import useKeyPress from './useKeyPress';




const width = 10;
const height = 24; //playable height is 20


var gameBoard = new Board(width, height);


function App() {

    const [game_board, update_board] = useState[gameBoard.board]

    useEffect(() => {
        this.timerID = setInterval(
            () => update_board(gameBoard.board),
            100
          );
      }, gameBoard.board)

    useKeyPress(key => {
        switch(key) {
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
        };
    });

    return(
            <div className="TetrisGame">
                <ControlsDisplay inputboard={game_board}/>
                <StylizedBoardDisplay inputboard={game_board} inputheight={height} inputwidth={width}/>
            </div>
    )
}

export default App;