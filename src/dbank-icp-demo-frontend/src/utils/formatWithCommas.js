/// Adds commas to a numeric string for display purposes.
/// e.g., "12345.67" → "12,345.67"
function formatWithCommas(value) {
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export default formatWithCommas;
