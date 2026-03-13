import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../state/reducers/orderslice";

function Orders() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (

    <div className="page">
      {order?.map((item) => (
        <div className="orders" key={item._id}>
          <p>Order ID: {item._id}</p>
          <p>name: {item.items[0]?.name}</p>
          <p>Status: {item.status}</p>
          <p>quantity: {item.items[0]?.quantity}</p>
          <p>price: {item.items[0]?.price}</p>
          <p>total: {item.items[0]?.totalPrice}</p>
          <p>payment Method: {item.paymentInfo.method}</p>
          <p>status: {item.paymentInfo.status}</p>
        {item.shippingAddress && (
  <div className="add-info">
    <p>address: {item.shippingAddress.address ||"N/A"}</p>
    <p>state: {item.shippingAddress.state||"N/A"}</p>
    <p>city: {item.shippingAddress.city||"N/A"}</p>
    <p>pincode: {item.shippingAddress.pincode||"N/A"}</p>
  </div>
)}
        </div>
        
      ))}
    </div>
  );
}

export default Orders;
