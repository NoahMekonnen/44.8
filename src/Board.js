import React, { useState } from "react";
import Row from "./Row";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 6, ncols = 6, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      initialBoard.push(Array.from({ length: ncols }))
      for (let j = 0; j < ncols; j++) {
        initialBoard[i][j] = Math.random() < chanceLightStartsOn ? true : false
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let ele of row) {
        if (ele == true) return false
      }
    }
    return true
  }

  function flipCellsAround(coord) {
  
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y - 1, x, newBoard)
      flipCell(y, x - 1, newBoard)
      flipCell(y + 1, x, newBoard)
      flipCell(y, x + 1, newBoard)

      console.log(newBoard,"newBoard")

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()){
    return (<div>
      You have won!
    </div>)
  }
  // make table board
  // TODO
  return (<table>
    <tbody>
      {console.log(board,"oldBoard")}
    {board.map((row,i) => <Row key={`${i}`} arr={row} flipCellsAround={flipCellsAround} y={i}/>)}
    </tbody>
  </table>)
}

export default Board;
