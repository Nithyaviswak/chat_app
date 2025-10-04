import React from 'react';
import './Message.css';

function Message({ user, content, timestamp }) {
  return (
    <div className={`message-container ${user === 'Me' ? 'my-message' : 'other-message'}`}>
      <div className="message-content">
        <span className="message-user">{user}:</span>
        <span className="message-text">{content}</span>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  );
}

export default Message;