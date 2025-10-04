import React, { useEffect, useRef } from 'react';
import Message from './Message';
import './ChatWindow.css';

function ChatWindow({ initialMessages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [initialMessages]);

  return (
    <div className="chat-window">
      {initialMessages.map((msg) => (
        <Message 
          key={msg.id} 
          user={msg.user} 
          content={msg.content} 
          timestamp={msg.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;