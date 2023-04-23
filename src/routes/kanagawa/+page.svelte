<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import rawData from '$lib/assets/kanagawa/kanagawa.json';
    import { type KanakawaRow } from '$lib/assets/kanagawa/kanagawa.model';
    import legendSVG from '$lib/assets/kanagawa/legend.svg?url';

    let margin = { top: 20, right: 0, bottom: 20, left: 0 },
        width = 1600 - margin.left - margin.right,
        height = 540 - margin.top - margin.bottom;

    let svgElem: SVGGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;

    onMount(() => {
        // get the data

        let phaseCounter = 0;
        let newMoonCounter = 29;
        let data: KanakawaRow[] = [...rawData];
        let quaters = 0;
        data.reverse().forEach((row) => {
            if (!!row.phase) {
                phaseCounter = 0;
                quaters++;
                if (row.phase == 'New Moon') {
                    newMoonCounter = 0;
                }
            }

            row.phaseCountdown = newMoonCounter;
            row.phaseCounter = quaters;
            row.quarterCountdown = phaseCounter;
            newMoonCounter++;
            phaseCounter++;
        });
        console.log(phaseCounter, quaters);
        quaters++;
        data.reverse();
        svg = d3
            .select(svgElem)
            .attr('viewBox', `0 0 ${width + margin.left + margin.right},${height + margin.top + margin.bottom}`)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const dataSelection = svg.append('g').selectAll('moonCells').data(data);

        const extent = d3.extent(data.map((r) => r.height ?? 0)) as [number, number];
        const color = (val: number | null) => d3.interpolateViridis((val ?? 0 - extent[0]) / (extent[1] - extent[0]));
        const tileSize = width / (quaters + 1);
        const tileCenter = tileSize / 2 + 0.5;
        const grp = dataSelection
            .join('g')
            .attr(
                'transform',
                (d) =>
                    `translate(${width - tileSize - tileSize * (d.phaseCounter ?? 0)}, ${
                        tileSize * 8 - tileSize * (d.quarterCountdown ?? 0)
                    })`
            );
        grp.append('circle')
            .attr('cx', tileCenter)
            .attr('cy', tileCenter)
            .attr('r', tileCenter - 1)
            //.attr('fill', (d) => (d.phase == 'Full Moon' ? 'yellow' : d.phase == 'New Moon' ? 'black' : '#aaa'));
            .attr('fill', (d) => color(d.height));

        grp.append('path')
            .attr('d', `M ${tileCenter},1 ${tileCenter + 5},9 ${tileCenter - 5},9 z`)
            .attr('transform', (d) => `rotate(${d.direction})`)
            .attr('transform-origin', (d) => `${tileCenter} ${tileCenter}`)
            .attr('fill', 'rgba(0,0,0,.5)')
            .append('title')
            .text((d) => d.direction)
            .attr('y', 18);
        grp.append('text')
            .attr('class', 'tileText')
            .text((d) => d.height)
            .attr('text-anchor', 'middle')
            .attr('font-size', 10)
            .attr('dominant-baseline', 'middle')
            .attr('y', tileCenter)
            .attr('fill', (d) => color(d.height))
            .attr('x', tileCenter);

        const moonSelection = svg
            .append('g')
            .selectAll('phaseCells')
            .data(data.filter((f) => f.phase))
            .enter()
            .append('g')
            .attr('transform', (d) => {
                return `translate(${width - tileSize - tileSize * (d.phaseCounter ?? 0)}, ${tileSize * 8})`;
            });
        const moon = moonSelection
            .append('text')
            .attr('font-size', tileSize * 0.8)
            .attr('text-anchor', 'middle')
            .attr('height', tileSize)
            .attr('y', tileSize * 2)
            .attr('x', tileCenter)
            .text((d) => {
                switch (d.phase) {
                    case 'New Moon':
                        return '🌑';
                    case 'First Quarter':
                        return '🌓';
                    case 'Full Moon':
                        return '🌕';
                    case 'Last Quarter':
                        return '🌗';
                }
                return '';
            });

        moonSelection
            .append('text')
            .text((d) => new Date(d.time).toLocaleDateString('en', { dateStyle: 'short' }))
            .attr('y', tileSize * 2.5)
            .attr('x', tileSize / 2)
            .attr('font-size', 10)
            .attr('transform', 'rotate(90)')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'middle')
            .attr('transform-origin', (d) => `${tileSize / 2} ${tileSize * 2.5}`);
    });
</script>

<svelte:head>
    <title>Kanagawa sea</title>
</svelte:head>

<section>
    <div class="page">
        <div>
            <h1>Kanagawa sea</h1>
            <div>Maximum sea wave height & wind direction according to lunar calendar.</div>
            <div>I see what you did there Mr. Hokusai.</div>
        </div>
        <svg bind:this={svgElem} />
        <div class="comments">
            <img src={legendSVG} class="legend" />
            <div>
                <ul>
                    Data sources:
                    <li>
                        sea data - <a
                            href="https://open-meteo.com/en/docs/marine-weather-api#latitude=35.47&longitude=139.63&daily=wave_height_max,wave_direction_dominant&timezone=Europe%2FBerlin&start_date=2022-08-01&end_date=2023-04-19"
                        >
                            open-meteo.com
                        </a>
                    </li>
                    <li>
                        Moon phases
                        <a
                            href="https://aa.usno.navy.mil/calculated/moon/phases?date=2022-08-01&nump=50&format=t&submit=Get+Data"
                        >
                            <i>U.S. Naval Observatory</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .page {
        width: auto;
        overflow-x: hidden;
        overflow-y: auto;
        display: block;
    }
    svg {
        width: 98vw;
    }
    :global(.tileText) {
        fill: navy;
        mix-blend-mode: color-burn;
    }
    .legend {
        float: right;
        width: 33vw;
        max-width: 200px;
    }
</style>
