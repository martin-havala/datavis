export interface PressFreedomData {
  ISO: string;
  Score: number;
  Rank: number;
  "Political Context": number;
  Rank_Pol: number;
  "Economic Context": number;
  Rank_Eco: number;
  "Legal Context": number;
  Rank_Leg: number;
  "Social Context": number;
  Rank_Soc: number;
  Safety: number;
  Rank_Saf: number;
  Country_EN: string;
}

export const keys = [
  "ISO",
  "Score",
  "Rank",
  "Political Context",
  "Rank_Pol",
  "Economic Context",
  "Rank_Eco",
  "Legal Context",
  "Rank_Leg",
  "Social Context",
  "Rank_Soc",
  "Safety",
  "Rank_Saf",
  "Country_EN",
];
