 import React, { useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [formData, setFormData] = useState({
    topic: "",
    task: "",
    date: "",
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSubmit = window.confirm("Do you want to submit this review?");
    if (!confirmSubmit) return;

    try {
      const res = await axios.post("http://localhost:3000/api/review", formData);
      console.log("Review added successfully:", res.data);
      alert("✅ Review submitted!");
      // Reset form only after successful submission
      setFormData({ topic: "", task: "", date: "" });
    } catch (error) {
      console.error("Error adding review:", error);
      alert("❌ Failed to add review. Please try again later.");
    }
  };

  const styles = {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
      padding: '20px',
    },
    container: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#ffffffcc',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#555",
    },
    tinput: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '10px',
      border: '1px solid #ccc',
      outline: 'none',
      marginBottom: '10px',
      boxSizing: 'border-box',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'border 0.2s ease',
    },
    dinput: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontSize: "16px",
      fontFamily: "inherit",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#43a047",
    },
  };

  return (
    <div style={styles.page}>
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

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
