import { useState } from "react";
import ChessGame from "./chess";
import { useColor, useFen } from "../state/fenState";
import socket from "../socket/socket";

export default function Game() {
    const { fen, changeFen } = useFen();
    const { color } = useColor();

    useState(() => {
        socket.on('opponent-move', (data) => {
            console.log('updating opponent move', data);
            changeFen(data);
        })
        return () => {
            socket.off('opponent-move');
        }
    }, []);

    return (
        <div>
            <ChessGame color={color} fen={fen}/>
        </div>
    )
}