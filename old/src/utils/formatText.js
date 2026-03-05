/**
 * Formats an underscore-separated string into a human-readable sentence.
 * Converts the text to lowercase and capitalizes the first letter.
 *
 * Example:
 *  - "CHECKED_OUT" → "Checked out"
 *  - "LOADING_IN_PROGRESS" → "Loading in progress"
 *
 * @param {string} text - The text to format (e.g. status codes).
 * @returns {string} A formatted, human-readable string.
 */
export const formatText = (text = "") => {
    const formatted = text
        .toLowerCase()
        .replaceAll("_", " ");

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
