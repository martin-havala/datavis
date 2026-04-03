export interface EdiblePlantOriginal {
  /** 	Full taxonomic name. */
  taxonomic_name: string;
  /** 	Common name. */
  common_name: string;
  /** 	Cultivation class. */
  cultivation: string;
  /** 	How much sunlight the plant requires. */
  sunlight: string;
  /** 	How much water the plant requires. */
  water: string;
  /** 	Preferred pH (lower limit). */
  preferred_ph_lower: number;
  /** 	Preferred pH (upper limit). */
  preferred_ph_upper: number;
  /** 	The nutrient level the plant requires. */
  nutrients: string;
  /** 	The type of soil the plant requires. */
  soil: string;
  /** 	The season the plant grows in. */
  season: string;
  /** 	The temperature class of the plant. */
  temperature_class: string;
  /** 	Optimal germination temperature (Celsius). Often a range of values. */
  temperature_germination: string;
  /** 	Optimal growing temperature (Celsius). */
  temperature_growing: string;
  /** 	Days to germination at optimum temperature. Often a range of values. */
  days_germination: string;
  /** 	Days of growing to harvest. */
  days_harvest: string;
  /** 	The nutrients found in the plant. */
  nutritional_info: string;
  /** 	Energy Value per 100g raw (Kcal). */
  energy: number;
  /** 	Sensitivities i.e. issues the plant might face. */
  sensitivities: string;
  /** 	General description of the plant. */
  description: string;
  /** 	Longer text description of the plant requirements. */
  requirements: string;
}

export interface EdiblePlant {
  /** 	Full taxonomic name. */
  taxonomic_name: string;
  /** 	Common name. */
  common_name: string;
  /** 	Cultivation class. */
  cultivation: string;
  /** 	How much sunlight the plant requires. */
  sunlight: [string];
  /** 	How much water the plant requires. */
  water: string;
  /** 	Preferred pH (lower limit). */
  preferred_ph: [number] | [number, number] | undefined;
  /** 	The nutrient level the plant requires. */
  nutrients: string;
  /** 	The type of soil the plant requires. */
  soil: [string];
  /** 	The season the plant grows in. */
  season: string;
  /** 	The temperature class of the plant. */
  temperature_class: string;
  /** 	Optimal germination temperature (Celsius). Often a range of values. */
  temperature_germination: [number] | [number, number];
  /** 	Optimal growing temperature (Celsius). */
  temperature_growing: [number] | [number, number];
  /** 	Days to germination at optimum temperature. Often a range of values. */
  days_germination: [number] | [number, number];
  /** 	Days of growing to harvest. */
  days_harvest: [number] | [number, number];
  /** 	The nutrients found in the plant. */
  nutritional_info: string;
  /** 	Energy Value per 100g raw (Kcal). */
  energy: number;
  /** 	Sensitivities i.e. issues the plant might face. */
  sensitivities: string;
  /** 	General description of the plant. */
  description: string;
  /** 	Longer text description of the plant requirements. */
  requirements: string;
}
