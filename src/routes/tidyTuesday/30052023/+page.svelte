<script lang="ts">
    import { mean, select, type Selection } from 'd3';
    import { onMount } from 'svelte';
    import { catmulRomLine, contourIntersection, simpleLine } from './helpers';
    import type { AvgGroup, Centenarian, DataPageLoad, PeopleDataItem } from './model';

    /** @type {import('./$types').PageData} */
    export let data: DataPageLoad;

    const centenariansReduced = data.centenarians.reduce((a, c) => {
        if (a.find((ac) => ac.age == c.age && ac.gender == c.gender && ac.still_alive == c.still_alive)) {
            return a;
        }
        return [...a, c];
    }, [] as Centenarian[]);

    const avgLifespan: AvgGroup[] = [
        { gender: 'male', age: 70, label: 'average' },
        { gender: 'female', age: 75, label: 'average' },
    ];

    function makeLabel(s: Selection<any, any, any, any>, text: null | string | ((...a: any) => string), distance = 12) {
        s.append('text').attr('class', 'label').attr('transform', `translate(${distance},0)`).text(text);
        s.append('circle').attr('r', 3);
        distance > 15 &&
            s
                .append('path')
                .attr('class', 'label__line')
                .attr('d', `M0,0 h${distance - 5}`);
    }

    let svgElem: SVGGElement;
    let svg: Selection<SVGGElement, unknown, any, any>;

    onMount(() => {
        svg = select(svgElem);
        svg.append('g')
            .attr('class', 'contours')
            .selectAll('g')
            .data(data.contours.filter((c, i) => i % 5 == 0 && i < 121) as unknown as [number, number][][])
            .join('path')
            .attr('class', 'contour')
            .attr('d', catmulRomLine);

        const centerPoint = [
            mean(data.contours[0].map((p) => p[0])),
            mean(data.contours[0].map((p) => p[1])),
        ] as GeoJSON.Position;

        const peopleContours = svg
            .append('g')
            .attr('class', 'person_contours')
            .selectAll('g')
            .data<Centenarian>(centenariansReduced)
            .join('g')
            .attr('class', (c) => `person_contour ${c.still_alive} ${c.gender} ${c.aliveRank == 1 ? 'oldest' : ''}`);
        peopleContours.append('path').attr('d', (c) => catmulRomLine(data.contours[Math.floor(c.age)]));

        const avgData = avgLifespan.map((grp) => ({
            grp,
            path: data.contours[Math.floor(grp.age)] as unknown as [number, number][],
        }));
        const averageContours = svg
            .selectAll('g.avg_contours')
            .data<{ grp: AvgGroup; path: [number, number][] }>(avgData)
            .join('g')
            .attr('class', (d) => `avg_contour ${d.grp.gender}`);
        averageContours.append('path').attr('d', (c) => catmulRomLine(c.path));

        const peopleLabels = svg
            .append('g')
            .attr('class', 'people_contours_labels')
            .selectAll('g')
            .data<{
                c: Centenarian;
                pAge: GeoJSON.Position | null;
                p0: GeoJSON.Position | null;
                pBE: GeoJSON.Position | null;
                pRE: GeoJSON.Position | null;
            }>(
                data.centenarians
                    .filter((c) => !!c.aliveRank)
                    .map((c) => {
                        const angle = 80 - 8 * (c.aliveRankAbs ?? 0);
                        return {
                            c,
                            pAge: contourIntersection(data.contours[c.age], centerPoint, angle),
                            p0: contourIntersection(data.contours[0], centerPoint, angle),
                            pBE: contourIntersection(data.contours[Math.round(c.birth_exp ?? 0)], centerPoint, angle),
                            pRE: contourIntersection(data.contours[Math.round(c.exp_recent ?? 0)], centerPoint, angle),
                        };
                    })
            )
            .join('g')
            .attr('class', ({ c }) => `${c.gender} expectation`);

        makeLabel(
            peopleLabels.append('g').attr('transform', ({ pAge }) => `translate(${pAge?.join()})`),
            ({ c }) => (c.aliveRank ? `${c.name}` : '')
        );

        const peopleLabelsExpectations = peopleLabels.append('g').attr('class', 'expectation');

        peopleLabelsExpectations.append('path').attr('d', (c) => `M${c.p0?.join()} L${c.pAge?.join()}`);

        makeLabel(
            peopleLabelsExpectations
                .append('g')
                .attr('class', 'expectation birth label')
                .attr('transform', (c) => `translate(${c.pBE?.join()})`),
            ({ c }) => `${(+(c.birth_exp ?? 0.0)).toFixed(1)}`
        );

        makeLabel(
            peopleLabelsExpectations
                .append('g')
                .attr('class', 'recent label')
                .attr('transform', (c) => `translate(${c.pRE?.join()})`),
            ({ c }) => `${(+(c.exp_recent ?? 0.0)).toFixed(1)}`
        );

        svg.selectAll('path#people_contours_rank')
            .data<Centenarian[]>([data.centenarians.filter((c) => !!c.aliveRank)])
            .join('path')
            .attr('id', 'people_contours_rank')
            .style('marker-end', 'url(#triangleMarker)')
            .attr('stroke', 'red')
            .attr('d', (c) =>
                simpleLine(
                    c.map(
                        (i) =>
                            contourIntersection(
                                data.contours[130 + 2],
                                centerPoint,
                                62 - (i.aliveRankAbs ?? 0) * 1.6
                            ) as [number, number]
                    )
                )
            );

        svg.selectAll('defs')
            .data<Centenarian[]>([data.centenarians.filter((c) => !!c.aliveRank)])
            .join('path')
            .attr('id', 'local_people_contours_rank2')
            .attr('display', 'none')
            .attr('d', (c) =>
                simpleLine(
                    c.map(
                        (i) =>
                            contourIntersection(
                                data.contours[131 + 2],
                                centerPoint,
                                62 - (i.aliveRankAbs ?? 0) * 1.6
                            ) as [number, number]
                    )
                )
            );

        const intersections = data.contours
            .filter((_, i) => i % 10 == 0 && i < 130)
            .map((c) => contourIntersection(c, centerPoint, 86) as GeoJSON.Position);
        const legend = svg
            .append('g')
            .attr('class', 'legend')
            .selectAll('g')
            .data<GeoJSON.Position>(intersections)
            .join('g')
            .attr('transform', (d) => `translate(${d?.join()})`)
            .style('display', (d, i) => (i ? 'visible' : 'none'));

        makeLabel(legend, (_, i) => `${i * 10}`);
    });
