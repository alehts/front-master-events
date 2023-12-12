import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFooterFix = () => {
    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      footerElement.style.position = 'fixed';
      footerElement.style.bottom = '0';
    }
  };

  const handleRemoveFooterFix = () => {
    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      footerElement.style.position = ''; // Restablecer la posición predeterminada
      footerElement.style.bottom = '';
    }
  };

  const linkStyles = {
    textDecoration: 'none',
  };

  const buttonStyles = {
    borderRadius: '25px',
    boxShadow: '2px 2px 6px #babecc, -5px -5px 10px #ffffff73',
    width: 'max-content', // Adjust the width to prevent line breaks
  };

  return (
    <header className="bg-gray-300 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32" style={{ borderBottomColor: '#43777A' }}>
      <div className="flex justify-between items-center h-20 md:h-28 lg:h-32 bg-gray-300 px-4" style={{ borderBottomColor: '#43777A' }}>
        <div className="flex items-center">
          <Link to='/' onClick={handleRemoveFooterFix}>
            <img src="/logo.svg" alt="MasterEvents Logo" width="100" height="57" />
          </Link>
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold" style={{ color: '#545776' }}>
            MasterEvents
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">

          <Link to="/formevent" onClick={handleFooterFix} style={linkStyles}>
            <button className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
              style={buttonStyles} onClick={handleFooterFix}>
              Crear Evento
            </button>
          </Link>
          <Link to="/registration" onClick={handleFooterFix} style={linkStyles}>
            <button
              className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
              style={buttonStyles}
            >
              Crear cuenta
            </button>
          </Link>
          <Link to="/signin" onClick={handleFooterFix} style={linkStyles}>
            <button
              className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
              style={buttonStyles}
            >
              Iniciar sesión
            </button>
          </Link>
        </div>
        <div className="dropdown">
          <button
            className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            ☰
          </button>
          {isDropdownOpen && (
            <div className="absolute top-16 right-4 bg-gray-300 py-2 px-4 rounded-lg shadow-md z-50">
              <Link to="/formevent" onClick={handleFooterFix} style={linkStyles}>
                <button className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
                  style={buttonStyles} onClick={handleFooterFix}>
                  Crear Evento
                </button>
              </Link>
              <Link to="/registration" style={linkStyles}>
                <button
                  className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
                  style={buttonStyles}
                >
                  Crear cuenta
                </button>
              </Link>
              <Link to="/signin" style={linkStyles}>
                <button
                  className="block font-bold py-3 px-6 rounded-lg my-4 bg-zinc-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 whitespace-nowrap"
                  style={buttonStyles}
                >
                  Iniciar sesión
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
