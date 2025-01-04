import React, { FC, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Popover,
  Popper,
  Typography,
} from "@mui/material";

export const PopperPopoverSample: FC = () => {
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [popperAnchorEl, setPopperAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handlePopperClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget);
  };

  const clickAwayPopperHandler = () => {
    if (popperAnchorEl) {
      setPopperAnchorEl(null);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handlePopoverClick}>
        Open Popover
      </Button>
      <Popover
        open={!!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <div style={{ marginTop: 50, height: 50 }}>
        <ClickAwayListener onClickAway={clickAwayPopperHandler}>
          <div>
            <button type="button" onClick={handlePopperClick}>
              Toggle Popper
            </button>
            <Popper open={!!popperAnchorEl} anchorEl={popperAnchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                The content of the Popper.
              </Box>
            </Popper>
          </div>
        </ClickAwayListener>
      </div>
    </>
  );
};
