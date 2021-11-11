import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import { addressList, cartItems, paymentMethods } from "../data";
import currencyFormat from "../utils/currencyFormat";

const Checkout = () => {
  const address = addressList.find((a) => a.isDefault);
  const { label, recipient, phoneNumber, fullAddress } = address;
  const itemCount = cartItems.length;
  const subTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const shippingFee = 11000;
  const total = subTotal - shippingFee;

  return (
    <>
      <p className="text-xl mb-4 font-bold">Checkout</p>
      <div className="flex flex-wrap justify-between md:space-y-0">
        <div className="w-full md:w-3/6">
          <div className="card-border-b">
            <div className="flex justify-between">
              <p className="font-bold">Shipping Address</p>
              <button className="btn">Change</button>
            </div>
            <p>{label}</p>
            <p>
              {recipient} | {phoneNumber}
            </p>
            <p>{fullAddress}</p>
          </div>
          <div className="py-2 px-4">
            <p className="mb-2 font-bold">Item List</p>
            {cartItems.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/6 space-y-5">
          <div className="card">
            <p className="font-bold mb-2">Courier</p>
            <select name="courier" id="courier" className="w-full">
              <option disabled hidden selected>
                Select Courier
              </option>
              <option value="jne">JNE</option>
              <option value="pos">POS Indonesia</option>
              <option value="tiki">TIKI</option>
            </select>
          </div>
          <div className="card">
            <p className="font-bold mb-2">Payment Method</p>
            <select name="courier" id="courier" className="w-full">
              <option disabled hidden selected>
                Select Payment Method
              </option>
              {paymentMethods.map((p) => (
                <option value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="card">
            <p className="font-bold mb-2">Order Summary</p>
            <div>
              <div className="flex justify-between mb-1">
                <p>{`SubTotal (${itemCount}) items`}</p>
                <p>{currencyFormat(subTotal)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <p>Shipping Fee</p>
                <p>{currencyFormat(shippingFee)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Total</p>
                <p>{currencyFormat(total)}</p>
              </div>
              <div className="my-2">
                <Link to="/checkout" className="btn">
                  Place Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
