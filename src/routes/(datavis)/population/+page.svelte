<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    import populationUrl from '$lib/assets/population/population.json?url';
    import tileMap from '$lib/assets/tile_grid_map.json';
    import type { Population, PopulationPosition } from '$lib/assets/population/population.model';
    import Highlight from './highlight.svelte';

    const width = 1600,
        height = 1000;

    let svgElem: SVGGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;
    const year = (y: number) => {
        return Math.floor((y - 2030) / 10);
    };
    let highlight: Population | null = null;

    onMount(() => {
        svg = d3.select(svgElem).attr('viewBox', `0 0 ${width},${height}`);

        d3.json(populationUrl).then((data) => {
            const dataMap: { [id: string]: Population } = (data as Population[]).reduce(
                (a, c) => ({ ...a, [c.ISO3_code]: c }),
                {}
            );
            const popPosData = tileMap
                .reduce(
                    (a, c) => [
                        ...a,
                        {
                            ...dataMap[c['alpha-3']],
                            coordinates: c.coordinates,
                            region: c.region,
                            subRegion: c['sub-region'],
                        } as PopulationPosition,
                    ],
                    [] as PopulationPosition[]
                )
                .sort((a, b) => (a.coordinates && b.coordinates && a.coordinates[1] > b.coordinates[1] ? 1 : -1));

            const mapSelection = svg.append('g').selectAll('map').data(popPosData);

            const coords = tileMap.map((r) => r.coordinates as [number, number]).filter(Boolean);
            const extentX = d3.extent(coords.map((c) => c[0])) as [number, number];
            const extentY = d3.extent(coords.map((c) => c[1])) as [number, number];

            const tileSizeX = Math.floor(width / (1 + extentX[1] - extentX[0]));
            const innerTileSizeX = tileSizeX - 2;
            const tileSizeY = Math.floor(height / (1 + extentY[1] - extentY[0]));
            const innerTileSizeY = tileSizeY - 2;

            const grp = mapSelection
                .join('g')
                .filter((d) => d.coordinates?.length == 2 && !!d.ISO3_code)
                .attr(
                    'transform',
                    (d) =>
                        `translate(${tileSizeX * (d.coordinates ? d.coordinates[0] : 0)}, ${
                            tileSizeY * (d.coordinates ? d.coordinates[1] : 0)
                        })`
                )
                .attr('class', (d) => `cntry ${d['region']} ${d.subRegion}`)
                .attr('id', (d) => d.ISO3_code);
            grp.on('mouseover', (e, d: PopulationPosition) => (highlight = d));
            grp.on('mouseclick', (e, d: PopulationPosition) => (highlight = d));

            grp.append('rect')
                .attr('class', 'bgr')
                .attr('width', innerTileSizeX)
                .attr('height', innerTileSizeY)
                .attr('id', (d) => `rect${d.ISO3_code}`)
                .attr('rx', 3);
            const clip = grp.append('clipPath').attr('id', (d) => `rect${d.ISO3_code}`);
            clip.append('rect').attr('width', innerTileSizeX).attr('height', innerTileSizeY).attr('rx', 3);

            grp.append('path')
                .attr('class', 'medium')
                .attr('d', (d) =>
                    d3
                        .line()
                        .x((d) => d[0])
                        .y((d) => d[1])([
                        [0, innerTileSizeY * 0.5],
                        ...d.PopTotal_Medium.map((p, i) => [
                            ((i + 1) / 8) * innerTileSizeX,
                            innerTileSizeY * 0.5 - innerTileSizeY * 0.5 * (p / d.PopTotal_2020 - 1),
                        ]),
                    ] as [number, number][])
                )
                .style('clip-path', (d) => `url(#rect${d.ISO3_code})`);

            grp.append('path')
                .attr('class', 'range')
                .attr('d', (d) =>
                    d3
                        .line()
                        .x((d) => d[0])
                        .y((d) => d[1])([
                        [0, innerTileSizeY * 0.5],
                        ...d.PopTotal_High.map((p, i) => [
                            ((i + 1) / 8) * innerTileSizeX,
                            innerTileSizeY * 0.5 - innerTileSizeY * 0.5 * (p / d.PopTotal_2020 - 1),
                        ]),

                        ...[
                            [0, innerTileSizeY * 0.5],
                            ...d.PopTotal_Low.map((p, i) => [
                                ((i + 1) / 8) * innerTileSizeX,
                                innerTileSizeY * 0.5 - innerTileSizeY * 0.5 * (p / d.PopTotal_2020 - 1),
                            ]),
                        ].reverse(),
                    ] as [number, number][])
                )
                .style('clip-path', (d) => `url(#rect${d.ISO3_code})`);

            grp.append('text')
                .attr('x', innerTileSizeX / 2)
                .attr('y', innerTileSizeY / 4)
                .text((d) => d.ISO3_code);
            grp.append('text')
                .attr('class', 'changeValue')
                .attr('transform', `translate(0,${innerTileSizeY / 2})`)
                .attr('x', innerTileSizeX / 2)
                .attr('y', innerTileSizeY / 4)
                .text((d) => {
                    const ratio = d.PopTotal_Medium[year(2100)] / d.PopTotal_2020;
                    return `${Math.sign(ratio - 1) > 0 ? '+' : ''}${Math.round(100 * ratio - 100)}%`;
                });
        });
    });
