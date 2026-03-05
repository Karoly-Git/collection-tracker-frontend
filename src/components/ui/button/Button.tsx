import "./Button.scss";
import type { ElementType, MouseEventHandler } from "react";

type ButtonVariant =
    | "x-btn"
    | "add"
    | "reject"
    | "accept"
    | "delete"
    | "disabled";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
    icon?: ElementType;
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
    type = "button",
    variant,
    icon: Icon,
    text,
    onClick,
}: ButtonProps) {
    const className = ["btn", variant].filter(Boolean).join(" ");

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {Icon && <Icon className="icon" />}
            <span className="btn-text">{text}</span>
        </button>
    );
}