import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import currencyFormat from "../utils/currencyFormat";

const CartItem = ({
  item: {
    name,
    price,
    image_url,
    slug,
    quantity,
    size,
    productdetail_id,
    stock,
  },
}) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productDetailId) => {
    dispatch(removeFromCart(productDetailId));
  };

  const handleQuantityIncrement = (productDetailId) => {
    if (quantity < stock) {
      dispatch(
        addToCart({
          productDetailId,
          quantity: quantity + 1,
        })
      );
    }
  };

  const handleQuantityDecrement = (productDetailId) => {
    if (quantity > 1) {
      dispatch(
        addToCart({
          productDetailId,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handleQuantityChange = (productDetailId, e) => {
    const quantity = Number(e.target.value);
    if (quantity > 0 && quantity <= stock) {
      dispatch(
        addToCart({
          productDetailId,
          quantity,
        })
      );
    }
  };

  return (
    <div className="flex flex-wrap space-y-3 items-center">
      <Link to={`/products/${slug}`}>
        <img src={image_url} alt={name} className="w-36 mr-3" />
      </Link>
      <div className="space-y-1">
        <p className="font-bold">{name}</p>
        <p className="text-sm">Size: {size}</p>
        <p className="text-sm">Quantity: {quantity}</p>
        <p className="font-semibold">
          {currencyFormat(price)} &times; {quantity}
        </p>
        <div className="flex space-x-1">
          <button
            type="button"
            className="btn-outline py-1 px-3"
            onClick={() => {
              handleQuantityDecrement(productdetail_id);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            className="w-14 py-1 px-3"
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(productdetail_id, e)}
          />
          <button
            type="button"
            className="btn-outline py-1 px-3"
            onClick={() => {
              handleQuantityIncrement(productdetail_id);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            type="button"
            className="btn-outline py-1 px-3"
            onClick={() => handleRemoveFromCart(productdetail_id)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
