import React from 'react';
import Board from "./game"

export default function ControlsDisplay(props) {
    var game_board = props.inputboard
    return (
        <div className="TetrisControls">
            <div className='score-display'>Score: {game_board.score}</div>
            <div className='level-display'>Level: {game_board.level}</div>
            <div className='hold-display'>Hold: {game_board.hold}</div>
            <div className='next-display'>Next: {game_board.next}</div>
            <div className='highscore-display'>Highscore: {game_board.highscore}</div>
            <div className='highlevel-display'>Highlevel: {game_board.highlevel}</div>
            <div className='droptime'>droptime: {game_board.droptime}</div>
        </div>
    );
}

