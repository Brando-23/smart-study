import React, { useState } from 'react';
import axios from 'axios';

function AddTask() {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    dueDate: '',
    priority: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try{
      axios.post('http://localhost:3000/api/tasks',formData)
      .then(res=>{
        console.log('Task added successfully:', res.data);
        alert('Task added successfully!');
      })
    }
    catch(error){
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again later.');
    }
    setFormData({
      taskName: '',
      taskDescription: '',
      dueDate: '',
      priority: 'low',
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Schedule Your Task</h1>
      <p style={styles.subheading}>
        Use the form below to add a new task to your schedule.
      </p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="taskName" style={styles.label}>Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="taskDescription" style={styles.label}>Task Description:</label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dueDate" style={styles.label}>Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="priority" style={styles.label}>Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <button type="submit" style={styles.button}> Add Task</button>
        </div>
      </form>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#1f2937',
  },
  subheading: {
    fontSize: '16px',
    marginBottom: '24px',
    color: '#4b5563',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#374151',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    outlineColor: '#3b82f6',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    resize: 'none',
    minHeight: '80px',
    outlineColor: '#3b82f6',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    outlineColor: '#3b82f6',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AddTask;
