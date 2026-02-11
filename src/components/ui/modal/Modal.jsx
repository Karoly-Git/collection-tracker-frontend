import { useEffect } from "react";
import "./Modal.scss";
import { IoMdClose as CloseIcon } from "react-icons/io";

export default function Modal({
    isOpen,
    escapeAction,
    disableEscape = false, // ✅ NEW
    modalTitle,
    children,
}) {
    useEffect(() => {
        if (!isOpen) return;

        // Prevent background scrolling when modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        // ✅ do nothing if modal closed OR escape disabled
        if (!isOpen || disableEscape) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                escapeAction?.();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, disableEscape, escapeAction]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h4 className="modal-title">{modalTitle}</h4>
                    {!disableEscape && (
                        <CloseIcon className="close-icon" onClick={() => escapeAction?.()} />
                    )}
                </div>

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}
