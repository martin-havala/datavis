import centenariansUrl from '$lib/assets/oldest_people/centenarians_with_expectations.csv?url';
import { contourDensity, csvParse } from 'd3';
import type { Centenarian, DataPageLoad } from './model.js';
import dayjs from 'dayjs';
import { fieldData } from './helpers.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    return {
        centenarians: await fetch(centenariansUrl)
            .then((c) => c.text())
            .then((text) => csvParse(text) as unknown as Centenarian[])
            .then((cents) => {
                const aliveRank = { male: 1, female: 1, abs: 1 };
                return cents.map((c) => {
                    const age = Math.floor(c.age);
                    const now = new Date();
                    if (c.still_alive === 'alive') {
                        return {
                            ...c,
                            age: -dayjs(c.birth_date).diff(now, 'year'),
                            aliveRank: aliveRank[c.gender]++,
                            aliveRankAbs: aliveRank.abs++,
                        };
                    }
                    return { ...c, age };
                });
            }),
        contours: contourDensity<{ x: number; y: number }>()
            .size([800, 800])
            .cellSize(60)
            .bandwidth(178)
            .thresholds(150)
            .x(({ x }) => x)
            .y(({ y }) => y)(fieldData)
            .reverse()
            .map((c) => c.coordinates)
            .flat(2)
            .slice(0, 160),
    } as DataPageLoad;
}
