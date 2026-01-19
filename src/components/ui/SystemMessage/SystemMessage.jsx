import Spinner from "../Spinner/Spinner";
import "./SystemMessage.css";

const ICONS_BY_VARIANT = {
    loading: null,
    error: "⛔",
    empty: "🗂️",
    notFound: "🚫",
    info: "💡",
};

export default function SystemMessage({
    variant = "info", // loading | error | empty | notFound | info
    title,
    message,
    actionLabel,
    onAction,
}) {
    const Icon = ICONS_BY_VARIANT[variant];

    return (
        <div className={`system-message system-message--${variant}`}>
            {variant === "loading" && <Spinner />}

            {Icon && (
                <div className="system-message__icon" aria-hidden>
                    {Icon}
                </div>
            )}

            {title && <h2>{title}</h2>}
            {message && <p>{message}</p>}

            {actionLabel && onAction && (
                <button onClick={onAction}>{actionLabel}</button>
            )}
        </div>
    );
}
