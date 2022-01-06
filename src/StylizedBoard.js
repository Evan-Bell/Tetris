import React from 'react';
import Board from "./game"


const width = 10;
const height = 24; //playable height is 20


var update_ContainerView = function(props) {
    
    //DISPLAYS THE BOARD IN A WAY THAT I CAN VISUALLY CONFIRM CHANGES
    let rows_ind = [];
    for (let row = 0; row < height; row++) {
      rows_ind.push(row);
    }

    let cols_ind = [];
    for (let col = 0; col < width+2; col++) {
      cols_ind.push(col);
    }


    let c = 'c'; //USED TO MAKE ID FOR EACH CELL 'C' FOLLOWED BY NUMBER
    let r = 'r';
    return (
        <div className="TetrisBoard">
            <tr className='TetrisRow'> 
            {cols_ind.map((col) => <td className='TetrisCell' id={c+'Border'}></td> )} 
            </tr>
        
            {rows_ind.map((row) => (
                <tr className='TetrisRow' id={r+row}> 
                    <td className='TetrisCell' id={c+'Border'}></td>
                    {game_board.board[row].map((col) => <td className='TetrisCell' id={c+col}></td> )} 
                    <td className='TetrisCell' id={c+'Border'}></td>
                </tr>
            ))}

            <tr className='TetrisRow'> 
            {cols_ind.map((col) => <td className='TetrisCell' id={c+'Border'}></td> )} 
            </tr>
        </div>
    );
}


export default class GameBoardStylized extends React.Component {
    constructor(props) {
      super(props);
      this.state = {updated_state: update_ContainerView()};
  
      // This binding is necessary to make `this` work in the callback
      this.update_board = this.update_board.bind(this);
      this.handleInput = this.handleInput.bind(this);

    }

    update_board() {
        this.setState( prevState => ( {updated_state: update_ContainerView()}));
    }

    componentDidMount(){
        this.Interval = setInterval(() => {
            this.update_board();
        }, 100);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    handleInput(event){ //MAKE THIS AUTOCLICK INSTEAD OF HAVING TO GO INTO TEXT BOX
        switch(event.key) {
            case 'ArrowLeft': 
              game_board.move_left();
              break;
            case 'ArrowRight': 
                game_board.move_right();
                break;
            case 'ArrowDown': 
                game_board.move_drop();
                break;
            case 'ArrowUp': 
                game_board.rotate_piece();
                break;
            case 'h':
                game_board.move_hold_swap();
                break;
            case '-':
                game_board.stop_drop();
                break;
            case '=':
                game_board.start_drop();
                break;
            case ' ':
                game_board.hard_drop();
                break;
        }

        this.update_board();
    }
  
    render() {
        return (
            <div onKeyDown={this.handleInput} className="TetrisGame">
                <input />
                <div className='score-display'>Score: {game_board.score}</div>
                <div className='level-display'>Level: {game_board.level}</div>
                <div className='hold-display'>Hold: {game_board.hold}</div>
                <div className='next-display'>Next: {game_board.next}</div>
                <div className='highscore-display'>Highscore: {game_board.highscore}</div>
                <div className='highlevel-display'>Highlevel: {game_board.highlevel}</div>
                <div className='droptime'>droptime: {game_board.droptime}</div>
                
                {this.state.updated_state}
                
            </div>
        );
    }
}


var game_board = new Board(width, height);
  
 //ADD TIME DROPS AND TIME DELAY
 //IMPROVE THE CSS/REACT/JS ASPECT OF SHOWING SO IT IS LESS LAGGY AND LOOKS BETTER
 // MAKE IT SO THE KEYPRESS IS APPLIED WHENEVER SOMEONE IS IN THE TETRIS WINDOW / MOUSE PRESSED IT
 //LEARN CSS FOR GOD SAKE