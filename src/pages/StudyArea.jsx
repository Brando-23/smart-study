import React from 'react';
import YouTubePanel from '../components/YouTubePanel';
import ChatPanel from '../components/chatPanel'; 
function StudyArea() {
  return (
    <div style={styles.container}>
      {/* Left side: YouTube */}
      <div style={styles.left}>
        <YouTubePanel />
      </div>

      {/* Right side: ChatGPT */}
      <div style={styles.right}>
        <h2 style={styles.heading}>🤖 Ask AI Doubts</h2>
        <div style={styles.chatPlaceholder}>
          {/* Replace this with your actual ChatGPT UI later */}
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  left: {
    width: '50%',
    borderRight: '1px solid #ccc',
    overflowY: 'auto',
    backgroundColor: '#f0f4f8',
  },
  right: {
    width: '50%',
    padding: '20px',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  chatPlaceholder: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    minHeight: '400px',
    backgroundColor: '#f9f9f9',
  }
};

export default StudyArea;
