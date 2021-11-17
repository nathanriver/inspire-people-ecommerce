import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../features/snackbar/snackbarSlice";

const Snackbar = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(
      setSnackbar({
        isOpen: false,
        type: null,
        message: null,
      })
    );
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => handleClose(), 3000);
    }
  });

  return (
    <div
      className={`${isOpen ? "snackbar" : "hidden"} ${
        type === "Success" ? "bg-black" : "bg-red-600"
      }`}
    >
      <svg
        className="w-5 h-5 "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            type === "Success"
              ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          }
        />
      </svg>
      <p className="font-medium">{message}</p>
      <button onClick={() => handleClose()}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Snackbar;
