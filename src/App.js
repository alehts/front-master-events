import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import FormEvent from './components/FormEvent/FormEvent';
import Layout from './components/Layout';
import Stripe from './pages/Stripe';
import './App.scss';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formevent" element={<FormEvent />} />
            <Route path='/stripe' element={<Stripe />} />
            <Route path='/admin/*' element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter >
    </div >
  );
}

export default App;


