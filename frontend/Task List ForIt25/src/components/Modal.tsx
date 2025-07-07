import "../styles/modal.css";
import type { ModalProps } from "../types/components";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
