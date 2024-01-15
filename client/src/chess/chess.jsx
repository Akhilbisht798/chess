import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function ChessGame() {
    const [game, setGame] = useState(new Chess());

    function makeAMove(moves) {
      try {
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(moves);
        setGame(gameCopy);
        return result;
      } catch (err) {
        console.log("Wrong Move!");
      }
    }

    function onDrop(source, target, piece) {
      try {
        const promotion = piece[1].toLowerCase();
        const result = makeAMove({ from: source, to: target, promotion: promotion});
        if (result === null) return false;
        if (game.isGameOver()) {
          console.log("game over");
        }
        return true; 
      } catch (err) {
        console.log(err);
      }
    }
    
    return (
        <div className="w-2/6 h-2/3">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onDrop}
            />
        </div>
    );
}