export interface Poem {
    author: string;
    title: string;
    translations: {
        en: string[];
        es: string[];
        sk: string[];
    };
}

export interface ReducedPoem {
    author: string;
    title: string;
    translations: {
        en: ForcePoem;
        es: ForcePoem;
        sk: ForcePoem;
    };
}

export interface ForcePoem {
    words: Word[];
    structure: ForceItem[];
}

export interface Word {
    word: string;
    count: number;
}
export interface ForceItem {
    source: string;
    target: string;
    value: number;
}