</script>

<svelte:head>
    <title>World population</title>
</svelte:head>

<section>
    <div class="page">
        <div>
            <h1>Human population in 2100</h1>
            <div class="credits">
                <div>
                    Data source :
                    <a href="https://population.un.org/wpp/Download/Standard/CSV">
                        <i>United Nations</i>
                    </a>
                </div>
                <div>Used projections: High / Medium / Low <b>fertility</b></div>
                <div>Map source: <a href="https://github.com/mustafasaifee42/Tile-Grid-Map">Tile Grid Map</a></div>
            </div>
        </div>
        <div class="charts">
            <svg bind:this={svgElem} class="map">
                <defs>
                    <linearGradient
                        id="toWhite"
                        gradientTransform="rotate(-45)"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="objectBoundingBox"
                    >
                        <stop offset="50%" stop-color="#FFF0" />
                        <stop offset="85%" stop-color="#FFFF" />
                    </linearGradient>
                    <linearGradient
                        id="toBlack"
                        gradientTransform="rotate(135)"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="objectBoundingBox"
                    >
                        <stop offset="50%" stop-color="#0000" />
                        <stop offset="85%" stop-color="#000F" />
                    </linearGradient>
                </defs>
            </svg>
            {#if highlight != null}
                <Highlight bind:highlight />
            {/if}
        </div>
    </div>
</section>

<style lang="scss" global>
    .page {
        width: auto;
        overflow: auto;
        display: block;
    }
    .charts {
        position: relative;
    }
    .map {
        width: 95vw;
        height: 80vh;
        min-width: 800px;
        min-height: 640px;
    }
    :global(.cntry) {
        opacity: 0.8;
        &:hover {
            opacity: 1;
        }
        :global(rect.bgr) {
            fill: #eee;
        }
        :global(path.medium) {
            mix-blend-mode: overlay;
            stroke: black;
            stroke-width: 0.5;
            fill: none;
        }
        :global(path.range) {
            fill: gray;
            mix-blend-mode: difference;
            opacity: 0.2;
        }
        :global(text) {
            text-anchor: middle;
            dominant-baseline: middle;
        }
        :global(.changeValue) {
            font-size: 0.8em;
        }
    }
    .credits {
        font-size: 0.8em;
    }
    :global(.Africa rect.bgr) {
        fill: #9c755f;
    }

    :global(.Northern.America rect.bgr) {
        fill: #af7aa1;
    }
    :global(.Central.America rect.bgr) {
        fill: #e15759;
    }

    :global(.South.America rect.bgr) {
        fill: #59a14f;
    }

    :global(.Caribbean rect.bgr) {
        fill: #ff9da7;
    }
    :global(.Europe rect.bgr) {
        fill: #76b7b2;
    }

    :global(.Asia rect.bgr) {
        fill: #f28e2c;
    }

    :global(.Oceania rect.bgr) {
        fill: #4e79a7;
    }
    :global(.Australia rect.bgr) {
        fill: #edc949;
    }
</style>
