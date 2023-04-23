export type KanakawaKeyTypes = 'time' | 'height' | 'direction' | 'phase';

export interface KanakawaRow {
    time: number;
    height: number | null;
    direction: number | null;
    phase: string | null;
    phaseCountdown?: number;
    phaseCounter: number;
    quarterCountdown?: number;
}
