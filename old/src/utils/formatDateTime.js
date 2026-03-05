/**
 * Formats a timestamp into a human-readable date/time string.
 *
 * Examples:
 *  - formatDateTime("2025-12-27T08:30:00Z", { time: true }) → "08:30"
 *  - formatDateTime("2025-12-27T08:30:00Z", { date: true }) → "27/12/2025"
 *  - formatDateTime("2025-12-27T08:30:00Z", { date: true, time: true }) → "27/12/2025, 08:30"
 *
 * @param {string | Date} timestamp - ISO timestamp or Date object.
 * @param {Object} options
 * @param {boolean} [options.date=false] - Include date.
 * @param {boolean} [options.time=false] - Include time.
 * @param {string} [options.locale="en-GB"] - Locale for formatting.
 * @returns {string}
 */
export const formatDateTime = (
    timestamp,
    { date = false, time = false, locale = "en-GB" } = {}
) => {
    if (!timestamp || (!date && !time)) return "";

    const formatOptions = {};

    if (date) {
        formatOptions.dateStyle = "short";
    }

    if (time) {
        formatOptions.timeStyle = "short";
    }

    return new Date(timestamp).toLocaleString(locale, formatOptions);
};
