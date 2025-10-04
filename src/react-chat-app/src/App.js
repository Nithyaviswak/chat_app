import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import './App.css'; // You'll create this for basic layout/styling

function App() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', content: 'Welcome to the chat! Send a message below.', timestamp: new Date().toLocaleTimeString() },
  ]);

  // Function to handle a new message submission
  const sendMessage = (messageContent) => {
    if (messageContent.trim() === '') return; // Don't send empty messages

    const newMessage = {
      id: messages.length + 1,
      user: 'Me', // We'll hardcode 'Me' for now
      content: messageContent,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add the new message to the array
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="app-container">
      <h1>Simple React Chat</h1>
      <div className="chat-box">
        {/* The window to display all messages */}
        <ChatWindow messages={messages} />

        {/* The input area to type and send messages */}
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;