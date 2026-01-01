import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleOverlayClick = () => onClose();

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container" onClick={stopPropagation}>
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}
