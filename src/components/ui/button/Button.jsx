import "./Button.css";

export default function Button({ icon: Icon, text, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {Icon && <Icon />} {text}
        </button>
    )
}
