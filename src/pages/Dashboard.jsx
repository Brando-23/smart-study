import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [statsData, setStatsData] = useState({
    total: 0,
    completed: 0,
    reminders: 0,
    doubts: 10,
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/review')
      .then((res) => setReviews(res.data.slice(-3).reverse()))
      .catch((err) => console.error('Error fetching reviews:', err));

    axios.get('http://localhost:3000/api/tasks/count')
      .then((res) => setStatsData((prev) => ({ ...prev, total: res.data.count })))
      .catch((err) => console.error('Error fetching total tasks:', err));

        axios.get('http://localhost:3000/api/review/count')
      .then((res) => setStatsData((prev) => ({ ...prev, reminders: res.data.count })))
      .catch((err) => console.error('Error fetching total tasks:', err));

      axios.get('http://localhost:3000/api/taskcompleted/count')
      .then((res)=> setStatsData((prev)=>({...prev,completed:res.data.count})))
      .catch((err)=>console.error('error fetching completed tasks:', err));
  }, []);

  const stats = [
    { label: '📚 Total Tasks', value: statsData.total },
    { label: '✅ Completed Tasks', value: statsData.completed },
    { label: '📑 Total Reviews', value: statsData.reminders },
    { label: '🧠 Doubts Solved', value: statsData.doubts },
  ];

  const actions = [
    { title: 'View Tasks', onClick: () => navigate('/viewtasks'), emoji: '📋' },
    { title: 'Add Task', onClick: () => navigate('/addtask'), emoji: '➕' },
    { title: 'Study Area', onClick: () => navigate('/studyarea'), emoji: '🧠' },
    { title: 'View Reviews', onClick: () => navigate('/viewreviews'), emoji: '📑' },
    { title: 'Add Reviews', onClick: () => navigate('/reviews'), emoji: '🧾' },
    {
      title: 'Latest Reviews',
      onClick: () => {
        const section = document.getElementById('rev');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      },
      emoji: '📝'
    },
  ];

  return (
    <>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>📚 SmartStudy Dashboard</h1>
        <p style={styles.heroSubtitle}>Plan Smart. Study Smarter.</p>
        <blockquote style={styles.quote}>
          "Success doesn’t come from what you do occasionally, it comes from what you do consistently."
          <footer style={styles.author}>– Marie Forleo</footer>
        </blockquote>
      </div>

      <div style={styles.container}>
        <div style={styles.sectionTitle}>📈 Your Stats</div>
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle}>🚀 Quick Actions</div>
        <div style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <div
              key={index}
              style={styles.actionCard}
              onClick={action.onClick}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span style={styles.actionEmoji}>{action.emoji}</span>
              <p>{action.title}</p>
            </div>
          ))}
        </div>

        <div style={styles.sectionTitle} id="rev">📝 Latest Reviews</div>
        {reviews.length === 0 ? (
          <p style={styles.empty}>No reviews submitted yet.</p>
        ) : (
          <div style={styles.reviewList}>
            {reviews.map((review) => (
              <div key={review._id} style={styles.reviewCard}>
                <p style={styles.reviewTopic}>📌 {review.topic}</p>
                <p style={styles.reviewTask}>Task: {review.task}</p>
                <p style={styles.reviewDate}>📅 {new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(to right, #4facfe, #00f2fe)',
    padding: '60px 30px 30px',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontSize: '38px',
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '25px',
    fontStyle: 'italic',
  },
  quote: {
    fontSize: '16px',
    maxWidth: '600px',
    margin: '0 auto',
    color: '#f0f0f0',
  },
  author: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#e0e0e0',
    fontStyle: 'italic',
  },
  container: {
    padding: '40px 30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9fbfd',
    minHeight: '100vh',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#34495e',
    marginBottom: '20px',
    marginTop: '40px',
  },
  statsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '25px',
    minWidth: '160px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: '0.3s',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#3498db',
  },
  statLabel: {
    fontSize: '16px',
    color: '#555',
  },
  actionsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '20px',
    marginTop: '15px',
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    padding: '30px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease-in-out',
    fontWeight: '500',
    fontSize: '16px',
    color: '#2c3e50',
  },
  actionEmoji: {
    fontSize: '32px',
    display: 'block',
    marginBottom: '12px',
  },
  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '15px',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  reviewTopic: {
    fontWeight: 'bold',
    fontSize: '17px',
    marginBottom: '6px',
    color: '#27ae60',
  },
  reviewTask: {
    fontSize: '15px',
    color: '#555',
  },
  reviewDate: {
    fontSize: '13px',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '6px',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontSize: '15px',
  },
};

export default Dashboard;
