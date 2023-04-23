export interface LandUse {
    year: number;
    [key: string]: number;
}

export interface LandUsePlot {
    key: string;
    values: [number, number][];
    max: number;
    today: number;
}

export type LandUseKeyTypes =
    | 'population'
    | 'built'
    | 'builtPC'
    | 'cropland'
    | 'croplandPC'
    | 'grazing'
    | 'grazingPC'
    | 'arableLand'
    | 'populationDensity'
    | 'fertilizer'
    | 'fertilizerPC';
export const LAND_USE_KEYS = [
    'population',
    'built',
    'builtPC',
    'cropland',
    'croplandPC',
    'grazing',
    'grazingPC',
    'arableLand',
    'populationDensity',
    'fertilizer',
    'fertilizerPC',
];
export const LandUseLabels = {
    year: 'Year',
    population: 'World Population',
    built: 'Built-up Area (HYDE (2017))',
    builtPC: 'Build-up area per Capita',
    cropland: 'Cropland (HYDE (2017))',
    croplandPC: 'Cropland per Capita',
    grazing: 'Grazing (HYDE (2017))',
    grazingPC: 'Grazing per Capita',
    arableLand: 'able land needed to produce a fixed quantity of crops',
    populationDensity: 'Humans Density/km2',
    fertilizer: 'All fertilizers used',
    fertilizerPA: 'All fertilizers use per area of cropland',
    fertilizerPC: 'Fertilizer used per Capita[t]',
};
export const LandUseUnits = {
    year: 'Year',
    population: 'count',
    built: 'km²',
    builtPC: 'km²',
    cropland: 'km²',
    croplandPC: 'km²',
    grazing: 'km²',
    grazingPC: 'km²',
    arableLand: 'km²',
    populationDensity: 'people / km²',
    fertilizer: 'ton',
    fertilizerPA: 'ton',
    fertilizerPC: 'ton',
};
