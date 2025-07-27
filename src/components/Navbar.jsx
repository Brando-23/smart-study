import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Task', path: '/addtask' },
    { name: 'View Task', path: '/viewtasks' },
    { name: 'Study Area', path: '/studyarea' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'View Reviews', path: '/viewreviews' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 Smart Planner</div>
      <div style={styles.linkContainer}>
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              ...(hovered === index ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '12px 24px',
    backgroundColor: '#11272fff', // dark slate
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    color: '#f9fafb',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  linkContainer: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontSize: '17px',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#374151', // slightly lighter
    color: '#60a5fa', // blue
    transform: 'scale(1.05)',
  },
};

export default Navbar;