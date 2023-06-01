export interface Centenarian {
    rank: number;
    name: string;
    birth_date: string;
    death_date: string;
    age: number;
    place_of_death_or_residence: string;
    gender: 'male' | 'female';
    still_alive: 'deceased' | 'alive';
    birth_exp?: number;
    exp_recent?: number;
    aliveRank?: number;
    aliveRankAbs?: number;
}

export interface PeopleDataItem {
    centenarian: Centenarian;
    path: [number, number];
}

export interface AvgGroup {
    gender: string;
    age: number;
    label: string;
}

export interface DataPageLoad {
    contours: GeoJSON.Position[][];
    centenarians: Centenarian[];
}
