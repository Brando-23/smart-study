import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "test@example.com" && form.password === "123456") {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const styles = {
    form: {
      maxWidth: "400px",
      margin: "80px auto",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#1a237e",
      fontSize: "28px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#1976d2",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#1565c0",
    },
  };

  const [focus, setFocus] = useState({ email: false, password: false });
  const [hover, setHover] = useState(false);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>🔐 Welcome Back</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{
          ...styles.input,
          borderColor: focus.email ? styles.inputFocus.borderColor : "#ccc",
        }}
        onFocus={() => setFocus({ ...focus, email: true })}
        onBlur={() => setFocus({ ...focus, email: false })}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{
          ...styles.input,
          borderColor: focus.password ? styles.inputFocus.borderColor : "#ccc",
        }}
        onFocus={() => setFocus({ ...focus, password: true })}
        onBlur={() => setFocus({ ...focus, password: false })}
        required
      />

      <button
        type="submit"
        style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
