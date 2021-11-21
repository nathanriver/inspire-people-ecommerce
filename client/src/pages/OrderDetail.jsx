import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";
import currencyFormat from "../utils/currencyFormat";
import parseDate from "../utils/parseDate";
import AccountLayout from "../layouts/AccountLayout";
import OrderItem from "../components/OrderItem";
import Loader from "../components/Loader";
import Error from "../components/Error";

const OrderDetail = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrder = async (orderNumber) => {
      try {
        const { data } = await API.get(`/orders/${orderNumber}`);
        setOrder(data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    getOrder(orderNumber);
  }, [orderNumber]);

  return (
    <AccountLayout title="Order Detail">
      {!order ? (
        error ? (
          <Error error={error} />
        ) : (
          <Loader />
        )
      ) : (
        <div className="space-y-2">
          <div className="card-border-b">
            <p className="font-bold mb-2">Order Information</p>
            <div className="text-sm space-y-2">
              <div>
                <label className="label">Status</label>
                <p>{order.status}</p>
              </div>
              <div>
                <label className="label">Transaction Number</label>
                <p>{order.transaction_id || "-"}</p>
              </div>
              <div>
                <label className="label">Order Number</label>
                <p>{order.order_number}</p>
              </div>
              <div>
                <label className="label">Order Date</label>
                <p>{parseDate(order.created_at)}</p>
              </div>
            </div>
          </div>
          <div className="card-border-b">
            <p className="font-bold mb-2">Payment Information</p>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <p>
                  SubTotal (
                  {order.orderDetails.reduce((a, b) => a + b.quantity, 0)})
                  items
                </p>
                <p>{currencyFormat(order.subtotal)}</p>
              </div>
              <div className="flex justify-between mb-1">
                <p>Shipping Fee</p>
                <p>{currencyFormat(order.shipping_fee)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Total</p>
                <p>{currencyFormat(order.total)}</p>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="label">Payment Method</label>
                  <p>{order.paymentMethod.name}</p>
                </div>
                <div>
                  <label className="label">Payment Date</label>
                  <p>
                    {order.transaction_date
                      ? parseDate(order.transaction_date)
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-border-b">
            <p className="font-bold mb-2">Shipping Information</p>
            <div className="text-sm space-y-2">
              <div>
                <label className="label">Courier</label>
                <p>{order.courier}</p>
              </div>
              <div>
                <label className="label">Tracking Number</label>
                <p>{order.tracking_number || "-"}</p>
              </div>
              <div>
                <label className="label">Shipping Address</label>
                <p>
                  {order.orderAddress.recipient_name} | +62
                  {order.orderAddress.phone_number}
                </p>
                <p>{order.orderAddress.full_address}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="py-2 px-4">
              <p className="font-bold mb-4">Item List</p>
              {order.orderDetails.map((orderDetail, i) => (
                <OrderItem key={i} orderDetail={orderDetail} />
              ))}
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default OrderDetail;
