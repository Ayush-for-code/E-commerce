import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Items from "./components/Items"
import Orders from "./pages/Order";
import Wishlist from "./pages/Wishlist";

import './App.css'
import Address from './components/Address';

function App() {

  return (
    <>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Items/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/address" element={<Address/>} />
      </Routes>
     
     
    </Router>
    </>
  )
}

export default App
