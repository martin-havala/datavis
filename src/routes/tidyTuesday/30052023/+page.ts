import centenariansUrl from '$lib/assets/oldest_people/centenarians_with_expectations.csv?url';
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    return {
        centenarians: await (await fetch(centenariansUrl)).text(),
    };
}
