<script lang="ts">
    import * as d3 from 'd3';

    import { onMount } from 'svelte';
    import { PEOPLE_POSITIONS } from '../../../lib/assets/land_use/people_positions';
    import landUseUrl from '$lib/assets/land_use/land_use.csv?url';
    import { LandUseLabels, type LandUsePlot } from '../../../lib/assets/land_use/land_use.model';

    let grazingGroup: SVGGElement;
    let croplandGroup: SVGGElement;

    let scaleCropland = 1;
    let scaleGrazing = 1;
    onMount(() => {
        d3.csv(landUseUrl).then((landUse) => {
            let res: { [key: string]: LandUsePlot } = {};
            landUse.forEach((lu) => {
                ['grazingPC', 'croplandPC'].forEach((key) => {
                    const realKEy = LandUseLabels[key];
                    const value = !!lu[realKEy] && parseFloat(lu[realKEy] as string);
                    const year = +(lu?.Year ?? 0);
                    if (value) {
                        if (res[key]) {
                            res[key].values?.push([year, value]);
                            res[key].max = Math.max(value, res[key].max);
                            res[key].today = value;
                        } else {
                            res[key] = { key, values: [[year, value]], max: value, today: value };
                        }
                    }
                });
            });

            const max = Math.max(res.grazingPC.max, res.croplandPC.max);
            scaleCropland = Math.sqrt(res.croplandPC.max / max);
            scaleGrazing = Math.sqrt(res.grazingPC.max / max);
            res.grazingPC.values.forEach((a) => {
                d3.select(grazingGroup)
                    .insert('use')
                    .attr('href', '#rect')
                    .attr('class', 'dataRect')
                    .attr('transform', `scale(${Math.sqrt(a[1] / max)})`)
                    .attr('transform-origin', `776.029 974.891`)
                    .append('title')
                    .text(`${a[0]} - ${a[1].toPrecision(3)} km²`);
            });

            res.croplandPC.values.forEach((a) => {
                d3.select(croplandGroup)
                    .insert('use')
                    .attr('href', '#rect')
                    .attr('class', 'dataRect')
                    .attr('transform', `scale(${Math.sqrt(a[1] / max)})`)
                    .attr('transform-origin', `776.029 974.891`)
                    .append('title');
            });
        });
    });
</script>

<g id="land">
    <defs>
        <rect id="rect" x="776.029" y="644.891" width="330" height="330" />
        <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="31.94"
            height="28.5"
            patternTransform="scale(1) rotate(45)"
        >
            <path
                d="m7.97 2.5-8 4.64-8-4.64m16-4.5v33m-8-33v9.08m24 9.67-8 4.64-8-4.64m16-9.72-8 4.64v9.66m-8-14.3 8 4.64m24-9.17-8 4.64-8-4.64m0-4.5v33m8-33v9.08m-24 14.2-8 4.64V31m-8-9.72 8 4.64m40-4.64-8 4.64V31m-8-9.72 8 4.64"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="0.5"
                stroke="goldenrod"
            />
        </pattern>

        <pattern id="b" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(.5) rotate(0)">
            rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,1)" /><path
                d="M0 40h40m-10-5.578v11.156M10 34.422v11.156M30-5.578V5.578M10-5.578V5.578M0 14.987v11.156m40-11.156v11.156M20 14.422v11.156M0 20h40M0 0h40"
                stroke-width="1"
                stroke="olivedrab"
            />
        </pattern>
    </defs>
    <g transform="matrix(1,0,0,1,245.888,0)" bind:this={croplandGroup} class="cropland">
        <use
            href="#rect"
            fill="url(#a)"
            opacity=".4"
            transform="scale({scaleCropland})"
            transform-origin="776.029 974.891"
        />
    </g>
    <g transform="matrix(-1,0,0,1,1793.42,0)" bind:this={grazingGroup} class="grazing">
        <use
            href="#rect"
            fill="url(#b)"
            opacity=".2"
            transform="scale({scaleGrazing})"
            transform-origin="776.029 974.891"
        />
    </g>

    <g transform="matrix(1,0,0,1,424.291,459.253)">
        <text x="268.709px" y="534.924px" style="font-size:14px;">
            Land area to feed one person has actually shrunk.
        </text>
    </g>
    <g transform="matrix(1,0,0,1,974.099,104.978)" class="person">
        <g transform="matrix(1,0,0,1,-700,-102)">
            <path
                d="M762.235,927.928C763.847,916.819 761.793,900.683 745.369,898.328C728.055,900.254 722.953,913.964 725.127,927.928C728.418,921.447 729.947,915.231 733.828,913.062C726.277,926.35 729.408,948.415 733.828,961.543C737.352,941.769 751.703,941.631 754.308,961.543C757.723,954.028 761.079,922.867 754.308,913.062C758.01,915.925 760.097,920.265 762.235,927.928Z"
                style="fill:rgb(225,225,225);stroke:black;stroke-width:1px;"
            />
        </g>
        <g transform="matrix(1,0,0,1,-700,-102)">
            <path
                d="M762.235,927.928C763.847,916.819 761.793,900.683 745.369,898.328C728.055,900.254 722.953,913.964 725.127,927.928C728.418,921.447 729.947,915.231 733.828,913.062C726.277,926.35 729.408,948.415 733.828,961.543C737.352,941.769 751.703,941.631 754.308,961.543C757.723,954.028 761.079,922.867 754.308,913.062C758.01,915.925 760.097,920.265 762.235,927.928Z"
                style="fill:rgb(225,225,225);stroke:black;stroke-width:1px;"
            />
        </g>
        <g transform="matrix(1.26777,0,0,1.26777,-309.49,-372.125)">
            <path
                d="M283.273,944.544L288.286,949.557M283.273,940.544L288.286,945.557M283.273,936.544L288.286,941.557M283.273,948.544L288.286,953.557M283.273,952.544L288.286,957.557M280.089,954.359L287.089,961.359M276.089,954.359L280.089,958.359M274.089,956.359L276.61,958.88M272.089,958.359L274.089,960.359M271.089,961.359L272.55,962.821M270.089,964.359L271.089,965.359"
                style="fill:none;stroke:black;stroke-width:0.79px;"
            />
        </g>
        <g transform="matrix(1,0,0,1,-701.464,-91.0269)">
            <circle cx="746.833" cy="882.924" r="12.431" style="fill:white;stroke:black;stroke-width:1px;" />
        </g>
    </g>
</g>

<style>
    :global(.dataRect) {
        stroke: var(--color);
        stroke-width: 1px;
        fill: transparent;
    }
</style>
