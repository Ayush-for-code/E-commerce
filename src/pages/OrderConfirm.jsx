import { useState, useEffect } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleProduct } from "../state/reducers/productSlice"
import {fetchAddress} from "../state/reducers/address"//still have to for adding only deafault address only
import { createOrder} from "../state/reducers/orderslice"
import { createPayment,verifyPayment } from "../state/reducers/paymentslice"


const OrderConfirm = () => {

  const { singleProduct } = useSelector((state) => state.product);
  // const {address} = useSelector((state)=> state.addresses);
  const {payment} = useSelector((state)=> state.payment);
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)

  const increaseQty = () => setQty(qty + 1)
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1)
  }

  //function for confirm order by getting order Id from createOrder Slice and run handerler function for verify
   
  const confirmOrder = async () => {
  try {

    const paymentResult = await dispatch(createPayment(id));

    if (!paymentResult.payload || paymentResult.error) {
      console.error("Payment creation failed");
      return;
    }

    const order = paymentResult.payload.order;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_SQc4XgiRWHRCAA",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      handler: async function (response) {
        const verifyResult = await dispatch(verifyPayment(response));
        console.log(verifyResult)
        const orderResult = await dispatch(createOrder({ id, qty }));

        if (verifyResult.payload?.success) {
          console.log("Payment verified");
        } else {
          console.error("Verification failed");
        }
       navigate("/")
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id))
    }
  }, [dispatch, id])
//if details are not fetched show loading 
  if (!singleProduct) {
    return <h2>Loading...</h2>
  }

  const delivery = 50
  const discount = 10;
  const subtotal = singleProduct.price * qty;
  const discountTotal = (subtotal * discount) /100;
  const totalAmount = Math.floor( subtotal + delivery - discountTotal);

  return (
    <div className='order-details'>
     
      <div>

        <span>
          <h2>Name :</h2>
          <h2>{singleProduct.name}</h2>
        </span>

        <span>
          <h2>Price :</h2>
          <h2>₹{singleProduct.price}</h2>
        </span>

        <span>
          <h2>Discount :</h2>
          <h2>{discount}%</h2>
        </span>

        <span>
          <h2>Delivery :</h2>
          <h2>₹{delivery}</h2>
        </span>

        <div className="quantity">
          <button onClick={decreaseQty}>-</button>
          <span>{qty}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <span>
          <h2>Total Amount :</h2>
          <h2>₹{totalAmount}</h2>
        </span>

      </div>

      <Link to="/payment" onClick={()=>{confirmOrder()}}>Order Confirm</Link>
    </div>
  )
}

export default OrderConfirm
