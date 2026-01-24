import { COLLECTION_STATUSES } from "../constants/collection-statuses";

export const getSpentTimeInStatus = (collection) => {
    const {
        checkedInAt,
        startedLoadingAt,
        finishedLoadingAt,
        checkedOutAt,
        currentStatus,
    } = collection;

    const now = Date.now();

    const checkedIn = checkedInAt ? new Date(checkedInAt).getTime() : null;
    const started = startedLoadingAt ? new Date(startedLoadingAt).getTime() : null;
    const finished = finishedLoadingAt ? new Date(finishedLoadingAt).getTime() : null;
    const checkedOut = checkedOutAt ? new Date(checkedOutAt).getTime() : null;

    const formatMsToHHMMSS = (ms) => {
        if (ms == null) return "--:--:--";

        const totalSeconds = Math.floor(ms / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    };

    if (!checkedIn) return "--:--:--";

    let ms = null;

    // ✅ checked in (still waiting)
    if (currentStatus === COLLECTION_STATUSES.CHECKED_IN) {
        ms = (started ?? now) - checkedIn;
    }

    // ✅ loading in progress
    else if (currentStatus === COLLECTION_STATUSES.LOADING) {
        if (!started) return "--:--:--";
        ms = (finished ?? now) - started;
    }

    // ✅ loaded but not checked out yet
    else if (currentStatus === COLLECTION_STATUSES.LOADED) {
        if (!finished) return "--:--:--";
        ms = (checkedOut ?? now) - finished;
    }

    // ✅ checked out (final)
    else if (currentStatus === COLLECTION_STATUSES.CHECKED_OUT) {
        if (!finished || !checkedOut) return "--:--:--";
        ms = checkedOut - finished;
    }

    return formatMsToHHMMSS(ms);
};
