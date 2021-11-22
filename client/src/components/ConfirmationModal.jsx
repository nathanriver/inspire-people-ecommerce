import { useEffect } from "react";

const ConfirmationModal = ({
  title,
  contentText,
  actionBtnText,
  action,
  isOpen,
  closeMenu,
}) => {
  const handleAction = () => {
    action();
    closeMenu();
  };

  const handleCloseMenu = () => {
    closeMenu();
  };

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      }  bg-black bg-opacity-50 fixed inset-0 items-center justify-center z-50 p-4`}
    >
      <div className="bg-white max-w-sm rounded space-y-3 w-full">
        <div className="flex justify-between p-4">
          <div className="font-semibold">{title}</div>
          <button onClick={handleCloseMenu}>
            <svg
              className="w-6 h-6"
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
        <div className="text-sm max-h-96 overflow-y-auto">
          <div className="px-4 pb-4">{contentText}</div>
        </div>
        <div className="flex justify-end space-x-3 py-2 px-4">
          <button className="btn-secondary" onClick={handleCloseMenu}>
            Cancel
          </button>
          <button className="btn" onClick={handleAction}>
            {actionBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
