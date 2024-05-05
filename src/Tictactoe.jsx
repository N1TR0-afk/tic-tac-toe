import { useEffect, useState } from 'react';
import Square from './Square';

const Tictactoe = () => {
  const [squares, setSquares] = useState([null,null,null,null,null,null,null,null,null,]);
  const [turn, setTurn] = useState(true);
  const [history,setHistory] = useState([])
  const handleBoard = i => {
    if ( checkWinner() || squares[i] ) {
      return;
    }
    const nextSquares = new Array(...squares);
    if (turn) {
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O"
    }
    setHistory(history.concat([nextSquares.slice()]));
    setSquares(nextSquares);
    setTurn(!turn);
    console.log(i);
  };

  useEffect(()=>console.log(history),[history])

  let status = "";
  if (checkWinner()) {
    status = "Winner is " + checkWinner();
  }else{
    status = (turn ? "X" : "O")+"'s Turn";
  }


  function checkWinner(){
    const winningPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    const newWinningPatterns = winningPatterns.map(pattern => pattern.map(num => --num));
    for (let i = 0; i < newWinningPatterns.length; i++) {
      const [a, b, c] = newWinningPatterns[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a]+" wins");
        return squares[a];
      }
    }
    return null;
  }
  function rollBack(arr){
    let newArr = new Array(...arr);
    setSquares(newArr);
  }
  function RollBackButton({arr}){
    return(
    <button onClick={()=>rollBack(arr)}>
      Roll back to move {history.indexOf(arr)}
    </button>
    )
  }
  
  return (
    <div>
      <h1>{status}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleBoard(0)} />
        <Square value={squares[1]} onSquareClick={() => handleBoard(1)} />
        <Square value={squares[2]} onSquareClick={() => handleBoard(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleBoard(3)} />
        <Square value={squares[4]} onSquareClick={() => handleBoard(4)} />
        <Square value={squares[5]} onSquareClick={() => handleBoard(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleBoard(6)} />
        <Square value={squares[7]} onSquareClick={() => handleBoard(7)} />
        <Square value={squares[8]} onSquareClick={() => handleBoard(8)} />
      </div>
      {history.map(iarr => <RollBackButton key={history.indexOf(iarr)} arr={iarr} />)}
    </div>
  );
};


export default Tictactoe;
