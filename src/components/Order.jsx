import React from 'react'
import { useDispatch } from 'react-redux';
import { confirmOrder } from '../state/reducers/orderslice';
import OrderConfirm from "../pages/OrderConfirm";
const Order = () => {
     const dispatch = useDispatch();

    const handleorder= ()=>{
        dispatch(confirmOrder())
    }
  return (
    <div>
         <h2>Your Orders</h2>
      <p>No orders placed yet.</p>
      <OrderConfirm/>
    </div>
  )
}

export default Order
