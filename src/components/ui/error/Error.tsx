import Button from "@/components/ui/button/Button";
import "./Error.scss";

type ErrorProps = {
    message?: string;
    onRetry?: () => void;
};

export default function Error({ message = "Something went wrong.", onRetry }: ErrorProps) {
    return (
        <div className="error-container">
            <h2 className="error-title">Oops...</h2>

            <p className="error-message">
                {message}
            </p>

            {onRetry && (
                <Button
                    variant="primary"
                    text="Try again"
                    onClick={onRetry}
                />
            )}
        </div>
    );
}