import React, { useEffect, useState } from "react";
import socket from "../socket/socket";
import { useRoom } from "../state/fenState";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { room } = useRoom();

  function sendChat() {
    socket.emit("send-chat", { room: room, chat: currentChat });
    setCurrentChat("");
  }

  useEffect(() => {
    socket.on("receive-chat", (data) => {
      setChatHistory((prevHistory) => [...prevHistory, data]);
    });
    return () => {
      socket.off("receive-chat");
    };
  }, []);

  return (
    <div className="">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className="chat-message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          onChange={(e) => setCurrentChat(e.target.value)}
          value={currentChat}
          placeholder="Type a Message"
        />
        <button onClick={sendChat}>Send</button>
      </div>
    </div>
  );
}
