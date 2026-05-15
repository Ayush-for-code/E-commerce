import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductModal from "./components/ProductModal";
import Products from "./components/Proucts" 

function App() {
  return (
    <div className="admin-layout">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/product" element={<Products/>}/>
        
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
