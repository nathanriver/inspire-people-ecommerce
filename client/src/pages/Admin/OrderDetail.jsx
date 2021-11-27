import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import AdminLayout from "../../layouts/AdminLayout";
import OrderItem from "../../components/OrderItem";
import Loader from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import parseDate from "../../utils/parseDate";
import currencyFormat from "../../utils/currencyFormat";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const { data } = await API.get(`/orders/${orderId}`);
      setOrder(data);
    };
    getOrder();
  }, []);

  return (
    <AdminLayout>
      {!order ? (
        <Loader />
      ) : (
        <>
          <nav className="bg-grey-light rounded font-sans w-full">
            <ol className="list-reset flex text-grey-dark">
              <li>
                <Link to="/admin/orders" className="font-bold">
                  Orders
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>Detail</li>
            </ol>
          </nav>
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
        </>
      )}
    </AdminLayout>
  );
};

export default OrderDetail;
