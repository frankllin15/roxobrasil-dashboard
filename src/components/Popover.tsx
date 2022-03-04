import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { Popover } from "@mui/material";

export const WithPopover: React.FC<{ content: any }> = ({
  children,
  content,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        {children}
      </button>
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
        <Box>{content}</Box>
      </Popover>
    </>
  );
};
