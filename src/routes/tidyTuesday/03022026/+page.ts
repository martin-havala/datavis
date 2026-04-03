import { csvParse } from "d3";
import type { EdiblePlant, EdiblePlantOriginal } from "./model.js";

export const prerender = true;

const nutrientsMap = {
  High: 5,
  "High potassium fertiliser every 2 weeks.": 4,
  "Medium to high": 3,
  Medium: 2,
  Low: 1,
} as Record<string, number>;

function processNumbers(
  value: string,
): [number] | [number, number] | undefined {
  if (Number.isFinite(+value)) {
    return [+value];
  } else if (value.includes("-")) {
    const [min, max] = value.split("-").map((v) => v.trim());
    if (Number.isFinite(+min)) {
      return Number.isFinite(+max) ? [+min, +max] : [+min];
    }
  }
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: any) {
  return {
    ediblePlants: await fetch(
      "https://raw.githubusercontent.com/rfordatascience/tidytuesday/refs/heads/main/data/2026/2026-02-03/edible_plants.csv",
    )
      .then((c: Response) => c.text())
      .then(
        (text: string) => csvParse(text) as unknown as EdiblePlantOriginal[],
      )
      .then((data: EdiblePlantOriginal[]) =>
        data
          .map(
            (r: EdiblePlantOriginal) =>
              ({
                common_name: r.common_name,
                taxonomic_name: r.taxonomic_name,
                cultivation: r.cultivation,
                description: r.description,
                preferred_ph: isFinite(r.preferred_ph_lower)
                  ? [+r.preferred_ph_lower, +r.preferred_ph_upper || undefined]
                  : undefined,
                requirements: r.requirements,
                sensitivities: r.sensitivities,
                soil: r.soil?.split(",").map((s) => s.trim()) ?? [],
                sunlight: r.sunlight?.split("/").map((s) => s.trim()) ?? [],
                nutrients:
                  r.nutrients === "high"
                    ? "High"
                    : r.nutrients === "low"
                      ? "Low"
                      : r.nutrients,
                season:
                  r.season === "Perennial" || r.season === "perennial"
                    ? "Perennial"
                    : r.season === "NA"
                      ? undefined
                      : r.season === "Annual/perannial"
                        ? "Annual/Perennial"
                        : r.season === "biennial"
                          ? "Biennial"
                          : r.season,
                temperature_germination: processNumbers(
                  r.temperature_germination,
                ),

                temperature_growing: processNumbers(r.temperature_growing),
                days_harvest:
                  r.days_harvest === "continual"
                    ? 0
                    : processNumbers(r.days_harvest),
                days_germination: processNumbers(r.days_germination),
                water:
                  r.water === "low"
                    ? "Low"
                    : r.water === "high"
                      ? "High"
                      : r.water,
                energy: isFinite(r.energy) ? +r.energy : undefined,
                nutritional_info: r.nutritional_info,
                temperature_class: r.temperature_class,
              }) as EdiblePlant,
          )
          .sort((a, b) =>
            nutrientsMap[a.nutrients] > nutrientsMap[b.nutrients] ? 1 : -1,
          ),
      ),
  };
}
