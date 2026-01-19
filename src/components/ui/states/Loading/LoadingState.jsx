import Spinner from "../../Spinner/Spinner";
import "./LoadingState.css";

export default function LoadingState({
    title = "Loading collections",
    message = "Please wait while we fetch the latest data…"
}) {
    return (
        <div className="loading-state">
            <Spinner />
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}
