import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../features/address/addressSlice";
import AccountLayout from "../layouts/AccountLayout";
import AddressForm from "../components/AddressForm";
import Address from "../components/Address";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FormModal from "../components/FormModal";

const MyAddress = () => {
  const dispatch = useDispatch();
  const {
    address: { addresses, isLoading, error },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <AccountLayout title="Address List">
      <div className="flex justify-end">
        <FormModal
          triggerBtn={{
            type: "normal",
            text: "Add Addres",
          }}
          title="Add Address"
        >
          <AddressForm isEditMode={false} />
        </FormModal>
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
