import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../features/address/addressSlice";
import AccountLayout from "../layouts/AccountLayout";
import AddAddressForm from "../components/AddAddressForm";
import Address from "../components/Address";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Modal from "../components/Modal";

const MyAddress = () => {
  const dispatch = useDispatch();
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const {
    address: { addresses, isLoading, error },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const toggleAddAddressModal = () => {
    setShowAddAddressModal(!showAddAddressModal);
  };

  return (
    <AccountLayout title="Address List">
      <Modal
        title="Add Address"
        isOpen={showAddAddressModal}
        toggle={toggleAddAddressModal}
      >
        <AddAddressForm toggle={toggleAddAddressModal} />
      </Modal>
      <div className="flex justify-end">
        <button className="btn" onClick={() => toggleAddAddressModal()}>
          Add Address
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        addresses.map((address) => (
          <Address key={address.uuid} address={address} />
        ))
      )}
    </AccountLayout>
  );
};

export default MyAddress;
