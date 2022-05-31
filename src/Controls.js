import React from 'react';

export default function ControlsDisplay(props) {
    var gameBoard = props.inputboard
    return (
        <div className="TetrisControls">
            <div className='score-display'>Score: {gameBoard.score}</div>
            <div className='level-display'>Level: {gameBoard.level}</div>
            <div className='hold-display'>Hold: {gameBoard.hold}</div>
            <div className='next-display'>Next: {gameBoard.next}</div>
            <div className='highscore-display'>Highscore: {gameBoard.highscore}</div>
            <div className='highlevel-display'>Highlevel: {gameBoard.highlevel}</div>
            <div className='droptime'>droptime: {gameBoard.droptime}</div>
        </div>
    );
}

