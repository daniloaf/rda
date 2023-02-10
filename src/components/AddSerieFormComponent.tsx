import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEventHandler, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddSerieFormComponent({
  open = false,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const router = useRouter();
  const currentDate = new Date();
  const [month, setMonth] = useState((currentDate.getMonth() + 1).toString());
  const [year, setYear] = useState(currentDate.getFullYear());

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const data = {
      month: parseInt(month),
      year: year,
    };

    const response = await axios.post(`/api/admin/series`, data);

    if (response.status === 200) {
      router.push(`/admin/series/${response.data._id}`);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
      <DialogTitle>Nova Série</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <Select
              required
              value={month}
              type="number"
              onChange={(event) => setMonth(event.target.value as string)}
            >
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {format(new Date(0, index + 1, 0), "LLLL", {
                      locale: ptBR,
                    })}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              required
              value={year}
              type="number"
              onChange={(event) => setYear(parseInt(event.target.value))}
            ></TextField>
            <Button type="submit" fullWidth>
              Salvar
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
}
