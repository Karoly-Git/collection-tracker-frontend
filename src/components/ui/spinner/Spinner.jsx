import "./Spinner.scss";

export default function Spinner({
    size = 48,
    color = "primary",
    inline = false
}) {
    return (
        <span
            className={`spinner spinner--${color} ${inline ? "spinner--inline" : ""
                }`}
            style={{ width: size, height: size }}
            aria-label="Loading"
        />
    );
}
