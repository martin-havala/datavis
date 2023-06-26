<script lang="ts">
    import { select, type Selection } from 'd3';
    import { onMount } from 'svelte';
    import type { SafiRow } from './model';

    /** @type {import('./$types').PageData} */
    export let data: { safiRows: SafiRow[] };

    let svgElem: SVGGElement;
    let svg: Selection<SVGGElement, unknown, any, any>;

    onMount(() => {
        svg = select(svgElem);
        svg.append('g').attr('class', 'contours').selectAll('g').data(data.safiRows);
    });
</script>

{@html JSON.stringify(data.safiRows[0]).replaceAll(',',',<br/>')}
<section>
    <svg width="800" height="800" viewBox="0 0 800 800" xmlns:xlink="http://www.w3.org/1999/xlink" />
</section>

<style global lang="scss">
    section {
        svg {
            width: 100vmin;
            height: 100vmin;
            overflow: visible;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
