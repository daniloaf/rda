import { ptBR } from "date-fns/locale";
import { parseISO, format } from "date-fns";

export default function DateComponent({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "dd/MM/yyyy", { locale: ptBR })}
    </time>
  );
}
