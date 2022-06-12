import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

const ApplicationBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button sx={{ color: "white" }} onClick={() => navigate("/")}>
          Início
        </Button>
        <Button sx={{ color: "white" }} onClick={() => navigate("/players")}>
          Jogadores
        </Button>
        <Button sx={{ color: "white" }} onClick={() => navigate("/times")}>
          Times
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
