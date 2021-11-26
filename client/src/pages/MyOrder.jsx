import { useState, useEffect } from "react";
import { API } from "../config";
import AccountLayout from "../layouts/AccountLayout";
import OrderCard from "../components/OrderCard";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const { data } = await API.get("/user/orders");
      setOrders(data);
    };

    getOrders();
  }, []);

  return (
    <AccountLayout title="Order List">
      <div className="space-y-3">
        {orders.map((order, i) => (
          <OrderCard key={i} order={order} />
        ))}
      </div>
    </AccountLayout>
  );
};

export default MyOrder;
