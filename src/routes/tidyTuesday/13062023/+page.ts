import { csvParse } from 'd3';
import type { SafiRow } from './model.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    return {
        safiRows: await fetch(
            'https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2023/2023-06-13/safi_data.csv'
        )
            .then((c) => c.text())
            .then((text) => csvParse(text) as unknown as SafiRow[]),
    };
}
