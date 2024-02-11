/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { Alert, Snackbar } from "@mui/material";

export default function Toast({ message, type, isOpen, setIsOpen }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={isOpen.value}
      autoHideDuration={6000}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={type !== "" ? type : undefined}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

// export default Toast;
