import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Send message to your backend (not directly to OpenAI)
      const res = await axios.post('http://localhost:3000/api/openai', {
        message: input,
      });

      const reply = res.data.reply;
      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('ChatGPT error:', err);
      setMessages([...newMessages, { sender: 'bot', text: '❌ Error getting response. Try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#d1e7ff' : '#e2e2e2',
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>Thinking...</div>}
      </div>
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={input}
          placeholder="Ask your doubt..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  message: {
    maxWidth: '70%',
    margin: '5px 0',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '14px',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
    margin: '5px 0',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default ChatGPTPanel;
