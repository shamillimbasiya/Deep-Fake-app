import * as React from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function VoiceDropDown({ onChange, currentValue }) {
  // const [voice, setVoice] = React.useState(null);

  const availableVoices = [
    "Donald Trump",
    "Barack Obama",
    "Morgan Freeman",
    "Darth Vader",
    "Albert Einstein",
    "Mark Zuckerberg",
    "Bill Gates",
    "Brittany Murphy",
    "Egirl"
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleVoiceChange = (targetVoice) => () => {
  //   setVoice(targetVoice);
  //   handleClose();
  // };

  return (
    <>
      <Button
        data-screenshot="toggle-mode"
        onClick={handleClick}
        disableRipple
        size="large"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: 350,
        }}
      >
        {currentValue === null ? "No voice selected" : currentValue}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            // variant: "outlined",
            sx: {
              my: "4px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {availableVoices.map((availableVoice) => {
          return (
            <MenuItem
              key={availableVoice}
              selected={currentValue === availableVoice}
              onClick={() => {
                onChange(availableVoice);
                handleClose();
              }}
            >
              {availableVoice}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
