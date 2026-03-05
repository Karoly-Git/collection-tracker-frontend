import "./Spinner.scss";

type SpinnerProps = {
    size?: number;
    inline?: boolean;
};

export default function Spinner({
    size = 48,
    inline = false,
}: SpinnerProps) {
    return (
        <span
            className={`spinner ${inline ? "spinner--inline" : ""}`}
            style={{ width: size, height: size }}
            aria-label="Loading"
        />
    );
}