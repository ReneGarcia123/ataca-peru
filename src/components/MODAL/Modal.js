import ReactModal from "react-modal";
import "./Modal.css";

ReactModal.setAppElement("#root");

const Modal = ({
  isOpen,
  onClose,
  children
}) => {

  return (

    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
      bodyOpenClassName="modal-open"

      style={{
        content: {
          inset: "unset",
          padding: "0",
          border: "none",
          background: "#ffffff"
        }
      }}
    >

      <button
        className="modal-close"
        onClick={onClose}
      >
        ×
      </button>

      <div className="custom-modal-content">

        {children}

      </div>

    </ReactModal>

  );
};

export default Modal;