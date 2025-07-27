import React from 'react';

function TaskCard({ id, task, description, dueDate, priority, onComplete }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{task}</h3>
      <p style={styles.description}>{description}</p>
      <p style={styles.dueDate}>Due: {new Date(dueDate).toLocaleDateString()}</p>
      <p style={styles.priority}> Priority: {priority}</p>
      <button
        style={styles.button}
        onClick={() => {
          if (window.confirm("Are you sure you want to mark this task as completed?")) {
            onComplete(id);
          }
        }}
      >
         Mark as Completed
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '16px',
    padding: '20px',
    margin: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '320px',
    minHeight: '250px',
    transition: '0.3s ease-in-out',
  },
  title: {
    fontSize: '1.4rem',
    color: '#333',
    marginBottom: '10px',
  },
  description: {
    color: 'black',
    marginBottom: '8px',
  },
  dueDate: {
    fontSize: '14px',
    color: 'black',
    marginBottom: '6px',
  },
  priority: {
    fontWeight: 'bold',
    color: '#1d1314ff',
    marginBottom: '12px',
  },
  button: {
    backgroundColor: '#01f43aff',
    color: 'white',
    padding: '10px 14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TaskCard;
