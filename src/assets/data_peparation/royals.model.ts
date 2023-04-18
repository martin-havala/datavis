export interface FamilyMember {
    name: string;
    url: string;
    imgSrc: string | null;
    father: FamilyMember | null;
    mother: FamilyMember | null;
    birthplace: Birthplace | null;
}
export interface Birthplace {
    name: string;
    lat: number;
    lng: number;
}

export interface PlaceLocation {
    lat: number;
    lng: number;
}
