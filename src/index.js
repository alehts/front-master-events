import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap para todo el proyecto
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los estilos de Bootstrap Icons para todo el proyecto
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
