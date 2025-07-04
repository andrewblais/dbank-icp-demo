import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

/// A small question-mark icon wrapped in a tooltip.
///
/// - `tooltipTitle`: the message shown on hover
/// - `ariaLabel`: for screen readers (e.g., "Interest info")
function HelpTooltipButton({ tooltipTitle, ariaLabel }) {
    return (
        <Tooltip title={tooltipTitle} arrow>
            <IconButton size="small" sx={{ ml: 0.5 }} aria-label={ariaLabel}>
                <HelpOutlineIcon
                    sx={{
                        color: "#c0c0c0",
                        fontSize: "1rem",
                    }}
                />
            </IconButton>
        </Tooltip>
    );
}

export default HelpTooltipButton;
