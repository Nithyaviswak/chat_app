import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import './ChatWindow.css'; // You'll create this for styling

function ChatWindow({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  // Scrolls to the bottom of the chat window whenever the messages array changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <Message 
          key={msg.id} 
          user={msg.user} 
          content={msg.content} 
          timestamp={msg.timestamp}
        />
      ))}
      {/* Empty div used as a reference point for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Me', content: 'Hello!', timestamp: '10:00 AM' },
    { id: 2, user: 'Alice', content: 'Hi there!', timestamp: '10:01 AM' },
  ]);

  return (
    <div className="app-container">
      <h1 className="app-title">Chat App</h1>
      <ChatWindow initialMessages={messages} />
      {/* Add your message input and send logic here */}
    </div>
  );
}

export default App;

/* filepath: C:\Users\simle\OneDrive\Chat_APP\react-chat-app\src\ChatWindow.css */
.chat-window {
  height: 400px;
  overflow-y: auto;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius:8px;
  padding:16px;
  margin-bottom:16px;
}