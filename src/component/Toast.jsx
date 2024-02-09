/** @format */
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
export default function Toast({ message, color, open }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000}>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity={color}>
            {message}
          </Alert>
        </Stack>
      </Snackbar>
    </div>
  );
}
