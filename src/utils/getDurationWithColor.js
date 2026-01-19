/**
 * Calculate live spent time from startTime until NOW,
 * return hh:mm and color indicator (NO rounding)
 *
 * @param {string|Date|number} startTime
 * @returns {{
*   time: string, // "hh:mm"
*   color: "green" | "yellow" | "red"
* }}
*/
export const getDurationWithColor = (startTime) => {
    const startMs = new Date(startTime).getTime();
    const nowMs = Date.now();

    if (isNaN(startMs) || nowMs < startMs) {
        return { time: "--:--", color: "green" }; // safe fallback
    }

    const durationMs = nowMs - startMs;
    const totalMinutes = Math.floor(durationMs / (1000 * 60)); // ⬅ NO rounding

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    const durationHours = totalMinutes / 60;

    let color;
    if (durationHours <= 1) {
        color = "green";
    } else if (durationHours < 2) {
        color = "yellow";
    } else {
        color = "red";
    }

    return { time, color };
};
