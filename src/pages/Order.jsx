import OrderConfirm from "./OrderConfirm";

function Orders() {
  return (
    <div className="page">
      <h2>Your Orders</h2>
      <p>No orders placed yet.</p>
      <OrderConfirm/>
    </div>
  );
}

export default Orders;
