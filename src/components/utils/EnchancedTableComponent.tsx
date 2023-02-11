import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps<T> {
  columns: Array<{ field: keyof T; label: string }>;
  onRequestSort: (property: keyof T) => void;
  order: Order;
  orderBy: keyof T;
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { columns, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof T) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.field as string}
            sortDirection={orderBy === column.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : "asc"}
              onClick={createSortHandler(column.field)}
            >
              {column.label}
              {orderBy === column.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTableComponent<T>({
  data,
  columns,
  limit,
  defaultOrderBy,
  defaultOrder,
}: {
  columns: Array<{ field: keyof T; label: string }>;
  data: Array<T>;
  limit?: number;
  defaultOrderBy?: keyof T;
  defaultOrder?: Order;
}) {
  const [order, setOrder] = React.useState<Order>(defaultOrder ?? "asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(
    defaultOrderBy ?? columns[0].field
  );

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer>
      <Table>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          columns={columns}
        />
        <TableBody>
          {data
            .sort(getComparator(order, orderBy as keyof T))
            .slice(0, limit ?? data.length)
            .map((row, index) => {
              return (
                <TableRow tabIndex={-1} key={index}>
                  {columns.map((colum, index) => {
                    return (
                      <TableCell key={index}>
                        {row[colum.field] as string}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
