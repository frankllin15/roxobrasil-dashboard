import { Alert, AlertTitle, Box, Modal } from "@mui/material";
import React, { Dispatch } from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
  options: {
    message: string;
    buttomMessage: string;
    buttomAction: () => void;
  };
}

export const AlertModal: React.FC<IProps> = ({
  handleClose,
  open,
  options,
}) => {
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ borderRadius: ".4rem", background: "#e4e4e7" }}>
        {/* <p className="text-2xl mb-4">{options.message}</p>
         */}
        <Alert sx={{ fontSize: "1.3rem" }} severity="success">
          <AlertTitle sx={{ fontSize: "1.6rem" }}>Sucesso</AlertTitle>
          <p>{options.message}</p>
          <button
            onClick={options.buttomAction}
            type="button"
            className="border border-emerald-500 px-2 py-1 mt-4 text-emerald-500 text-md rounded-[.3rem]  hover:bg-teal-50  shadow-sm"
          >
            {options.buttomMessage}
          </button>
        </Alert>
      </Box>
    </Modal>
  );
};
