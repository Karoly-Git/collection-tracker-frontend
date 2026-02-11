import "./Button.scss";

export default function Button({
    type,
    icon: Icon,
    text,
    className,
    onClick }) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {Icon && <Icon className="icon" />} {text}
        </button>
    );
}
