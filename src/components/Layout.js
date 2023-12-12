import React from 'react';
// import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import {DataProvider} from '../DataContext';

function Layout (props) {
  return (
    <DataProvider>
      <React.Fragment>
        <Navbar />
        {props.children}
        <Footer/>
      </React.Fragment>
    </DataProvider>
  )
}

export default Layout;
