/**
 * Calculate live spent time from startTime until NOW,
 * return hh:mm:ss and color indicator (NO rounding)
 *
 * @param {string|Date|number} startTime
 * @returns {{
*   time: string, // "hh:mm:ss"
*   color: "green" | "blue" | "red"
* }}
*/
export const getDurationWithColor = (startTime) => {
    const startMs = new Date(startTime).getTime();
    const nowMs = Date.now();

    if (isNaN(startMs) || nowMs < startMs) {
        return { time: "--:--:--", color: "green" }; // safe fallback
    }

    const durationMs = nowMs - startMs;

    const totalSeconds = Math.floor(durationMs / 1000); // ✅ NO rounding
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;

    const durationHours = totalSeconds / 3600;

    let color;
    if (durationHours <= 1) {
        color = "green";
    } else if (durationHours < 2) {
        color = "blue";
    } else {
        color = "red";
    }

    return { time, color };
};
