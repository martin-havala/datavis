import press2022 from "$lib/assets/press_freedom/press_freedom_2022.tsv?url";
import press2025 from "$lib/assets/press_freedom/press_freedom_2025.tsv?url";
import { autoType, tsvParse } from "d3";
import type { PressFreedomData } from "./model";
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res2022: Response = await fetch(press2022);
  const res2025: Response = await fetch(press2025);
  return {
    res2022: (
      tsvParse(await res2022.text(), autoType) as PressFreedomData[]
    ).reduce(
      (res, row, index) => {
        res[(row as PressFreedomData).ISO] = row;
        return res;
      },
      {} as Record<string, PressFreedomData>,
    ),
    res2025: (
      tsvParse(await res2025.text(), autoType) as PressFreedomData[]
    ).reduce(
      (res, row, index) => {
        res[(row as PressFreedomData).ISO] = row;
        return res;
      },
      {} as Record<string, PressFreedomData>,
    ),
  };
}
