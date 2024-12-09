import Image from "next/image";
import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import ReportsPage from "./components/dynamicTable/ReportsPage";

export default function Home() {
  return (
    <Box
      padding={"20px"}
    >
      <Typography variant="h5" color="#666666">REPORTS</Typography>

      {/* Reports page */}
      <ReportsPage />
    </Box>
  );
}
