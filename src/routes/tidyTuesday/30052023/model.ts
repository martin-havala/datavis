export interface Centenarian {
    rank: number;
    name: string;
    birth_date: string;
    death_date: string;
    age: number;
    place_of_death_or_residence: string;
    gender: 'male' | 'female';
    still_alive: 'deceased' | 'alive';
    aliveRank?: number;
    aliveRankAbs?: number;
}
