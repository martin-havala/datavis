export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    return {
        centenarians: await(await fetch('https://raw.githubusercontent.com/frankiethull/centenarians/main/centenarians.csv')).text()
    };
}
