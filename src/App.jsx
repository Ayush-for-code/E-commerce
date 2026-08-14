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
import Overview from './pages/Overview';
import Confirm from './pages/OrderConfirm';
import Payment from './pages/Payment';
import ProtectRoute from './components/ProtectRoute';

function App() {

  return (
    <> <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Items/>
        } />
        <Route path="/orders" element={<ProtectRoute>
          <Orders />
        </ProtectRoute>} />
        <Route path="/wishlist" element={<ProtectRoute>
         <Wishlist />
        </ProtectRoute>}/>
        <Route path="/address" element={<ProtectRoute>
         <Address/>
        </ProtectRoute>} />
        <Route path="/order" element={<ProtectRoute>
         <Order/>
        </ProtectRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/overview/:id" element={<ProtectRoute>
         <Overview/>
        </ProtectRoute>}/>
        <Route path="/confirm/:id" element={<ProtectRoute>
         <Confirm/>
        </ProtectRoute>}/>
        <Route path="/payment" element={<ProtectRoute>
         <Payment/>
        </ProtectRoute>}/>
      </Routes>

    </Router> 

      
    </>
  )
}

export default App
