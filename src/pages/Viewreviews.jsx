import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/review")
      .then(res => setReviews(res.data))
      .catch(err => {
        console.error("Error fetching reviews:", err);
        alert("Failed to load reviews.");
      });
  }, []);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    reviewBox: {
      padding: "15px",
      borderBottom: "1px solid #ccc",
    },
    topic: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#4CAF50",
    },
    task: {
      marginTop: "5px",
      fontSize: "16px",
    },
    date: {
      marginTop: "5px",
      fontStyle: "italic",
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 View Submitted Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={styles.reviewBox}>
            <div style={styles.topic}>Topic: {review.topic}</div>
            <div style={styles.task}>Task: {review.task}</div>
            <div style={styles.date}>📅 {new Date(review.date).toLocaleDateString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewReviews;
