import React from 'react';
import './Footer.css';

// https://icons.getbootstrap.com/

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        ©2023 MasterEvents
      </div>
      <div className="footer-right">
        <a href="https://facebook.com/multicargajym" className="social-icon">
          <i className="bi bi-facebook" style={{ color: 'white' }}></i>
        </a>
        <a href="https://linkedin.com/multicargajym" className="social-icon">
          <i className="bi bi-linkedin" style={{ color: 'white' }}></i>
        </a>
        <a href="https://twitter.com/multicargajym" className="social-icon">
          <i className="bi bi-twitter" style={{ color: 'white' }}></i>
        </a>
        <a href="https://instagram.com/multicargajym" className="social-icon">
          <i className="bi bi-instagram" style={{ color: 'white' }}></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
