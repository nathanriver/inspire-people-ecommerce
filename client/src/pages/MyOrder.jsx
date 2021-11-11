import AccountLayout from "../layouts/AccountLayout";
import OrderCard from "../components/OrderCard";
import { orderList } from "../data";

const MyOrder = () => {
  return (
    <AccountLayout title="Order List">
      <div className="space-y-5">
        {orderList.map((order, i) => (
          <OrderCard key={i} order={order} />
        ))}
      </div>
    </AccountLayout>
  );
};

export default MyOrder;
