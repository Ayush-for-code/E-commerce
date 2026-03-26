import React from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src = src;
      script.onload =()=>{
        
        resolve(true)
      }
      script.onerror =()=>{
        resolve(false)
      }
      document.body.appendChild(script);
    })
    
  }
  useEffect(()=>{
const loadRazorpay = async () => {

      const loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      console.log("Razorpay loaded successfully");

    };

    loadRazorpay();
  },[])
  return (
    <div>

    </div>
  )
}

export default Payment
