import AccountLayout from "../layouts/AccountLayout";
import OrderItem from "../components/OrderItem";
import { cartItems } from "../data";

const OrderDetail = () => {
  return (
    <AccountLayout title="Order Detail">
      <div className="space-y-2">
        <div className="card-border-b">
          <p className="font-bold mb-2">Order Information</p>
          <div className="text-sm space-y-2">
            <div>
              <label className="label">Status</label>
              <p>Completed</p>
            </div>
            <div>
              <label className="label">Transaction Number</label>
              <p>58175h62-da53-4993-8d94-658d65y1db87 </p>
            </div>
            <div>
              <label className="label">Order Number</label>
              <p>8G3PNT9F75E4G0</p>
            </div>
            <div>
              <label className="label">Order Date</label>
              <p>05 October 2021</p>
            </div>
          </div>
        </div>
        <div className="card-border-b">
          <p className="font-bold mb-2">Payment Information</p>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <p>SubTotal (3) items</p>
              <p>Rp 307.000</p>
            </div>
            <div className="flex justify-between mb-1">
              <p>Shipping Fee</p>
              <p>Rp 11.000</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Total</p>
              <p>Rp 318.000</p>
            </div>
            <div className="space-y-2">
              <div>
                <label className="label">Payment Method</label>
                <p>GoPay</p>
              </div>
              <div>
                <label className="label">Payment Date</label>
                <p>05 October 2021, 16:20:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-border-b">
          <p className="font-bold mb-2">Shipping Information</p>
          <div className="text-sm space-y-2">
            <div>
              <label className="label">Courier</label>
              <p>JNE</p>
            </div>
            <div>
              <label className="label">Tracking Number</label>
              <p>660204510298720</p>
            </div>
            <div>
              <label className="label">Shipping Address</label>
              <p>Ationexercitem</p>
              <p>Elit | +6221321321212</p>
              <p>Laudantium, Magnam, Dignissimos 6666</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="py-2 px-4">
            <p className="font-bold mb-4">Item List</p>
            {cartItems.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetail;
