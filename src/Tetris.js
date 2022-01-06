import React from 'react';
import GameBoardStylized from "./StylizedBoard"


export default class Tetris extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div className="TetrisGame">
                <GameBoardStylized />
            </div>
        );
    }
}