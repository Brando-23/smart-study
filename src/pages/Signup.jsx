import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigate("/study"); 
      await axios.post("http://localhost:3000/api/signup", form);
      alert("Signup successful!");
      console.log("Navigating to /login");
      // navigate("/login"); // ✅ This should work
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert("Signup failed! " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const styles = {
    form: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "30px",
      backgroundColor: "#f1f8e9",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: "Arial",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#33691e",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#558b2f",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>📝 Create Account</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Sign Up</button>
    </form>
  );
};

export default Signup;
