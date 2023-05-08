export const EGOV_COLS = [
    'I-2.3',
    'I-3.3',
    'I-5.5',
    'I-6.4',
    'I-7.5',
    'I-8.5',
    'I-9.3',
    'I-10.3',
    'I-11.6',
    'I-12.3',
    'I-13.3',
    'I-14.3',
    // 'I-33.3',
    'I-38.3',
    'I-42.2',
];
export const EGOV_COL_LABELS = {
    'I-2.3': 'Government enterprise architecture framework',
    'I-3.3': 'Government interoperability framework',
    'I-5.5': 'Financial Management IS',
    'I-7.5': 'Tax admin launched',
    'I-6.4': 'Treasury single account',
    'I-8.5': 'Customs administration launched',
    'I-9.3': 'HR launched',
    'I-10.3': 'Payroll system (MIS) launched',
    'I-11.6': 'Social Insurance system',
    'I-12.3': 'E-Procurement',
    'I-13.3': 'Debt Management System',
    'I-14.3': 'Public Investment Management System',
    'I-33.3': 'Establishing GovTech Institution',
    'I-38.3': 'Data protection Law',
    'I-42.2': 'Digital signature regulation',
};
export const EGOV_COL_INFO_CELLS = {
    'I-2.3': { url: 'I-2.2', name: 'I-2.1' },
    'I-3.3': { url: 'I-3.2', name: 'I-3.1' },
    'I-5.5': { url: 'I-5.4', name: 'I-5.3', type: 'I-5.8' },
    'I-6.4': { url: 'I-6.3', name: 'I-6.3' },
    'I-7.5': { url: 'I-7.4', name: 'I-7.3', type: 'I-7.6' },
    'I-8.5': { url: 'I-8.4', name: 'I-8.3', type: 'I-8.6' },
    'I-9.3': { url: 'I-9.2', name: 'I-9.1', type: 'I-9.4' },
    'I-10.3': { url: 'I-10.2', name: 'I-10.1', type: 'I-10.4' },
    'I-11.6': { url: 'I-11.5', name: 'I-11.4', type: 'I-11.8' },
    'I-12.3': { url: 'I-12.2', name: 'I-12.1' },
    'I-13.3': { url: 'I-13.2', name: 'I-13.1', type: 'I-13.4' },
    'I-14.3': { url: 'I-14.2', name: 'I-14.1', type: 'I-14.4' },
    'I-33.3': { url: 'I-33.2', name: 'I-33.1' },
    'I-38.3': { url: 'I-38.2', name: 'I-38.1' },
    'I-42.2': { url: 'I-42.1', name: 'I-42.1' },
};

import type {
    I_10_6,
    I_11,
    I_11_10,
    I_11_11,
    I_11_13,
    I_11_14,
    I_11_15,
    I_11_7,
    I_11_8,
    I_11_9,
    I_12_5,
    I_12_6,
    I_12_8,
    I_14_6,
    I_14_7,
    I_15_3,
    I_15_4,
    I_17_5,
    I_17_6,
    I_17_7,
    I_19_2,
    I_19_3,
    I_19_4,
    I_19_5,
    I_19_6,
    I_19_7,
    I_1_4,
    I_1_6,
    I_1_7,
    I_1_8,
    I_1_9,
    I_20_2,
    I_20_3,
    I_20_4,
    I_20_5,
    I_21_2,
    I_21_3,
    I_21_4,
    I_21_5,
    I_22_2,
    I_22_3,
    I_22_4,
    I_23_2,
    I_23_3,
    I_23_4,
    I_24,
    I_24_2,
    I_24_3,
    I_24_4,
    I_24_5,
    I_25,
    I_25_2,
    I_25_3,
    I_25_4,
    I_25_5,
    I_28_2,
    I_28_3,
    I_29_2,
    I_29_3,
    I_29_4,
    I_2_4,
    I_2_5,
    I_2_6,
    I_2_7,
    I_2_8,
    I_30_3,
    I_30_5,
    I_31_4,
    I_31_5,
    I_31_6,
    I_32_2,
    I_32_3,
    I_32_4,
    I_33_10,
    I_33_4,
    I_33_5,
    I_33_8,
    I_33_9,
    I_34_7,
    I_36_2,
    I_36_3,
    I_36_4,
    I_37_3,
    I_37_4,
    I_38_4,
    I_38_5,
    I_39_4,
    I_3_4,
    I_3_5,
    I_3_6,
    I_3_7,
    I_3_8,
    I_3_9,
    I_42_3,
    I_42_4,
    I_42_5,
    I_42_6,
    I_45_5,
    I_45_5_1,
    I_45_5_3,
    I_45_6,
    I_45_7,
    I_46_4,
    I_46_4_1,
    I_46_4_3,
    I_46_5,
    I_47_5,
    I_47_5_1,
    I_47_6,
    I_48,
    I_48_4,
    I_48_5,
    I_48_6,
    I_48_7,
    I_4_4,
    I_4_5,
    I_4_6,
    I_5_10,
    I_5_11,
    I_5_12,
    I_5_13,
    I_5_14,
    I_6_5,
    I_6_6,
    I_6_7,
    I_6_8,
    I_7_7,
    I_7_8,
    I_8_7,
    I_8_8,
    I_8_9,
    I_9_6,
    I_9_7,
    I_9_8,
    I_9_9,
} from './e_gov.metadata';

