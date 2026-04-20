import arable_land_csv from "$lib/assets/land_use_2026/arable_land.csv?url";
import country_land_csv from "$lib/assets/land_use_2026/country_land.csv?url";
import emissions_csv from "$lib/assets/land_use_2026/emissions.csv?url";
import pesticides_csv from "$lib/assets/land_use_2026/pesticides.csv?url";

import { autoType, csvParse } from "d3";
import type {
  ArableLand,
  ArableLandCSV,
  CountryLandCSV,
  Emissions,
  EmissionsCSV,
  Pesticides,
  PesticidesAndLand,
  PesticidesCSV,
} from "./model";
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const arable_land: Response = await fetch(arable_land_csv);
  const emissions: Response = await fetch(emissions_csv);
  const pesticides: Response = await fetch(pesticides_csv);
  const country_land: Response = await fetch(country_land_csv);

  const al = (
    csvParse(await arable_land.text(), autoType) as ArableLandCSV[]
  ).map(
    (row, index) =>
      ({
        Country: row["Reference area"],
        Unit: row["Unit of measure"],
        Year: row.TIME_PERIOD,
        Value: row.OBS_VALUE * Math.pow(10, row["UNIT_MULT"] ?? 1),
      }) as ArableLand,
  );

  const p = (
    csvParse(await pesticides.text(), autoType) as PesticidesCSV[]
  ).map(
    (row) =>
      ({
        Country: row["Reference area"],
        Value: row.OBS_VALUE,
        Measure: row.MEASURE,
        Year: row.TIME_PERIOD,
      }) as Pesticides,
  );
  const e = (csvParse(await emissions.text(), autoType) as EmissionsCSV[]).map(
    (row) =>
      ({
        Country: row["Reference area"],
        Value: row.OBS_VALUE * Math.pow(10, row.UNIT_MULT ?? 1),
        Year: row.TIME_PERIOD,
      }) as Emissions,
  );

  const cl = csvParse(await country_land.text(), autoType) as CountryLandCSV[];

  return {
    use: al
      .filter((a) => a.Year > 2010)
      .map(
        (al) =>
          ({
            country: al.Country,
            land_ag_ha: al.Value,
            country_land_km2: cl.find(
              (p) => p.Country === al.Country && p.Year === al.Year,
            )?.Value,
            year: al.Year,
            pesticides_t: p.find(
              (p) =>
                p.Country === al.Country &&
                p.Year === al.Year &&
                p.Measure === "TOTPEST",
            )?.Value,
            emissions_ghg_co2: e.find(
              (p) => p.Country === al.Country && p.Year === al.Year,
            )?.Value,
          }) as PesticidesAndLand,
      )
      .filter(
        (a) => a.pesticides_t && a.country_land_km2 && a.year % 4 === 1,
        // && (a.year === 2020 || a.year === 2015),
      )
      .sort((a, b) => {
        const lc = b.country.localeCompare(a.country);
        return lc === 0 ? a.year - b.year : lc;
      }),
  };
}
