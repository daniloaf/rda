import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";

export default function ApplicationBarComponent() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button LinkComponent={Link} sx={{ color: "white" }} href="/">Início</Button>
        <Button LinkComponent={Link} sx={{ color: "white" }} href="/players">Jogadores</Button>
        <Button LinkComponent={Link} sx={{ color: "white" }} href="/series">Series</Button>
      </Toolbar>
    </AppBar>
  );
};
