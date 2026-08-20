import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../state/reducers/productSlice";
import { fetchAddress } from "../state/reducers/address"; //still have to for adding only deafault address only
import { createOrder } from "../state/reducers/orderslice";
import { createPayment, verifyPayment } from "../state/reducers/paymentslice";
import { useAuth } from "@clerk/react";

const OrderConfirm = () => {
  const { singleProduct } = useSelector((state) => state.product);
  // const {address} = useSelector((state)=> state.addresses);
  const { payment } = useSelector((state) => state.payment);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {getToken} = useAuth();

  const [qty, setQty] = useState(1);
  const [dfault, setDefault] = useState(false);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  //function for confirm order by getting order Id from createOrder Slice and run handerler function for verify

 const confirmOrder = async () => {
  try {
    // Step 1: Create order
    const token = await getToken();
    const orderResult = await dispatch(createOrder({id,qty,token}));

    console.log("Order Result:", orderResult);

    // Stop if order creation failed
    if (
      orderResult.meta?.requestStatus === "rejected" ||
      !orderResult.payload?.success
    ) {
      navigate("/address");
      return;
    }

    // Step 2: Create payment order
    const paymentResult = await dispatch(createPayment({id,token}));

    console.log("Payment Result:", paymentResult);

    if (
      paymentResult.meta?.requestStatus === "rejected" ||
      !paymentResult.payload
    ) {
      console.error("Payment creation failed");
      return;
    }

    const order = paymentResult.payload.order;

    // Step 3: Check Razorpay SDK
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    // Step 4: Open Razorpay
    const options = {
      key: "rzp_test_SQc4XgiRWHRCAA",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      handler: async function (response) {
        try {
          const token = await getToken();
          const verifyResult = await dispatch(verifyPayment({response,token}));

          if (verifyResult.payload?.success) {
            console.log("Payment verified");
            navigate("/");
          } else {
            console.error("Payment verification failed");
          }
        } catch (err) {
          console.error(err);
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error("Confirm Order Error:", err);
  }
};
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);
  //if details are not fetched show loading
  if (!singleProduct) {
    return <h2>Loading...</h2>;
  }

  const delivery = 50;
  const discount = 10;
  const subtotal = singleProduct.price * qty;
  const discountTotal = (subtotal * discount) / 100;
  const totalAmount = Math.floor(subtotal + delivery - discountTotal);

  return (
    <div className="order-details">
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

      <Link
        to="/payment"
        onClick={() => {
          confirmOrder();
        }}
      >
        Order Confirm
      </Link>
    </div>
  );
};

export default OrderConfirm;
