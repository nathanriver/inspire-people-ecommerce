import { Link } from "react-router-dom";
import currencyFormat from "../utils/currencyFormat";

const CheckoutItem = ({
  item: { name, price, image_url, slug, size, quantity },
}) => {
  return (
    <Link to={`/products/${slug}`}>
      <div className="flex space-x-3 items-center mb-2">
        <img src={image_url} alt={name} className="w-20" />
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-sm">Size: {size}</p>
          <p className="text-sm">Quantity: {quantity}</p>
          <p className="text-sm font-semibold">
            {currencyFormat(price * quantity)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CheckoutItem;
