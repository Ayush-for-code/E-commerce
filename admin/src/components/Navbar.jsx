import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth, UserButton, Show } from "@clerk/react";

const Navbar = () => {
  return (
    <div className='navbar'>
      <h2>ShopEase Admin</h2>
        <div className="nav-links">
          <div className="links"><Link to="/">Dashboard</Link></div>
          <div className="links"><Link to="/product">Product</Link></div>
          <div className="links"><Link to="/">Analityics</Link></div>
        </div>
    </div>
  )
}

export default Navbar
