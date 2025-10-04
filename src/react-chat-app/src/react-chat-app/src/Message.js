import React from 'react';
import Message from './Message';
import './App.css'; // You'll create this for overall app styling

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Chat App</h1>
      <div className="messages-container">
        <Message user="Me" content="Hello!" timestamp="10:00 AM" />
        <Message user="Alice" content="Hi there!" timestamp="10:01 AM" />
      </div>
    </div>
  );
}

export default App;