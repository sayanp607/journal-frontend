import React, { useState, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyDWzcWwikzkfbv5_OgKWyWe6yPWjn27nis';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


  const appendMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    setInput('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      });

      const data = await response.json();
      if (!data.candidates || !data.candidates.length) {
        throw new Error('No response from Gemini API');
      }

      const botMessage = data.candidates[0].content.parts[0].text;
      appendMessage('bot', botMessage);
    } catch (err) {
      console.error('Error:', err);
      appendMessage('bot', 'Sorry, I’m having trouble responding. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {!isOpen && (
        <div id="chatbot-icon" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {isOpen && (
        <div id="chatbot-container">
          <div id="chatbot-header">
            <span>Journal ChatBot</span>
            <button id="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
          <div id="chatbot-body">
            <div id="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div id="chatbot-input-container">
            <input
              type="text"
              id="chatbot-input"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button id="send-btn" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
