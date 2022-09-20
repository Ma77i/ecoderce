import { Box } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader"


export default function SimpleBackdrop() {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: 10
      }}
    >
      <PuffLoader size={250} />;
    </Box>
  );
}