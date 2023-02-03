import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const getMonthName = (monthNumber: number, monthFormat: string = "LLL" ) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return format(date, monthFormat, { locale: ptBR }).toLocaleUpperCase();
};

export default getMonthName;
