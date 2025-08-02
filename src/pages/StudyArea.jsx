import React from 'react';
import YouTubePanel from '../components/YouTubePanel';
import ChatPanel from '../components/chatPanel';
import './StudyArea.css'; // Import your CSS file


function StudyArea() {
  return (
    <div className="study-container">
      <div className="panel-left">
        <YouTubePanel />
      </div>

      <div className="panel-right">
        <h2 className="chat-heading">🤖 Ask AI Doubts</h2>
        <div className="chat-placeholder">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

export default StudyArea;
