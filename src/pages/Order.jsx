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
          <p>Status: {item.status}</p>
          <p>Items: {item.items.length}</p>
          <p>payment Method: {item.paymentInfo.method}</p>
          <p>status: {item.paymentInfo.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
