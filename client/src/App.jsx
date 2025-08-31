import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
const socket = io.connect(import.meta.env.VITE_SERVER_URL);

const App = () => {
  const [sndMessage, setSndMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [room, setRoom] = useState('');
  const sendMessage = () => {
    socket.emit("send_message", { message: sndMessage, room });
  }

  const joinRoom = () => {
    socket.emit("join_room", {room});
  }
  useEffect(() => {
    const handleMessage = (data) => {
      setReceivedMessage((prevMessages) => [...prevMessages, data.message]);
    };

    socket.on("receive_message", handleMessage);
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [])

  return (
    <div>
      <div>
        <input type="text" name="room" id="room" placeholder='Enter room no...' onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <input placeholder='Enter your message...' onChange={(e) => {
        setSndMessage(e.target.value)
      }} />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h1>Received Message</h1>
        <ul>
          {
            receivedMessage.map((message, index) => (
              <li key={index}>{message}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App