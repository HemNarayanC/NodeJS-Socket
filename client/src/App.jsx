import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
const socket = io.connect(import.meta.env.VITE_SERVER_URL);

const App = () => {
  const [sndMessage, setSndMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {message: sndMessage});
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    })
  }, [socket])

  return (
    <div>
      <input placeholder='Enter your message...' onChange={(e) => {
        setSndMessage(e.target.value)
      }}/>
      <button onClick={sendMessage}>Send</button>
      <div>
        <h1>Received Message</h1>
      </div>
    </div>
  )
}

export default App