import Button from "@/components/ui/button/Button";
import "./Message.scss";

type MessageProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
    btnText?: string;
};

export default function Message({ title = "Oops...", message = "Something went wrong.", onRetry, btnText }: MessageProps) {
    return (
        <div className="message-wrapper">
            <div className="message-container">
                <h2 className="message-title">
                    {title}
                </h2>

                <p className="message">
                    {message}
                </p>

                {onRetry && (
                    <Button
                        variant="primary"
                        text={btnText}
                        onClick={onRetry}
                    />
                )}
            </div>
        </div>
    );
}