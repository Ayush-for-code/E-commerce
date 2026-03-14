import React from 'react'
import { useEffect } from 'react'

const Payment = () => {
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
      <h3> select payment method</h3>
    </div>
  )
}

export default Payment
