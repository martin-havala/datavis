import press2025 from "$lib/assets/state_expenses_2024.csv?url";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: { fetch: any }) {
  const res2025: Response = await fetch(press2025);
  return { inputTsv: await res2025.text() };
}
