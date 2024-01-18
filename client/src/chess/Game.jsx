import { useEffect } from "react";
import ChessGame from "./chess";
import { useColor, useFen, useRoom } from "../state/fenState";
import socket from "../socket/socket";
import whiteKing from '../assets/whiteKing.png';
import blackKing from '../assets/blackKing.png';

export default function Game() {
    const { fen, changeFen } = useFen();
    const { color } = useColor();
    const { room } = useRoom();

    useEffect(() => {
        socket.on('opponent-move', (data) => {
            console.log('updating opponent move', data);
            changeFen(data);
        })
        return () => {
            socket.off('opponent-move');
        }
    }, [changeFen, fen]);

    const kingImage = color === 'b' ? blackKing : whiteKing;

    return (
        <div className="m-10 flex gap-6 flex-col">
            <p className="text-xl font-bold ">Room - <span className="underline text-blue-700">{room}</span></p>
            <div className="flex items-center gap-6">
                <p className="text-xl font-bold ">You - </p>
                <img src={kingImage} alt="king" className="w-16 h-16"/>
            </div>
            <ChessGame key={fen} color={color} fen={fen}/>
        </div>
    )
}