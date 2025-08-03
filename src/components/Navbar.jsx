
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [

    { name: 'Add Task', path: '/addtask' },
    { name: 'View Task', path: '/viewtasks' },
    { name: 'Study Area', path: '/studyarea' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'view review', path: '/viewreviews' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 Smart Planner</div>

      {/* Hamburger Icon */}
      <div
        style={styles.hamburger}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

      {/* Links Container */}
      <div
        style={{
          ...styles.linkContainer,
          ...(menuOpen ? styles.linkContainerOpen : {}),
        }}
      >
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
            onClick={() => setMenuOpen(false)} // close menu on click
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
    backgroundColor: '#11272fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    flexWrap: 'wrap',
  },
  logo: {
    color: '#f9fafb',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  hamburger: {
    fontSize: '24px',
    color: '#f9fafb',
    cursor: 'pointer',
    display: 'none',
  },
  linkContainer: {
    display: 'flex',
    gap: '20px',
  },
  linkContainerOpen: {
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '60px',
    left: '0',
    right: '0',
    backgroundColor: '#1f2937',
    padding: '12px 24px',
    display: 'flex',
    zIndex: 10,
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
    backgroundColor: '#374151',
    color: '#60a5fa',
    transform: 'scale(1.05)',
  },
};

// Add responsive media query
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.linkContainer.display = 'none';
  styles.hamburger.display = 'block';
}

export default Navbar;
