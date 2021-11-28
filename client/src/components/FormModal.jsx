import React from "react";
import { useState, useEffect } from "react";
import Modal from "./Modal";

const FormModal = ({ title, triggerBtn, children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    return () => {};
  }, []);

  const triggerButton = () => {
    if (triggerBtn.type === "icon") {
      return (
        <button className="btn-outline py-1 px-3" onClick={handleModalOpen}>
          {triggerBtn.icon}
        </button>
      );
    } else if (triggerBtn.type === "text") {
      return (
        <button className="font-medium py-2 pr-4" onClick={handleModalOpen}>
          {triggerBtn.text}
        </button>
      );
    } else {
      return (
        <button className="btn" onClick={handleModalOpen}>
          {triggerBtn.text}
        </button>
      );
    }
  };

  const childrenWithProps = React.isValidElement(children)
    ? React.cloneElement(children, {
        closeModal: handleModalClose,
      })
    : children;

  return (
    <>
      {triggerButton()}
      <Modal isOpen={modalOpen} title={title} closeModal={handleModalClose}>
        {childrenWithProps}
      </Modal>
    </>
  );
};

export default FormModal;