</script>

<section>
    <svg width="800" height="800" viewBox="0 0 800 800" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <marker
                id="triangleMarker"
                viewBox="0 0 10 10"
                refX="1"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" style="fill:currentColor; fill-opacity:0.5" />
            </marker>
        </defs>
        <g bind:this={svgElem} />

        <text style="font-size:.8em; opacity:0.5">
            <textPath href="#local_people_contours_rank2" startOffset="50%" text-anchor="middle"
                >alive people in each group</textPath
            >
        </text>

        <g class="side_legend" transform="translate(680, 50)">
            <text x="70" y="0" style="font-size: 3em; text-anchor: end">Oldest living people</text>
            <text x="70" y="50" style="font-size: .9em; text-anchor: end">
                Verified list of the top 100 oldest people per gender</text
            >
            <text x="70" y="75" style="font-size: .7em; text-anchor: end; opacity:0.7">* to 1st June 2023</text>

            <text x="70" y="110" style="font-size: .8em; text-anchor: end">
                <a href="https://en.wikipedia.org/wiki/List_of_verified_oldest_people">datasources: wikipedia</a>
            </text>
            <text x="70" y="130" style="font-size: .8em; text-anchor: end">
                <a href="https://clio-infra.eu/Indicators/LifeExpectancyatBirthTotal.html">clio-infra</a>
            </text>
            <g transform="translate(-10, 50)">
                <g class="male alive" transform="translate(0, 120)">
                    <path d="M0,0 h27" class="person_contour alive" />
                    <text>male</text>
                </g>
                <g class="female alive" transform="translate(0, 140)">
                    <path d="M0,0 h27" class="person_contour alive" />
                    <text>female </text>
                </g>
                <g class="alive" transform="translate(0, 180)">
                    <path d="M0,0 h27" class="person_contour alive" />
                    <text>alive</text>
                </g>
                <g class="person_contour deceased" transform="translate(0, 200)">
                    <path d="M0,0 h27" />
                    <text>deceased</text>
                </g>

                <g class="avg_contour" transform="translate(0, 240)">
                    <path d="M0,0 h27" class="average" />
                    <text>world average</text>
                </g>

                <g class="expectation" transform="translate(-35, 280)">
                    <text>life expectancy</text>
                </g>
                <g class="expectation" transform="translate(-35, 295)">
                    <text>per country:</text>
                </g>
                <g class="expectation birth" transform="translate(0, 320)">
                    <circle cx="13.5" r="3" />
                    <text>at birth</text>
                </g>
                <g class="expectation recent" transform="translate(0, 340)">
                    <circle cx="13.5" r="3" />
                    <text>recent</text>
                </g>
            </g>
        </g>
    </svg>
