import { Link } from "react-router-dom";
import parseDate from "../utils/parseDate";
import currencyFormat from "../utils/currencyFormat";
import OrderItem from "./OrderItem";

const OrderCard = ({
  order: { order_number, created_at, orderDetails, status, total },
}) => {
  return (
    <div className="card border-b border-gray-400 rounded-sm py-2 px-4">
      <div className="w-full">
        <div className="flex-column md:flex justify-between mb-2 text-sm">
          <p>{parseDate(created_at)}</p>
          <p>Order Number: {order_number}</p>
          <p className="font-bold">{status}</p>
        </div>
        <hr className="py-2" />
        {orderDetails.map((orderDetail, i) => (
          <OrderItem key={i} orderDetail={orderDetail} />
        ))}
        <hr className="py-2" />
        <div className="flex items-center justify-between">
          <Link
            to={`/account/orders/${order_number}`}
            className="font-medium py-2"
          >
            Order Detail
          </Link>
          <p className="text-right">
            Total: <span className="font-bold">{currencyFormat(total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
