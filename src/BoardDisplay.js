import React from 'react';


export default function StylizedBoardDisplay(props) {

    var game_board = props.inputboard;
    var width = props.inputwidth;
    var height = props.inputheight;
    
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