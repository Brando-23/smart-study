
import React, { useState } from 'react';
import axios from 'axios';

const YOUTUBE_API_KEY = "AIzaSyALB7SUGYXzKPwPjdhQ4iFiuMpWtNktAKM";

function YouTubePanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videoResults, setVideoResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}`
      );
      setVideoResults(res.data.items);
      setSelectedVideoId(res.data.items[0]?.id.videoId); // auto select first video
    } catch (err) {
      console.log("Error fetching YouTube data:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📺 Study with YouTube</h2>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Search Topics"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>🔍 Search</button>
      </div>

      {selectedVideoId && (
        <div style={styles.videoWrapper}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={styles.video}
          ></iframe>
        </div>
      )}

      {/* List of video results below */}
      <div style={styles.list}>
        {videoResults.map((video, index) => (
          <div
            key={video.id.videoId || index}
            style={styles.listItem}
            onClick={() => setSelectedVideoId(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              style={styles.thumbnail}
            />
            <div style={styles.title}>{video.snippet.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    width: '60%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  videoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  video: {
    borderRadius: '10px',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  thumbnail: {
    width: '100px',
    height: '75px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  title: {
    fontSize: '14px',
    color: '#333',
  },
};

export default YouTubePanel;
