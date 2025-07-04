import { Alert, AlertTitle } from "@mui/material";

/// Conditionally renders a warning alert if withdrawal exceeds balance.
///
/// - `showAlert`: boolean toggle to display the alert
/// - `onClose`: handler for dismissing the alert (X button)
function AlertBox({ showAlert, onClose }) {
    if (!showAlert) return null;

    return (
        <Alert
            severity="warning"
            variant="filled"
            onClose={onClose}
            sx={{ padding: "0.05rem 0.75rem" }}
        >
            <AlertTitle
                sx={{
                    fontSize: "0.85rem",
                    fontFamily: "Source Code Pro, monospace",
                }}
            >
                Withdrawal must be less than or equal to your balance.
            </AlertTitle>
        </Alert>
    );
}

export default AlertBox;
