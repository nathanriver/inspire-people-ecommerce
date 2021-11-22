import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAddress, updateAddress } from "../features/address/addressSlice";
import ConfirmationModal from "./ConfirmationModal";

const Address = ({
  address: {
    uuid,
    label,
    recipient_name,
    phone_number,
    full_address,
    is_default,
  },
}) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleConfirmationModalOpen = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(uuid));
  };

  const handleSetDefaultAddress = () => {
    dispatch(
      updateAddress({
        id: uuid,
        updateData: {
          is_default: true,
        },
      })
    );
  };

  return (
    <div className="card-border-b">
      <ConfirmationModal
        title="Delete Address"
        contentText="Are you sure want to delete the address?"
        actionBtnText="Delete"
        action={handleDeleteAddress}
        isOpen={showConfirmationModal}
        closeMenu={handleConfirmationModalClose}
      />
      <div className="flex space-x-1 items-center">
        <p className="font-bold">{label}</p>
        {is_default && (
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
        {recipient_name}, +62{phone_number}
      </p>
      <p className="mb-2">{full_address}</p>
      <div className="flex space-x-1">
        <button className="font-medium py-2 pr-4">Change</button>
        {!is_default && (
          <button
            className="font-medium py-2 pr-4"
            onClick={handleSetDefaultAddress}
          >
            Set Default
          </button>
        )}
        {!is_default && (
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
