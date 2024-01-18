import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useColor, useRoom } from "../state/fenState";
import socket from "../socket/socket";

export default function Rooms() {
    const { changeRoom } = useRoom();
    const { changeColor } = useColor();
    const [room, setRoom] = useState('');

    function onCreateRoom() {
        changeColor('w'); 
        const roomUuid = uuidv4();
        socket.emit('room', roomUuid);
        changeRoom(roomUuid);
    }

    function onJoinRoom() {
        changeColor('b'); 
        socket.emit('room', room);
        changeRoom(room);
    }

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">

            <div className="mb-4">
                <p className="text-lg font-semibold">Create A Room</p>
                <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={onCreateRoom}
                >
                    Create
                </button>
            </div>

            <div>
                <p className="text-lg font-semibold">Or Join A Room</p>
                <input
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Enter Room to Join"
                    onChange={(e) => setRoom(e.currentTarget.value)}
                />
                <button
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
                    onClick={onJoinRoom}
                >
                    Join
                </button>
            </div>
        </div>
    )
}