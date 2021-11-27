import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/Loader";
import Table from "../../components/Table/Table";
import TableHead from "../../components/Table/TableHead";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import parseDate from "../../utils/parseDate";

const Order = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await API.get("/orders");
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <AdminLayout>
      {!orders ? (
        <Loader />
      ) : (
        <>
          <p className="font-bold mb-4">Orders</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Date</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, i) => (
                <TableRow key={order.id}>
                  <TableCell>{parseDate(order.created_at)}</TableCell>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Link
                        to={`orders/${order.id}`}
                        className="btn-outline py-1 px-3"
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
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </Link>
                      <button className="btn-outline py-1 px-3">
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
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </AdminLayout>
  );
};

export default Order;
