import { Link } from "react-router-dom";
import currencyFormat from "../utils/currencyFormat";

const ProductCard = ({ product: { name, price, image, slug } }) => {
  return (
    <Link to={`/products/${slug}`}>
      <div>
        <img src={image} alt={name} />
        <p className="font-bold">{name}</p>
        <p className="font-semibold text-gray-600">{currencyFormat(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
