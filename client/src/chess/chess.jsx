import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import socket from "../socket/socket";
import { useRoom } from "../state/fenState";
import whiteKing from '../assets/whiteKing.png';
import blackKing from '../assets/blackKing.png';

export default function ChessGame({ fen, color }) {
    const [game, setGame] = useState(new Chess(fen));
    const { room } = useRoom();

    function makeAMove(moves) {
      try {
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(moves);
        socket.emit('move-made', {fen: gameCopy.fen(), room: room });
        setGame(gameCopy);
        return result;
      } catch (err) {
        console.log("Wrong Move!");
      }
    }

    function onDrop(source, target, piece) {
      try {
        const promotion = piece[1].toLowerCase();
        if (game.turn() !== color) {
          return false;
        }
        
        const result = makeAMove({ from: source, to: target, promotion: promotion});
        if (result === null) return false;
        return true; 
      } catch (err) {
        console.log(err);
      }
    }
    const kingImage = game.turn() === 'b' ? blackKing : whiteKing;

    return (
      <div>
        <div className="w-2/6 h-2/3">
          <Chessboard 
            position={game.fen()} 
            onPieceDrop={onDrop}
            orientation={color === 'w' ? 'white' : 'black'}
          />
        </div>

        <div className="flex items-center gap-6">
          <p className="text-xl font-bold">Current Turn - </p>
          <img src={kingImage} alt="king" className="w-16 h-16"/>
        </div>
      </div>
    );
}