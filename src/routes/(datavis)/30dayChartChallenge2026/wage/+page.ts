import wages from "$lib/assets/wages.csv?url";
import { csvParse } from "d3";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: { fetch: any }) {
  const res2025: Response = await fetch(wages);
  return {
    wages: csvParse(await res2025.text(), (row) => ({
      // date: dayjs(row.date, "DD.MM.YYYY").toDate(),
      // date2: dayjs(row.date2 || row.date, "DD.MM.YYYY").toDate(),
      diff: dayjs(row.date, "DD.MM.YYYY").diff(
        !!row.date2
          ? dayjs(row.date2, "DD.MM.YYYY")
          : dayjs(row.date, "DD.MM.YYYY").startOf("M"),
        "d",
      ),

      partner: row.partner,
    })),
  };
}
