import { useEffect } from "react";
import "./Modal.css";
import Button from "../button/Button";

import { IoMdClose } from "react-icons/io";

export default function Modal({ isOpen, onClose, modalTitle, children }) {
    useEffect(() => {
        if (!isOpen) return;

        // Close modal on "Escape" key press
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
                document.activeElement?.blur?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Close when clicking the overlay background itself
        if (e.target === e.currentTarget) onClose();
    };

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-container"
                onClick={stopPropagation}
                onMouseDown={stopPropagation} // Helps in some cases
            >
                <div className="modal-header">
                    <h4 className="modal-title">{modalTitle}</h4>
                    <Button icon={IoMdClose} className="btn x-btn" onClick={onClose} />
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

