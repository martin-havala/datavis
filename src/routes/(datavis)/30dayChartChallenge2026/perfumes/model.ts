export interface PerfumeCSV {
  Name: string;
  Brand: string;
  Release_Year: string;
  Concentration: string;
  Rating_Value: string;
  Rating_Count: string;
  Main_Accords: string;
  Top_Notes: string;
  Middle_Notes: string;
  Base_Notes: string;
  Perfumers: string;
}

export interface Perfume {
  Name: string;
  Brand: string;
  Release_Year: number;
  Concentration: string;
  Rating_Value: number;
  Rating_Count: number;
  Main_Accords: string[];
  Top_Notes: string[];
  Middle_Notes: string[];
  Base_Notes: string[];
  Perfumers: string;
}
export interface PerfumesTrade {
  exporter: string;
  importer: string;
  value: number;
  quantity: number;
}
