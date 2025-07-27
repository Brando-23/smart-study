import React from "react";

const Home = () => {
  const styles = {
    container: {
      height: "100vh",
      background: "linear-gradient(135deg, #e0f7fa, #80deea)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    title: {
      fontSize: "42px",
      fontWeight: "bold",
      color: "#006064",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "24px",
      color: "#00796b",
      marginBottom: "30px",
    },
    quoteBox: {
      maxWidth: "600px",
      backgroundColor: "#ffffff",
      padding: "25px",
      borderRadius: "16px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    },
    quote: {
      fontSize: "20px",
      fontStyle: "italic",
      color: "#37474f",
    },
    author: {
      marginTop: "10px",
      fontSize: "16px",
      color: "#616161",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>📚 SmartStudy</div>
      <div style={styles.subtitle}>Plan Smart. Study Smarter.</div>

      <div style={styles.quoteBox}>
        <p style={styles.quote}>
          "Success doesn’t come from what you do occasionally, it comes from what you do consistently."
        </p>
        <p style={styles.author}>– Marie Forleo</p>
      </div>
    </div>
  );
};

export default Home;
