import React, { useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [formData, setFormData] = useState({
    topic: "",
    task: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/review", formData);
      console.log("Review added successfully:", res.data);
      alert("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review. Please try again later.");
    }
    setFormData({ topic: "", task: "", date: "" });
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#444",
    },
    tinput: {
      width: '100%',
      padding: '10px 14px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      outline: 'none',
      marginBottom: '16px',
      boxSizing: 'border-box',
      resize: 'vertical', // allows user to resize vertically
      fontFamily: 'inherit', // keep font consistent
    },
    dinput: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Review Your Study</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Study Topic</label>
          <textarea
            name="topic"
            style={styles.tinput}
            value={formData.topic}
            onChange={handleChange}
            required
            rows={3} 
          />

        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Task Summary</label>
          <textarea
            name="task"
            style={styles.tinput}
            value={formData.task}
            onChange={handleChange}
            required
            rows={4}
          />

        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            name="date"
            style={styles.dinput}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reviews;
