<script lang="ts">
    import * as d3 from 'd3';

    import { onMount } from 'svelte';
    import type { Centenarian } from './model';
    /** @type {import('./$types').PageData} */
    export let data;

    const centenarians: Centenarian[] = (d3.csvParse(data.centenarians) as unknown as Centenarian[]).map((c) => ({
        ...c,
        age: Math.floor(c.age),
    }));
    const centenariansReduced = centenarians.reduce((a, c) => {
        if (a.find((ac) => ac.age == c.age && ac.gender == c.gender && ac.still_alive == c.still_alive)) {
            return a;
        }
        return [...a, c];
    }, [] as Centenarian[]);

    const polarPoint = (radius: number, i: number) => {
        const angle = 2 * Math.PI * Math.random();

        const x = 250 - 10 * i;
        const y = 700 - radius * Math.sin(angle);
        return { x, y };
    };
    const polarLine = (center: GeoJSON.Position, angleDeg: number) => {
        const angle = angleDeg * (Math.PI / 180);
        const x = center[0] + 5000 * Math.cos(angle);
        const y = center[1] - 5000 * Math.sin(angle);
        return [center, [x, y]] as [GeoJSON.Position, GeoJSON.Position];
    };

    interface AvgGroup {
        gender: string;
        age: number;
        label: string;
    }

    const avgLifespan: AvgGroup[] = [
        { gender: 'male', age: 70, label: 'average' },
        { gender: 'female', age: 75, label: 'average' },
    ];

    function makeLabel(s: d3.Selection<any, any, any, any>, text: null | string | ((a: any) => string), distance = 7) {
        s.append('text').attr('class', 'label').attr('transform', `translate(${distance},0)`).text(text);
        s.append('circle').attr('r', 2);
        distance > 15 &&
            s
                .append('path')
                .attr('class', 'label__line')
                .attr('d', `M0,0 h${distance - 5}`);
    }

    const fieldData = Array(44)
        .fill(1)
        .map((_, i) => {
            return polarPoint(12 * i - 1, i);
        });

    let svgElem: SVGGElement;
    let svg: d3.Selection<SVGGElement, unknown, any, any>;

    const lineIntersection = (
        [[a, b], [c, d]]: [GeoJSON.Position, GeoJSON.Position],
        [[p, q], [r, s]]: [GeoJSON.Position, GeoJSON.Position]
    ): null | GeoJSON.Position => {
        let det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return null;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

            if (0 < lambda && lambda < 1 && 0 < gamma && gamma < 1) {
                return [a + (c - a) * lambda, b + (d - b) * lambda];
            }
            return null;
        }
    };

    onMount(() => {
        svg = d3.select(svgElem);

        {
            const aliveRank = { male: 1, female: 1, abs: 1 };
            centenarians.forEach((c) => {
                if (c.still_alive === 'alive') {
                    c.aliveRank = aliveRank[c.gender]++;
                    c.aliveRankAbs = aliveRank.abs++;
                }
            });
        }

        const contours = d3
            .contourDensity<{ x: number; y: number }>()
            .size([800, 800])
            .cellSize(30)
            .bandwidth(240)
            .thresholds(150)
            .x(({ x }) => x)
            .y(({ y }) => y)(fieldData)
            .reverse()
            .map((c) => c.coordinates)
            .flat(2)
            .slice(0, 160)
            .map((c) => [...c]);

        const line = d3
            .line()
            .curve(d3.curveCatmullRom)
            .x((d) => d[0])
            .y((d) => d[1]);

        svg.append('g')
            .attr('class', 'contours')
            .selectAll('g')

            .data(contours.filter((c, i) => i % 5 == 0 && i < 121) as unknown as [number, number][][])
            .join('path')
            .attr('class', 'contour')
            .attr('d', line);

        const centerPoint = [
            d3.mean(contours[0].map((p) => p[0])),
            d3.mean(contours[0].map((p) => p[1])),
        ] as GeoJSON.Position;

        const reduceLine = (contour: GeoJSON.Position[], angle: number = 0) => {
            const crossLine = polarLine(centerPoint, angle);

            for (let i = 0; i < contour.length - 1; i++) {
                const line2: [GeoJSON.Position, GeoJSON.Position] = [contour[i], contour[i + 1]];
                const positions = lineIntersection(crossLine, line2);
                if (positions) {
                    return positions;
                }
            }
            return null;
        };

        interface PeopleDataItem {
            centenarian: Centenarian;
            path: [number, number];
        }
        const peopleData: PeopleDataItem[] = centenariansReduced.map((centenarian) => ({
            centenarian,
            path: contours[Math.floor(centenarian.age)] as unknown as [number, number],
        }));

        const peopleContours = svg
            .append('g')
            .attr('class', 'person_contours')
            .selectAll('g')
            .data<PeopleDataItem>(peopleData)
            .join('g')
            .attr(
                'class',
                (d) =>
                    `person_contour ${d.centenarian.still_alive} ${d.centenarian.gender} ${
                        d.centenarian.aliveRank == 1 ? 'oldest' : ''
                    }`
            );
        peopleContours.append('path').attr('d', (c) => line(c.path));

        const avgData = avgLifespan.map((grp) => ({
            grp,
            path: contours[Math.floor(grp.age)] as unknown as [number, number][],
        }));
        const averageContours = svg
            .selectAll('g.avg_contours')
            .data<{ grp: AvgGroup; path: [number, number][] }>(avgData)
            .join('g')
            .attr('class', (d) => `avg_contour ${d.grp.gender}`);
        averageContours.append('path').attr('d', (c) => line(c.path));

        makeLabel(
            svg
                .append('g')
                .attr('class', 'people_contours_labels')
                .selectAll('g')
                .data<Centenarian>(centenarians.filter((c) => !!c.aliveRank))
                .join('g')
                .attr('class', (d) => d.gender)
                .attr(
                    'transform',
                    (c) => `translate(${reduceLine(contours[c.age], 70 - 5 * (c.aliveRankAbs ?? 0))?.join()})`
                ),
            (d: Centenarian) => (d.aliveRank ? `${d.name}` : ''),
            12
        );

        const line2 = d3
            .line()
            .x((d) => d[0])
            .y((d) => d[1]);
        svg.selectAll('path#people_contours_rank')
            .data<Centenarian[]>([centenarians.filter((c) => !!c.aliveRank)])
            .join('path')
            .attr('id', 'people_contours_rank')
            .style('marker-end', 'url(#triangleMarker)')
            .attr('stroke', 'red')
            .attr('d', (c) =>
                line2(c.map((i) => reduceLine(contours[130 + 1], 55 - (i.aliveRankAbs ?? 0)) as [number, number]))
            );

        svg.selectAll('defs')
            .data<Centenarian[]>([centenarians.filter((c) => !!c.aliveRank)])
            .join('path')
            .attr('id', 'local_people_contours_rank2')
            .attr('display', 'none')
            .attr('d', (c) =>
                line2(c.map((i) => reduceLine(contours[131 + 1], 55 - (i.aliveRankAbs ?? 0)) as [number, number]))
            );

        const intersections = contours.filter((_, i) => i % 10 == 0 && i < 130).map((c, i) => reduceLine(c, 80));
        const legend = svg
            .append('g')
            .attr('class', 'legend')
            .selectAll('g')
            .data(intersections)
            .join('g')
            .attr('transform', (d) => `translate(${d?.join()})`)
            .style('display', (d, i) => (i ? 'visible' : 'none'));
        makeLabel(legend, (d, i) => i * 10);
    });
