import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

/// Displays the current balance with a tooltip explaining interest accrual.
///
/// - Balance is formatted as USD
/// - Tooltip describes the compound interest rate
/// - Component is styled via .specs-container-child and child classes
function Balance({ currentBalance }) {
    return (
        <div className="specs-container-child">
            <div className="specs-label-flex">
                <div className="flex-label">BALANCE</div>
                <Tooltip
                    title="5% APR compound interest updates every 60 seconds."
                    arrow
                >
                    <IconButton
                        size="small"
                        sx={{ ml: 0.5 }}
                        aria-label="Interest info"
                    >
                        <HelpOutlineIcon
                            sx={{ color: "#c0c0c0", fontSize: "1rem" }}
                        />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="specs-value">
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(currentBalance)}
            </div>
        </div>
    );
}

export default Balance;
