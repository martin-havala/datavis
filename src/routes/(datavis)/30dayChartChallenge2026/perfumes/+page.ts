import perfumesTSV from "$lib/assets/perfumes_parfumo.tsv?url";
import perfumes2024TSV from "$lib/assets/trade/perfumes2024.tsv?url";
import { sum, tsvParse } from "d3";
import type { Perfume, PerfumesTrade } from "./model";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: { fetch: any }) {
  const perfumes: Response = await fetch(perfumesTSV);
  const perfumesTrade: Response = await fetch(perfumes2024TSV);
  const tradeData = tsvParse(
    await perfumesTrade.text(),
    (r: any) =>
      ({
        exporter: r.exporter,
        importer: r.importer,
        value: parseFloat(r.value),
        quantity: parseFloat(r.quantity),
      }) as PerfumesTrade,
  );

  const countries: string[] = [
    ...Array.from(
      new Set(tradeData.map((a) => [a.importer, a.exporter]).flat()),
    ).sort(),
    "Other",
  ];

  const countriesMap = countries.reduce(
    (acc, k, i) => {
      acc[k] = i;
      return acc;
    },
    {} as Record<string, number>,
  );
  const trade = tradeData.reduce(
    (res, row) => {
      res.values[countriesMap[row.exporter]][countriesMap[row.importer]] =
        +row.value;
      res.tones[countriesMap[row.exporter]][countriesMap[row.importer]] =
        +row.quantity;
      return res;
    },
    {
      values: countries.map((c) => countries.map(() => 0)),
      tones: countries.map((c) => countries.map(() => 0)),
      countries,
    } as { values: number[][]; tones: number[][]; countries: string[] },
  );

  const empty: Record<number, boolean> = {};
  trade.tones.forEach((row, i, a) => {
    if (
      // import + export
      // sum(row) + sum(trade.tones, (r) => r[i]) < 100_000 &&
      sum(row) < 25_000 &&
      i < a.length - 1
    ) {
      empty[i] = true;
    } else {
      empty[i] = false;
    }
  });

  Object.entries(empty)
    .map(([country, isEmpty], index) => ({
      country: trade.countries[+country],
      isEmpty,
    }))
    .forEach(({ country, isEmpty }) => {
      if (!isEmpty) {
        return;
      }
      const removeIndex = trade.countries.findIndex((c) => c === country);
      console.log(removeIndex);

      trade.countries.forEach((_, countryIndex) => {
        trade.values.at(-1)![countryIndex] +=
          trade.values[removeIndex][countryIndex]!;
        trade.tones.at(-1)![countryIndex] +=
          trade.tones[removeIndex][countryIndex]!;
      });

      trade.countries.forEach((_, countryIndex) => {
        const removedValue = trade.values[countryIndex][removeIndex]!;
        trade.values[countryIndex]![trade.values[countryIndex].length - 1] +=
          removedValue;
        const removedTones = trade.tones[countryIndex][removeIndex]!;
        trade.values[countryIndex]![trade.tones[countryIndex].length - 1] +=
          removedTones;
      });

      trade.countries.splice(removeIndex, 1);
      trade.values.splice(removeIndex, 1);
      trade.countries.forEach((_, countryIndex) => {
        trade.values.at(countryIndex)!.splice(removeIndex, 1);
      });
      trade.tones.splice(removeIndex, 1);
      trade.countries.forEach((_, countryIndex) => {
        trade.tones.at(countryIndex)!.splice(removeIndex, 1);
      });
    });

  return {
    // perfumes: tsvParse(
    //   await perfumes.text(),
    //   (r: any) =>
    //     ({
    //       Name: `${r.Name}`,
    //       Brand: `${r.Brand}`,
    //       Release_Year: parseInt(r.Release_Year),
    //       Concentration: r.Concentration,
    //       Rating_Value: parseFloat(r.Rating_Value),
    //       Rating_Count: parseInt(r.Rating_Count),
    //       Main_Accords: r.Main_Accords?.split(",").map((a: string) => a.trim()),
    //       Top_Notes: r.Top_Notes?.split(",").map((a: string) => a.trim()),
    //       Middle_Notes: r.Middle_Notes?.split(",").map((a: string) => a.trim()),
    //       Base_Notes: r.Base_Notes?.split(",").map((a: string) => a.trim()),
    //       Perfumers: r.Perfumers,
    //     }) as Perfume,
    // ),
    trade,
  };
}