</script>

<section >
    <svg viewBox="0 0 800 800" xmlns:xlink="http://www.w3.org/1999/xlink">
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

        <text style="font-size: 0.7em; opacity:0.5">
            <textPath href="#local_people_contours_rank2" startOffset="50%" text-anchor="middle"
                >alive people by rank</textPath
            >
        </text>

        <g class="side_legend" transform="translate(680, 50)">
            <text x="70" y="0" style="font-size: 3em; text-anchor: end">Oldest living people</text>
            <text x="70" y="50" style="font-size: .9em; text-anchor: end"> Verified list of the oldest people</text>

            <text x="70" y="100" style="font-size: .8em; text-anchor: end">
                <a href="https://en.wikipedia.org/wiki/List_of_verified_oldest_people">datasource: wikipedia</a>
            </text>
            <g transform="translate(-10, 20)">
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
                <g class="" transform="translate(0, 200)">
                    <path d="M0,0 h27" class="person_contour deceased" />
                    <text>deceased</text>
                </g>

                <g class="avg_contour" transform="translate(0, 240)">
                    <path d="M0,0 h27" class="average" />
                    <text>world average</text>
                </g>
            </g>
        </g>
    </svg>
</section>

<style global lang="scss">
    svg {
        width: 100vw;
        height: 100vmin;
        position: fixed;
        left: 50%;
        top: 0;
        overflow: hidden;
        transform: translateX(-50%);
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
        animation: strokeDashoffset;
        animation-duration: 500s;
        animation-timing-function: linear;
        @media (prefers-reduced-motion) {
            animation: none;
        }
    }
    :global(#people_contours_rank) {
        stroke: gray;
    }

    :global(.legend) {
        opacity: 0.6;
    }

    :global(g text, a) {
        font-size: 0.8em;
        fill: #eee;
        stroke: var(--bg-color, red);
        filter: drop-shadow(4px 4px 1px var(--bg-color, red));
        paint-order: stroke fill;
        stroke-width: 5;
    }
    :global(.side_legend path) {
        animation: none !important;
    }
    :global(g.side_legend text) {
        transform: translateX(33px);
    }

    :global(g.people_contours_labels) {
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
</style>
