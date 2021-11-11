import AccountLayout from "../layouts/AccountLayout";
import Address from "../components/Address";
import { addressList } from "../data";

const MyAddress = () => {
  return (
    <AccountLayout title="Address List">
      <div className="flex justify-end">
        <button className="btn">Add Address</button>
      </div>
      {addressList.map((address, i) => (
        <Address key={i} address={address} />
      ))}
    </AccountLayout>
  );
};

export default MyAddress;
