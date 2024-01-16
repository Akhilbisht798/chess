import { useState } from "react";
import { useColor, useRoom } from "../state/fenState";

export default function Rooms() {
    const { changeRoom } = useRoom();
    const { changeColor } = useColor();
    const [room, setRoom] = useState('');

    function onCreateRoom() {
        changeColor('w'); 
        changeRoom(room)
    }

    function onJoinRoom() {
        changeColor('b'); 
        changeRoom(room)
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