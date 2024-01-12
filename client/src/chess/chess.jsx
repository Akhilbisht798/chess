import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessGame() {
    function makeAMove() {}
    
    return (
        <div className="w-2/6 h-2/3">
            <Chessboard id="board" />
        </div>
    )

}