import { DateTime } from "luxon";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";

import { styled } from "@mui/system";

const CustomizedTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
}));

const getPLayerPosition = (data) => {
  const positionsMap = {
    "G": "Goleiro",
    "D": "Zagueiro",
    "M": "Meio-campo",
    "F": "Atacante"
  }
  return positionsMap[data.preferredPosition] || "-"
}

const getPlayerAge = (data) => {
  return (
    parseInt(
      DateTime.fromISO(data.birthdate, "dd.MM.yyyy").diffNow("years").years
    ) * -1
  );
};

const PlayerData = ({ data }) => {
  return (
    <TableContainer sx={{ display: "inline-flex", marginTop: "10px" }}>
      <Table size="small">
        <TableRow>
          <CustomizedTableCell width={50} align="left">
            <b>Nome</b>
          </CustomizedTableCell>
          <CustomizedTableCell align="left">
            {data.fullName}
          </CustomizedTableCell>
        </TableRow>
        <TableRow>
          <CustomizedTableCell align="left">
            <b>Idade</b>
          </CustomizedTableCell>
          <CustomizedTableCell align="left">
            {getPlayerAge(data)}
          </CustomizedTableCell>
        </TableRow>
        <TableRow>
          <CustomizedTableCell align="left">
            <b>Posição</b>
          </CustomizedTableCell>
          <CustomizedTableCell align="left">
            {getPLayerPosition(data)}
          </CustomizedTableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default PlayerData;
