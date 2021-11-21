import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import currencyFormat from "../utils/currencyFormat";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);
  const itemCount = cartItems.reduce((a, b) => a + b.quantity, 0);
  const subTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length < 1) {
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Error",
          message: "Cart empty",
        })
      );
    } else {
      history.push("/checkout");
    }
  };

  return (
    <>
      <p className="text-xl mb-4 font-bold">Cart</p>
      <div className="flex flex-wrap justify-between space-y-10 md:space-y-0">
        <div className="w-full md:w-3/6 space-y-10 py-2 px-4">
          {cartItems.length < 1 ? (
            <p>
              Cart is empty.{" "}
              <Link to="/" className="font-medium">
                Go Shopping
              </Link>
            </p>
          ) : (
            cartItems.map((item, i) => <CartItem key={i} item={item} />)
          )}
        </div>
        <div className="w-full md:w-2/6">
          <div className="card">
            <p className="font-bold ">{`SubTotal (${itemCount}) items`}</p>
            <p className="font-semibold text-gray-600 mb-4">
              {currencyFormat(subTotal)}
            </p>
            <div className="my-2">
              <button className="btn" onClick={() => handleCheckout()}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
