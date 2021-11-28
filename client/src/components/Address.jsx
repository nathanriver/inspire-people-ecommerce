import { useDispatch } from "react-redux";
import { deleteAddress, updateAddress } from "../features/address/addressSlice";
import FormModal from "./FormModal";
import AddressForm from "./AddressForm";
import ConfirmationModal2 from "./ConfirmationModal";

const Address = ({ address }) => {
  const dispatch = useDispatch();

  const handleDeleteAddress = () => {
    dispatch(deleteAddress(address.uuid));
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

  return (
    <div className="card-border-b">
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
      <div>
        <FormModal
          triggerBtn={{
            type: "text",
            text: "Change",
          }}
          title="Update Address"
        >
          <AddressForm isEditMode={true} address={address} />
        </FormModal>
        {!address.is_default && (
          <button
            className="font-medium py-2 pr-4"
            onClick={handleSetDefaultAddress}
          >
            Set Default
          </button>
        )}
        {!address.is_default && (
          <ConfirmationModal2
            triggerBtn={{
              type: "text",
              text: "Delete",
            }}
            title="Confirm Delete Address"
            contentText="Are you sure want to delete the address?"
            actionBtnText="Delete"
            action={handleDeleteAddress}
          />
        )}
      </div>
    </div>
  );
};

export default Address;
