import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../config";
import currencyFormat from "../utils/currencyFormat";
import { getUserAddresses } from "../features/address/addressSlice";
import { setSnackbar } from "../features/snackbar/snackbarSlice";
import AddAddressForm from "../components/AddAddressForm";
import CheckoutItem from "../components/CheckoutItem";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const Checkout = () => {
  const dispatch = useDispatch();
  const [courier, setCourier] = useState("");
  const [couriers, setCouriers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const {
    cart: { cartItems },
    address: { addresses, isLoading },
  } = useSelector((state) => state);
  const address = addresses.find((a) => a.is_default);
  const itemCount = cartItems.reduce((a, b) => a + b.quantity, 0);
  const totalWeight = cartItems.reduce((a, b) => a + b.weight * b.quantity, 0);
  const subTotal = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
  const total = subTotal + shippingFee;

  const toggleAddAddressModal = () => {
    setShowAddAddressModal(!showAddAddressModal);
  };

  const handleCourierChange = (e) => {
    setCourier(e.target.value);
    const value = Number(
      e.target[e.target.selectedIndex].getAttribute("data-p")
    );
    setShippingFee(value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (!address) {
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Error",
          message: "Please add shipping address",
        })
      );
    } else if (!courier) {
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Error",
          message: "Please select a courier",
        })
      );
    } else if (!paymentMethod) {
      dispatch(
        setSnackbar({
          isOpen: true,
          type: "Error",
          message: "Please select a payment method",
        })
      );
    }
  };

  useEffect(() => {
    const getPaymentMethods = async () => {
      const { data } = await API.get("/payment-methods");
      setPaymentMethods(data);
    };

    dispatch(getUserAddresses());
    getPaymentMethods();
  }, [dispatch]);

  useEffect(() => {
    const getCouriers = async (weightData) => {
      const { data } = await API.post("/couriers", weightData);
      setCouriers(data);
    };

    if (address && totalWeight > 0) {
      getCouriers({
        weight: totalWeight,
      });
    }
  }, [address, totalWeight]);

  return (
    <>
      <Modal
        title="Add Address"
        isOpen={showAddAddressModal}
        toggle={toggleAddAddressModal}
      >
        <AddAddressForm toggle={toggleAddAddressModal} />
      </Modal>
      <p className="text-xl mb-4 font-bold">Checkout</p>
      <div className="flex flex-wrap justify-between md:space-y-0">
        <div className="w-full md:w-3/6">
          <div className="card-border-b">
            <div className="flex justify-between mb-2">
              <p className="font-bold">Shipping Address</p>
              {address && <button className="btn">Change</button>}
            </div>
            {isLoading ? (
              <Loader />
            ) : !address ? (
              <div className="space-y-3">
                <p>No shipping address yet.</p>
                <button className="btn" onClick={() => toggleAddAddressModal()}>
                  Add Address
                </button>
              </div>
            ) : (
              <>
                <p>{address.label}</p>
                <p>
                  {address.recipient_name} | +62{address.phone_number}
                </p>
                <p>{address.full_address}</p>
              </>
            )}
          </div>
          <div className="py-2 px-4">
            <p className="mb-2 font-bold">Item List</p>
            {cartItems.map((item, i) => (
              <CheckoutItem key={i} item={item} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/6 space-y-5">
          <div className="card">
            <p className="font-bold mb-2">Courier</p>
            <select
              value={courier}
              onChange={(e) => handleCourierChange(e)}
              name="courier"
              id="courier"
              className="w-full"
              disabled={!address ? true : null}
            >
              <option value="" disabled hidden>
                Select Courier
              </option>
              {couriers.map((courier) => (
                <option
                  key={courier.service}
                  value={courier.service}
                  data-p={courier.value}
                >
                  {`JNE ${courier.service} (${courier.etd} Day) 
                  ${currencyFormat(courier.value)}`}
                </option>
              ))}
            </select>
          </div>
          <div className="card">
            <p className="font-bold mb-2">Payment Method</p>
            <select
              value={paymentMethod}
              onChange={(e) => handlePaymentMethodChange(e)}
              name="courier"
              id="courier"
              className="w-full"
              disabled={!address || !courier ? true : null}
            >
              <option value="" disabled hidden>
                Select Payment Method
              </option>
              {paymentMethods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
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
                <button className="btn" onClick={() => handlePlaceOrder()}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