</section>

<style global lang="scss">
    svg {
        width: 100%;
        overflow: hidden;
    }
    :global(circle) {
        fill: currentColor;
    }
    :global(path) {
        stroke: #ccc2;
        stroke-width: 0.5;
        fill: transparent;
    }
    :global(path:nth-of-type(2n + 1)) {
        stroke: #ccc;
        stroke-opacity: 0.4;
    }
    :global(path:nth-of-type(10n + 1)) {
        stroke: #ccc;
        stroke-opacity: 0.6;
    }
    :global(path:nth-of-type(100n + 1)) {
        stroke: #ccc;
        stroke-opacity: 0.8;
    }
    :global(.person_contour.alive path) {
        stroke-width: 1;
    }

    :global(.person_contour.deceased path) {
        stroke-dasharray: 5 5;
        animation: strokeDashoffset;
        animation-timing-function: linear;
        animation-duration: 200s;
        animation-direction: reverse;
        animation-iteration-count: infinite;

        @media (prefers-reduced-motion) {
            animation: none;
        }
    }
    :global(.person_contour.deceased.male path) {
        animation-direction: normal;
    }

    :global(g.male path, g.male circle) {
        stroke: teal;
        color: teal;
        stroke-dashoffset: 5;
    }
    :global(g.female path, g.female circle) {
        stroke: magenta;
        color: magenta;
    }
    :global(g.oldest path) {
        stroke-width: 2 !important;
    }
    :global(g.avg_contour path) {
        stroke-dasharray: 1 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.5;
    }
    :global(#people_contours_rank) {
        stroke: gray;
    }

    :global(.legend) {
        opacity: 0.6;
    }

    :global(g text, a) {
        font-size: 0.9em;
        fill: #eee;
        stroke: var(--bg-color, red);
        filter: drop-shadow(4px 4px 1px var(--bg-color, red));
        paint-order: stroke fill;
        stroke-width: 5;
    }
    :global(.side_legend path) {
        animation: none !important;
        stroke-width: 3;
        stroke-linecap: butt;
    }
    :global(g.side_legend text) {
        transform: translateX(33px);
    }

    :global(g.people_contours_labels) {
        cursor: pointer;
        :global(circle) {
            stroke-width: 3 !important;
            stroke: var(--bg-color, black);
            paint-order: stroke fill;
        }
    }
    :global(text) {
        dominant-baseline: middle;
    }

    :global(.label) {
        text-anchor: start;
    }

    :global(g.expectation .label text) {
        display: none;
    }
    :global(g.expectation:hover .label text) {
        display: block;
        opacity: 0.8;
    }

    :global(g.expectation > path) {
        opacity: 0.4;
    }

    :global(g.expectation > path, .expectation.birth circle) {
        stroke: #fffa;
        stroke-width: 1 !important;
        fill: var(--bg-color, none);
    }
    :global(g.expectation .recent circle, .expectation.recent circle) {
        stroke: none;
        fill: #fff6;
    }
</style>
