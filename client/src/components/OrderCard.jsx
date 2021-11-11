import { Link } from "react-router-dom";
import OrderItem from "./OrderItem";
import currencyFormat from "../utils/currencyFormat";

const OrderCard = ({ order: { id, orderDate, items, status, total } }) => {
  return (
    <div className="card border-b border-gray-400 rounded-sm py-2 px-4">
      <div className="w-full">
        <div className="flex-column md:flex justify-between mb-2 text-sm">
          <p>{orderDate}</p>
          <p>Order Number: {id}</p>
          <p className="font-bold">{status}</p>
        </div>
        <hr className="py-2" />
        {items.map((item, i) => (
          <OrderItem key={i} item={item} />
        ))}
        <hr className="py-2" />
        <div className="flex items-center justify-between">
          <Link to={`/account/orders/${id}`} className="font-medium py-2">
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
