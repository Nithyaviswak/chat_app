import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import './App.css';
import './ChatWindow.css';

const initialChats = [
  {
    id: 1,
    name: 'Alice',
    messages: [
      { id: 1, user: 'Me', content: 'Hello Alice!', timestamp: '10:00 AM' },
      { id: 2, user: 'Alice', content: 'Hi there!', timestamp: '10:01 AM' },
    ],
  },
  {
    id: 2,
    name: 'Bob',
    messages: [
      { id: 1, user: 'Me', content: 'Hey Bob!', timestamp: '09:00 AM' },
      { id: 2, user: 'Bob', content: 'Hello!', timestamp: '09:01 AM' },
    ],
  },
];

function App() {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0].id);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: selectedChat.messages.length + 1,
      user: 'Me',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChats(chats.map(chat =>
      chat.id === selectedChatId
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ));
    setInput('');
  };

  const handleAddContact = () => {
    if (newContactName.trim() === '') return;
    const newId = chats.length ? Math.max(...chats.map(c => c.id)) + 1 : 1;
    setChats([
      ...chats,
      { id: newId, name: newContactName, messages: [] }
    ]);
    setNewContactName('');
    setShowAddContact(false);
    setSelectedChatId(newId);
  };

  // Filter chats by search
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Inbox/Chat List */}
      <div className="chat-list" style={{ width: '250px', borderRight: '1px solid #ddd', padding: '16px', background: '#f5f5f5' }}>
        <h2>Messages</h2>
        <input
          type="text"
          placeholder="Search contacts"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <button
          onClick={() => setShowAddContact(true)}
          style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '6px', background: '#4caf50', color: '#fff', border: 'none' }}
        >
          + Add Contact
        </button>
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-list-item${chat.id === selectedChatId ? ' selected' : ''}`}
            style={{
              padding: '10px',
              cursor: 'pointer',
              background: chat.id === selectedChatId ? '#e0ffe0' : 'transparent',
              borderRadius: '6px',
              marginBottom: '8px'
            }}
            onClick={() => setSelectedChatId(chat.id)}
          >
            {chat.name}
          </div>
        ))}
        {/* Add Contact Modal */}
        {showAddContact && (
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}>
            <h3>Add New Contact</h3>
            <input
              type="text"
              placeholder="Contact name"
              value={newContactName}
              onChange={e => setNewContactName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleAddContact}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#4caf50', color: '#fff', border: 'none', marginRight: '8px' }}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddContact(false)}
                style={{ padding: '8px 16px', borderRadius: '6px', background: '#ddd', color: '#333', border: 'none' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <h1 className="app-title">Chat with {selectedChat ? selectedChat.name : '...'}</h1>
        <ChatWindow initialMessages={selectedChat ? selectedChat.messages : []} />
        <div style={{ display: 'flex', marginTop: 'auto' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={!selectedChat}
          />
          <button
            onClick={handleSend}
            style={{ marginLeft: '8px', padding: '10px 16px', borderRadius: '6px', background: '#4caf50', color: '#fff', border: 'none' }}
            disabled={!selectedChat}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
