import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAddress, updateAddress } from "../features/address/addressSlice";
import AddAddressForm from "./AddressForm";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";

const Address = ({ address }) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddressModal, setAddAddressModal] = useState(false);

  const handleConfirmationModalOpen = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(address.uuid));
  };

  const handleAddressModalOpen = () => {
    setAddAddressModal(true);
  };

  const handleAddressModalClose = () => {
    setAddAddressModal(false);
  };

  const handleSetDefaultAddress = () => {
    dispatch(
      updateAddress({
        id: address.uuid,
        updateData: {
          is_default: true,
        },
      })
    );
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="card-border-b">
      <Modal
        title="Update Address"
        isOpen={showAddressModal}
        closeModal={handleAddressModalClose}
      >
        <AddAddressForm
          isEditMode={true}
          address={address}
          closeModal={handleAddressModalClose}
        />
      </Modal>
      <ConfirmationModal
        title="Delete Address"
        contentText="Are you sure want to delete the address?"
        actionBtnText="Delete"
        action={handleDeleteAddress}
        isOpen={showConfirmationModal}
        closeModal={handleConfirmationModalClose}
      />
      <div className="flex space-x-1 items-center">
        <p className="font-bold">{address.label}</p>
        {address.is_default && (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
      <p>
        {address.recipient_name}, +62{address.phone_number}
      </p>
      <p className="mb-2">{address.full_address}</p>
      <div className="flex space-x-1">
        <button
          className="font-medium py-2 pr-4"
          onClick={handleAddressModalOpen}
        >
          Change
        </button>
        {!address.is_default && (
          <button
            className="font-medium py-2 pr-4"
            onClick={handleSetDefaultAddress}
          >
            Set Default
          </button>
        )}
        {!address.is_default && (
          <button
            className="font-medium py-2 pr-4"
            onClick={handleConfirmationModalOpen}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Address;
