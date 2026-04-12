// @ts-nocheck
import countrySize from "$lib/assets/land_area_2022.tsv?url";

import { autoType, tsvParse } from "d3";
import type { CountrySize } from "./model";
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }) {
  const response: Response = await fetch(countrySize);
  return {
    countrySizes: tsvParse(await response.text(), autoType).filter(
      (a) => !!a.size,
    ),
  };
}
