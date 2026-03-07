import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Items from "./components/Items"
import Orders from "./pages/Order";
import Wishlist from "./pages/Wishlist";

import './App.css'
import Address from './components/Address';
import Order from './components/Order';
import Login from './components/LoginForm';
import Signup from "./components/Signform"
import Overview from './pages/Overview';
import Confirm from './pages/OrderConfirm';
import Payment from './pages/Payment';

function App() {

  return (
    <>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Items/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/address" element={<Address/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/overview/:id" element={<Overview/>}/>
        <Route path="/confirm/:id" element={<Confirm/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
     
     
    </Router>
    </>
  )
}

export default App