export interface eGov {
    begin: number;
    end: number;
    grouped: { year: number; values: string[] }[];
    Year: number;
    Code: string;
    Economy: string;
    'I-1': number;
    'I-1.1': string;
    'I-1.2': string;
    'I-1.3': string;
    'I-1.4': I_1_4;
    'I-1.5': string;
    'I-1.6': I_1_6;
    'I-1.6.1': string;
    'I-1.7': I_1_7;
    'I-1.8': I_1_8;
    'I-1.9': I_1_9;
    'I-1.9.1': string;
    'I-2': number;
    'I-2.1': string;
    'I-2.2': string;
    'I-2.3': number;
    'I-2.4': I_2_4;
    'I-2.5': I_2_5;
    'I-2.6': I_2_6;
    'I-2.7': I_2_7;
    'I-2.8': I_2_8;
    'I-2.8.1': string;
    'I-3': number;
    'I-3.1': string;
    'I-3.2': string;
    'I-3.3': number;
    'I-3.4': I_3_4;
    'I-3.5': I_3_5;
    'I-3.6': I_3_6;
    'I-3.7': I_3_7;
    'I-3.8': I_3_8;
    'I-3.9': I_3_9;
    'I-3.9.1': string;
    'I-4': number;
    'I-4.1': string;
    'I-4.2': string;
    'I-4.3': string;
    'I-4.4': I_4_4;
    'I-4.5': I_4_5;
    'I-4.6': I_4_6;
    'I-4.6.1': string;
    'I-5': number;
    'I-5.1': string;
    'I-5.2': string;
    'I-5.3': string;
    'I-5.4': string;
    'I-5.5': number;
    'I-5.6': number;
    'I-5.7': number;
    'I-5.8': number;
    'I-5.9': string;
    'I-5.10': I_5_10;
    'I-5.11': I_5_11;
    'I-5.12': I_5_12;
    'I-5.13': I_5_13;
    'I-5.14': I_5_14;
    'I-5.14.1': string;
    'I-6': number;
    'I-6.1': string;
    'I-6.2': number;
    'I-6.3': string;
    'I-6.4': number;
    'I-6.5': I_6_5;
    'I-6.6': I_6_6;
    'I-6.7': I_6_7;
    'I-6.8': I_6_8;
    'I-6.8.1': string;
    'I-7': number;
    'I-7.1': string;
    'I-7.2': number;
    'I-7.3': string;
    'I-7.4': string;
    'I-7.5': number;
    'I-7.6': number;
    'I-7.7': I_7_7;
    'I-7.8': I_7_8;
    'I-7.8.1': string;
    'I-8': number;
    'I-8.1': string;
    'I-8.2': number;
    'I-8.3': string;
    'I-8.4': string;
    'I-8.5': number;
    'I-8.6': number;
    'I-8.7': I_8_7;
    'I-8.8': I_8_8;
    'I-8.9': I_8_9;
    'I-8.9.1': string;
    'I-9': number;
    'I-9.1': string;
    'I-9.2': string;
    'I-9.3': number;
    'I-9.4': number;
    'I-9.5': number;
    'I-9.6': I_9_6;
    'I-9.7': I_9_7;
    'I-9.8': I_9_8;
    'I-9.9': I_9_9;
    'I-9.9.1': string;
    'I-10': number;
    'I-10.1': string;
    'I-10.2': string;
    'I-10.3': string;
    'I-10.4': number;
    'I-10.5': number;
    'I-10.6': I_10_6;
    'I-10.6.1': string;
    'I-11': I_11;
    'I-11.1': string;
    'I-11.2': string;
    'I-11.3': number;
    'I-11.4': string;
    'I-11.5': string;
    'I-11.6': string;
    'I-11.7': I_11_7;
    'I-11.8': I_11_8;
    'I-11.9': I_11_9;
    'I-11.10': I_11_10;
    'I-11.11': I_11_11;
    'I-11.12': string;
    'I-11.13': I_11_13;
    'I-11.13.1': string;
    'I-11.14': I_11_14;
    'I-11.15': I_11_15;
    'I-11.15.1': string;
    'I-12': number;
    'I-12.1': string;
    'I-12.2': string;
    'I-12.3': number;
    'I-12.4': number;
    'I-12.5': I_12_5;
    'I-12.6': I_12_6;
    'I-12.7': string;
    'I-12.8': I_12_8;
    'I-12.8.1': string;
    'I-13': number;
    'I-13.1': string;
    'I-13.2': string;
    'I-13.3': number;
    'I-13.4': number;
    'I-13.5': string;
    'I-14': number;
    'I-14.1': string;
    'I-14.2': string;
    'I-14.3': string;
    'I-14.4': number;
    'I-14.5': number;
    'I-14.6': I_14_6;
    'I-14.7': I_14_7;
    'I-14.7.1': string;
    'I-15': number;
    'I-15.1': string;
    'I-15.2': number;
    'I-15.3': I_15_3;
    'I-15.4': I_15_4;
    'I-15.4.1': string;
    'I-16': number;
    'I-17': number;
    'I-17.1': string;
    'I-17.2': string;
    'I-17.3': string;
    'I-17.4': string;
    'I-17.5': I_17_5;
    'I-17.5.1': string;
    'I-17.6': I_17_6;
    'I-17.7': I_17_7;
    'I-17.7.1': string;
    'I-18': number;
    'I-19': number;
    'I-19.1': string;
    'I-19.2': I_19_2;
    'I-19.3': I_19_3;
    'I-19.4': I_19_4;
    'I-19.5': I_19_5;
    'I-19.6': I_19_6;
    'I-19.7': I_19_7;
    'I-19.7.1': string;
    'I-20': number;
    'I-20.1': string;
    'I-20.2': I_20_2;
    'I-20.3': I_20_3;
    'I-20.4': I_20_4;
    'I-20.5': I_20_5;
    'I-21': number;
    'I-21.1': string;
    'I-21.2': I_21_2;
    'I-21.3': I_21_3;
    'I-21.4': I_21_4;
    'I-21.5': I_21_5;
    'I-22': number;
    'I-22.1': string;
    'I-22.2': I_22_2;
    'I-22.3': I_22_3;
    'I-22.4': I_22_4;
    'I-23': number;
    'I-23.1': string;
    'I-23.2': I_23_2;
    'I-23.3': I_23_3;
    'I-23.4': I_23_4;
    'I-24': I_24;
    'I-24.1': string;
    'I-24.2': I_24_2;
    'I-24.3': I_24_3;
    'I-24.4': I_24_4;
    'I-24.5': I_24_5;
    'I-25': I_25;
    'I-25.1': string;
    'I-25.2': I_25_2;
    'I-25.3': I_25_3;
    'I-25.4': I_25_4;
    'I-25.5': I_25_5;
    'I-26': string;
    'I-27': number;
    'I-28': number;
    'I-28.1': string;
    'I-28.2': I_28_2;
    'I-28.3': I_28_3;
    'I-29': number;
    'I-29.1': string;
    'I-29.2': I_29_2;
    'I-29.3': I_29_3;
    'I-29.4': I_29_4;
    'I-30': number;
    'I-30.1': string;
    'I-30.2': number;
    'I-30.2.1': string;
    'I-30.3': I_30_3;
    'I-30.4': number;
    'I-30.5': I_30_5;
    'I-30.6': number;
    'I-30.6.1': string;
    'I-31': number;
    'I-31.1': string;
    'I-31.2': number;
    'I-31.3': number;
    'I-31.4': I_31_4;
    'I-31.5': I_31_5;
    'I-31.6': I_31_6;
    'I-31.6.1': string;
    'I-32': number;
    'I-32.1': string;
    'I-32.2': I_32_2;
    'I-32.3': I_32_3;
    'I-32.4': I_32_4;
    'I-33': number;
    'I-33.1': string;
    'I-33.2': string;
    'I-33.3': string;
    'I-33.4': I_33_4;
    'I-33.5': I_33_5;
    'I-33.6': string;
    'I-33.7': string;
    'I-33.8': I_33_8;
    'I-33.8.1': string;
    'I-33.9': I_33_9;
    'I-33.9.1': string;
    'I-33.10': I_33_10;
    'I-33.10.1': string;
    'I-34': number;
    'I-34.1': string;
    'I-34.2': string;
    'I-34.3': string;
    'I-34.4': number;
    'I-34.5': number;
    'I-34.6': number;
    'I-34.6.1': string;
    'I-34.7': I_34_7;
    'I-34.7.1': string;
    'I-35': number;
    'I-35.1': string;
    'I-35.2': number;
    'I-36': number;
    'I-36.1': string;
    'I-36.2': I_36_2;
    'I-36.2.1': string;
    'I-36.3': I_36_3;
    'I-36.3.1': string;
    'I-36.4': I_36_4;
    'I-36.4.1': string;
    'I-37': number;
    'I-37.1': string;
    'I-37.2': number;
    'I-37.3': I_37_3;
    'I-37.4': I_37_4;
    'I-37.4.1': string;
    'I-38': number;
    'I-38.1': string;
    'I-38.2': string;
    'I-38.3': string;
    'I-38.4': I_38_4;
    'I-38.5': I_38_5;
    'I-38.5.1': string;
    'I-39': number;
    'I-39.1': string;
    'I-39.2': string;
    'I-39.3': string;
    'I-39.4': I_39_4;
    'I-39.4.1': string;
    'I-40': number;
    'I-41': number;
    'I-42': number;
    'I-42.1': string;
    'I-42.2': number;
    'I-42.3': I_42_3;
    'I-42.4': I_42_4;
    'I-42.5': I_42_5;
    'I-42.6': I_42_6;
    'I-42.6.1': string;
    'I-43': number;
    'I-44': number;
    'I-45': number;
    'I-45.1': string;
    'I-45.2': string;
    'I-45.3': number;
    'I-45.4': number;
    'I-45.5': I_45_5;
    'I-45.5.1': I_45_5_1;
    'I-45.5.2': string;
    'I-45.5.3': I_45_5_3;
    'I-45.6': I_45_6;
    'I-45.7': I_45_7;
    'I-45.7.1': string;
    'I-46': number;
    'I-46.1': string;
    'I-46.2': string;
    'I-46.3': number;
    'I-46.4': I_46_4;
    'I-46.4.1': I_46_4_1;
    'I-46.4.2': string;
    'I-46.4.3': I_46_4_3;
    'I-46.5': I_46_5;
    'I-46.5.1': string;
    'I-47': number;
    'I-47.1': string;
    'I-47.2': string;
    'I-47.3': string;
    'I-47.4': number;
    'I-47.5': I_47_5;
    'I-47.5.1': I_47_5_1;
    'I-47.6': I_47_6;
    'I-47.6.1': string;
    'I-48': I_48;
    'I-48.1': string;
    'I-48.2': string;
    'I-48.3': string;
    'I-48.4': I_48_4;
    'I-48.5': I_48_5;
    'I-48.6': I_48_6;
    'I-48.6.1': string;
    'I-48.7': I_48_7;
    'I-48.7.1': string;
    Src: string;
    Reg: string;
    Level: string;
    FCS: string;
    Borr: string;
    Population: number;
    Sel: number;
    'Additional clarification': string;
    'Attach-1': string;
    'Attach-2': string;
    'Attach-3': string;
    'Attach-4': string;
    'Attach-5': string;
    'Attach-6': string;
    'Attach-7': string;
    'Attach-8': string;
    'Attach-9': string;
    'Attach-10': string;
    'Supporting documents': string;
    'Submitted by': string;
    Organization: string;
    Position: string;
    Grp: string;
    GTMI: number;
    GT1: string;
    CGSI: number;
    GT2: string;
    PSDI: number;
    GT3: string;
    DCEI: number;
    GT4: string;
    GTEI: number;
}


export const COLOR_SCALE = [
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#9a6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#808080',
    '#ffffff',
    '#000000',
];