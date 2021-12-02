import { useEffect } from "react";

const Modal = ({ isOpen, title, closeModal, children }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div>
          <div className="flex bg-black bg-opacity-50 fixed inset-0 items-center justify-center z-50 p-4">
            <div className="bg-white max-w-sm rounded space-y-3 w-full">
              <div className="flex justify-between p-4">
                <div className="font-semibold">{title}</div>
                <button onClick={handleCloseModal}>
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
                <div className="px-4 pb-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
