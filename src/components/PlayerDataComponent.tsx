// import { DateTime } from "date-fns";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";

import { styled } from "@mui/system";
import PlayerProfileData from "../types/PlayerProfileData";

const CustomizedTableCell = styled(TableCell)(() => ({
  border: "none",
}));

// const getPlayerPosition = (data) => {
//   const positionsMap = {
//     G: "Goleiro",
//     D: "Zagueiro",
//     M: "Meio-campo",
//     F: "Atacante",
//   };
//   return positionsMap[data.preferredPosition] || "-";
// };

// const getPlayerAge = (data) => {
//   return (
//     parseInt(
//       "1"
//       // DateTime.fromISO(data.birthdate, "dd.MM.yyyy").diffNow("years").years
//     ) * -1
//   ).toString();
// };

export default function PlayerDataComponent({ player }: { player: PlayerProfileData }) {
  return (
    <TableContainer sx={{ display: "inline-flex", marginTop: "10px" }}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <CustomizedTableCell width={50} align="left">
              <b>Nome</b>
            </CustomizedTableCell>
            <CustomizedTableCell align="left">
              {player.fullName}
            </CustomizedTableCell>
          </TableRow>
          <TableRow>
            <CustomizedTableCell align="left">
              <b>Idade</b>
            </CustomizedTableCell>
            <CustomizedTableCell align="left">
              {/* {getPlayerAge(player)} */}
            </CustomizedTableCell>
          </TableRow>
          <TableRow>
            <CustomizedTableCell align="left">
              <b>Posição</b>
            </CustomizedTableCell>
            <CustomizedTableCell align="left">
              {/* {getPlayerPosition(player)} */}
            </CustomizedTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
