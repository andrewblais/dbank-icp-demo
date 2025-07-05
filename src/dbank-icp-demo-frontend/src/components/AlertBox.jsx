import { Alert, AlertTitle } from "@mui/material";

/// Conditionally renders a warning alert if withdrawal exceeds balance.
///
/// - `showAlert`: boolean toggle to display the alert
/// - `onClose`: handler for dismissing the alert (X button)
function AlertBox({ severity, showAlert, onClose, displayText }) {
    if (!showAlert) return null;

    return (
        <Alert
            severity={severity}
            variant="filled"
            onClose={onClose}
            sx={{ padding: "0.05rem 0.75rem" }}
        >
            <AlertTitle
                sx={{
                    fontSize: "0.8rem",
                    fontFamily: "Source Code Pro, monospace",
                }}
            >
                {displayText}
            </AlertTitle>
        </Alert>
    );
}

export default AlertBox;
