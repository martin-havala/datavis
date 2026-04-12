export interface ArableLandCSV {
  "Reference area": string;
  "Unit of measure": string;
  TIME_PERIOD: number;
  OBS_VALUE: number;
  UNIT_MULT: number;
}

export interface ArableLand {
  Country: string;
  Unit: string;
  Year: number;
  Value: number;
}

export interface PesticidesCSV {
  "Reference area": string;
  MEASURE: string;
  TIME_PERIOD: number;
  OBS_VALUE: number;
}
export interface Pesticides {
  Country: string;
  Measure: string;
  Year: number;
  Value: number;
}

export interface EmissionsCSV {
  "Reference area": string;
  TIME_PERIOD: number;
  OBS_VALUE: number;
  UNIT_MULT: number;
}
export interface CountryLand {
  Country: string;
  Year: number;
  Value: number;
}

export interface Emissions {
  Country: string;
  Year: number;
  Value: number;
}
export interface CountryLandCSV {
  Country: string;
  Year: number;
  Value: number;
}

export interface PesticidesAndLand {
  country: string;
  year: number;
  country_land_km2: number;
  land_ag_ha: number;

  pesticides_t: number;
  emissions_ghg_co2: number;
}
