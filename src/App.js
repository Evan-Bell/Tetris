import React from 'react';
import { useState, useEffect } from 'react';
import StylizedBoardDisplay from "./BoardDisplay"
import ControlsDisplay from './Controls'
import Board from './game'
import useKeyPress from './useKeyPress'

const width = 10;
const height = 24; //playable height is 20
var today = new Date();
var gameBoard = new Board(width, height);
gameBoard.start_drop()

function App() {
    const [game_board, setBoard] = useState(gameBoard.board)
    const [time, setTime] = useState(Date.now());

    onload(() => {
        gameBoard.stop_drop()
        alert('Press "OK" to be given rules');
        alert("The 'A' and 'D' keys shift the piece sideways. The 'W' key rotates the active piece. The 'S' key performs a single drop. The Space Bar performs a full piece drop. The 'H' key will swap with the piece in the HOLD slot. You can view both the HOLD piece and the NEXT pieces up above. The piece will drop automatically periodically, and the interval will decrease as score increases. Press the '-' key to pause the game, and the '+' key to resume. Press Ok here to start the game.");
        gameBoard.start_drop()
    });

    useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 50);
    return () => {
        const update_board = async () => {
            const data = await setBoard(gameBoard.board);
          }
        update_board()
        clearInterval(interval);
    };
    }, []);

    useKeyPress(key => {
        console.log(gameBoard.interval)
        console.log(key)
        switch(key) {
            case 'a': 
                var make_move = async () => {
                    var data = await gameBoard.move_left();
                }
                make_move();
                break;

            case 'd': 
                var make_move = async () => {
                    var data = await gameBoard.move_right();
                }
                make_move();
                break;

            case 's': 
                var make_move = async () => {
                    var data = await gameBoard.move_drop();
                }
                make_move();
                break;

            case 'w': 
                var make_move = async () => {
                    var data = await gameBoard.rotate_piece();
                }
                make_move();
                break;

            case 'h':
                var make_move = async () => {
                    var data = await gameBoard.move_hold_swap();
                }
                make_move();
                break;

            case '-':
                var make_move = async () => {
                    var data = await gameBoard.stop_drop();
                }
                make_move();
                break;

            case '=':
                var make_move = async () => {
                    const data = await gameBoard.start_drop();
                }
                make_move();
                break;

            case ' ':
                var make_move = async () => {
                    const data = await gameBoard.hard_drop();
                }
                make_move();
                break;
        };
        const update_board = async () => {
            const data = await setBoard(gameBoard.board);
          }
        update_board()
    });

    return (
        <div className="TetrisGame">
            <ControlsDisplay inputboard={gameBoard}/>
            <StylizedBoardDisplay inputboard={game_board} inputheight={height} inputwidth={width}/>
        </div>
    );
}

export default App;