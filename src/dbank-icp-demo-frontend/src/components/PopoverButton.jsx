import { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/// A styled MUI popover button used to show demo instructions or context text.
///
/// Props:
/// - `buttonLabel`: visible button text
/// - `popupText`: content shown inside the popover
function PopoverButton({ buttonLabel, popupText }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "popover-instructions" : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                variant="text"
                onClick={handleClick}
                sx={{
                    color: "#ffbf00",
                    backgroundColor: "#800080",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    lineHeight: "0.65rem",
                    fontFamily: "Source Code Pro, monospace",
                    textTransform: "none",
                }}
            >
                {buttonLabel}
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Typography
                    sx={{
                        padding: 1.35,
                        fontSize: "0.95rem",
                        fontFamily: "Source Code Pro, monospace",
                        backgroundColor: "#800080",
                        color: "#ffbf00",
                        fontWeight: "bold",
                        maxWidth: "16.5rem",
                    }}
                >
                    {popupText}
                </Typography>
            </Popover>
        </div>
    );
}

export default PopoverButton;
