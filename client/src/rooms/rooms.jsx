import { useState } from "react";
import { useColor, useRoom } from "../state/fenState";
import socket from "../socket/socket";

export default function Rooms() {
    const { changeRoom } = useRoom();
    const { changeColor } = useColor();
    const [room, setRoom] = useState('');

    function onCreateRoom() {
        changeColor('w'); 
        changeRoom(room)
        socket.emit('room', room);
    }

    function onJoinRoom() {
        changeColor('b'); 
        changeRoom(room);
        socket.emit('room', room);
    }

    return (
        <div>
            <input onChange={(e) => setRoom(e.currentTarget.value)} />
            <div>
                <p>Create A room</p>
                <button onClick={onCreateRoom}>Create</button>
            </div>
            <div>
                <p>Or Join A Room</p>
                <button onClick={onJoinRoom}>Join</button>
            </div>
        </div>
    )
}