import { React, useEffect, useState } from 'react';
import './App.css';
import {Routes , Route} from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Customers from './pages/Customers';



function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
      </>
    );
    
}

export default App;