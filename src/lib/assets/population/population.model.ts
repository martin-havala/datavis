export interface Population {
    ISO3_code: string;
    SDMX_code: number;
    ParentID: number;
    Location: string;
    PopMale_2020: number;
    PopFemale_2020: number;
    PopTotal_2020: number;
    PopDensity_2020: number;
    PopMale_Medium: number[];
    PopMale_High: number[];
    PopMale_Low: number[];
    PopFemale_Medium: number[];
    PopFemale_High: number[];
    PopFemale_Low: number[];
    PopTotal_Medium: number[];
    PopTotal_High: number[];
    PopTotal_Low: number[];
    PopDensity_Medium: number[];
    PopDensity_High: number[];
    PopDensity_Low: number[];
}

export interface PopulationPosition {
    ISO3_code: string;
    SDMX_code: number;
    ParentID: number;
    Location: string;
    PopMale_2020: number;
    PopFemale_2020: number;
    PopTotal_2020: number;
    PopDensity_2020: number;
    PopMale_Medium: number[];
    PopMale_High: number[];
    PopMale_Low: number[];
    PopFemale_Medium: number[];
    PopFemale_High: number[];
    PopFemale_Low: number[];
    PopTotal_Medium: number[];
    PopTotal_High: number[];
    PopTotal_Low: number[];
    PopDensity_Medium: number[];
    PopDensity_High: number[];
    PopDensity_Low: number[];
    coordinates: [number, number];
    region: string;
    subRegion: string;
}
