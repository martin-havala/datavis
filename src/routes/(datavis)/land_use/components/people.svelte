<script lang="ts">
    import * as d3 from 'd3';

    import { onMount } from 'svelte';
    import { PEOPLE_POSITIONS } from '$lib/assets/land_use/people_positions';
    import landUseUrl from '$lib/assets/land_use/land_use.csv?url';
    import { LandUseLabels, type LandUsePlot } from '$lib/assets/land_use/land_use.model';
    let legend: SVGGElement;
    onMount(() => {
        d3.csv(landUseUrl).then((landUse) => {
            let res: LandUsePlot = { key: 'any', values: [], max: 0, today: 0 };
            landUse.forEach((lu) => {
                ['populationDensity'].forEach((key) => {
                    const realKEy = LandUseLabels[key];
                    const value = Math.floor(!!lu[realKEy] && parseFloat(lu[realKEy] as string));
                    const year = +(lu?.Year ?? 0);
                    if (value) {
                        res.values?.push([year, value]);
                        res.max = Math.max(value, res.max);
                        res.today = value;
                    } else {
                        res = { key, values: [[year, value]], max: value, today: value };
                    }
                });
            });

            const color = (val: number) =>
                d3.interpolateViridis(1 - val / (res.values[res.values.length - 1][1] - res.values[0][1]));
            const peopleIds = Array(50)
                .fill(1)
                .map((_, i) => i);

            const legendSelection = d3.select(legend);
            const scale = d3
                .scaleLinear()
                .range([0, 330])
                .domain([res.values[res.values.length - 1][0], res.values[0][0]]);

            let lastUsed = 0;
            res.values.forEach((val, i) => {
                Array(val[1] - lastUsed)
                    .fill(1)
                    .map((_, i) => peopleIds[i + lastUsed])
                    .forEach((id) => {
                        const movedHere = val[0] == 1500 ? 'I live here since ' : "I've moved here in ";
                        document.querySelectorAll(`#p${id}`).forEach((e) => {
                            (e as SVGGElement).style.setProperty('--color', color(val[1]));
                            d3.select(`#p${id} text`).text(`${movedHere}${val[0]}.`);
                        });
                    });
                lastUsed = val[1];
                const legendItem = legendSelection.append('g');

                legendItem
                    .attr('transform', `translate(300,${330 - scale(val[0])})`)
                    .append('rect')
                    .style('fill', color(val[1]))
                    .attr('width', val[1])
                    .attr('height', scale(val[0]));
                if (i == 0 || i == res.values.length - 1) {
                    legendItem
                        .append('text')
                        .attr('x', val[1] + 10)
                        .text(val[0])
                        .attr('dominant-baseline', 'middle');
                }
            });
        });
    });
</script>

<g bind:this={legend} transform="translate(181,641)" />
<g transform="matrix(0.788788,0,0,0.788788,577.797,260.419)" class="people">
    <g transform="matrix(1.27825,0,0,1.27825,-789.54,-693.315)">
        <text x="470" y="1250">km²</text>
        <rect x="171.197" y="923.712" width="330" height="330" style="fill:none;stroke:white;stroke-width:0.99px;" />
    </g>

    {#each PEOPLE_POSITIONS as person, index}
        <g class="person" id="p{index}" transform="matrix(1,0,0,1,{person[0]},{person[1]})" style="animation-delay:$">
            <g transform="matrix(1,0,0,1,-700,-102)">
                <path
                    d="M762.235,927.928C763.847,916.819 761.793,900.683 745.369,898.328C728.055,900.254 722.953,913.964 725.127,927.928C728.418,921.447 729.947,915.231 733.828,913.062C726.277,926.35 729.408,948.415 733.828,961.543C737.352,941.769 751.703,941.631 754.308,961.543C757.723,954.028 761.079,922.867 754.308,913.062C758.01,915.925 760.097,920.265 762.235,927.928Z"
                    style="fill:var(--color);stroke:#77a;stroke-width:1.27px;"
                />
            </g>
            <g transform="matrix(1,0,0,1,-701.464,-91.0269)">
                <circle cx="746.833" cy="882.924" r="12.431" style="fill:#eee;stroke:white;stroke-width:1.27px;" />
            </g>

            <g transform="matrix(1.26777,0,0,1.26777,-309.49,-372.125)">
                <path
                    style="stroke: black; opacity:0.8"
                    d="M283.273,944.544L288.286,949.557M283.273,940.544L288.286,945.557M283.273,936.544L288.286,941.557M283.273,948.544L288.286,953.557M283.273,952.544L288.286,957.557M280.089,954.359L287.089,961.359M276.089,954.359L280.089,958.359M274.089,956.359L276.61,958.88M272.089,958.359L274.089,960.359M271.089,961.359L272.55,962.821M270.089,964.359L271.089,965.359"
                />
            </g>

            <g class="tooltip" transform="matrix(1.26777,0,0,1.26777,-491.55,-360.373)">
                <g transform="matrix(1.35369,0,0,1,-138.17,-0.605946)">
                    <path
                        d="M560.92,870.008C560.92,866.14 558.6,863 555.743,863L430.676,863C427.819,863 425.499,866.14 425.499,870.008L425.499,884.024C425.499,887.891 427.819,891.032 430.676,891.032L555.743,891.032C558.6,891.032 560.92,887.891 560.92,884.024L560.92,870.008Z"
                        style="stroke:var(--color);"
                    />
                </g>
                <g transform="matrix(1,0,0,1,80,0.542017)">
                    <text x="449.584px" y="880.046px" />
                </g>
                <g transform="matrix(-0.707107,-0.707107,0.707107,-0.707107,425.999,1319.47)">
                    <path d="M285.55,311.03L302.302,311.03L294.414,302.206L285.55,311.03Z" style="fill:var(--color);" />
                </g>
            </g>
        </g>
    {/each}
</g>

<style lang="scss">
    .tooltip {
        opacity: 0;
        pointer-events: none;
        text-anchor: middle;
        fill: white;
        text {
            fill: #111;
            font-family: 'Comic Sans MS', 'Comic Sans', 'Chalkboard SE', 'Comic Neue', cursive;
        }
    }
    .person:hover .tooltip {
        opacity: 1;
    }
    .person path {
        stroke-width: 1px;
        stroke: currentColor;
    }
    :global(.visible) {
        opacity: 1;
        transition: opacity 5s ease-in;
    }
</style>
